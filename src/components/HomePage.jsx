import { useState, useEffect } from 'react';
import "../assets/styles/HomePage.css";
import { SearchBar } from '../components/SearchBar';
import { ProductList } from '../components/ProductList';
import { makeApiRequest } from '../api';
import { CircularProgress } from '@mui/material';
import { useRef } from 'react';
import FilterPanelContainer from './FilterPanelContainer';

export default function HomePage({ savedProducts, onSaveClicked }) {
  const [loading, setLoading] = useState(false);
  const [requestLimitReached, setRequestLimitReached] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const productListRef = useRef(null);

  const handleFilter = ({ sortOrder }) => {

    let filtered = [...searchApiResults];
    const parsePrice = (price) => {
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters
      return isNaN(numericPrice) ? 0 : numericPrice; // Return 0 if parsing fails
    };

    // highlow lowhigh sorting
    if (sortOrder === "lowToHigh") {
      filtered = filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOrder === "highToLow") {
      filtered = filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }

    setFilteredResults(filtered);
  };

  const checkRequestLimit = () => {
    const today = new Date().toISOString().split("T")[0]; // Current date in "YYYY-MM-DD" format
    const requestData = JSON.parse(localStorage.getItem("requestData")) || { date: today, count: 0 };

    if (requestData.date === today) {
      if (requestData.count >= 5) {
        setRequestLimitReached(true);
        return false;
      }
    } else {
      localStorage.setItem("requestData", JSON.stringify({ date: today, count: 0 }));
    }
    return true;
  };

  const incrementRequestCount = () => {
    const today = new Date().toISOString().split("T")[0];
    const requestData = JSON.parse(localStorage.getItem("requestData")) || { date: today, count: 0 };

    requestData.count += 1;
    localStorage.setItem("requestData", JSON.stringify(requestData));
  };

  // search cache from sessionStorage
  function loadSearchCacheFromSessionStorage() {
    const storedCache = sessionStorage.getItem("searchCache");
    return storedCache ? JSON.parse(storedCache) : {};
  }

  // Save search cache to sessionStorage
  function saveSearchCacheToSessionStorage(cache) {
    sessionStorage.setItem("searchCache", JSON.stringify(cache));
  }

  const [searched, setSearched] = useState(() => {
    const storedValue = sessionStorage.getItem("localSearched");
    return storedValue ? storedValue : "";
  });

  const [searchApiResults, setSearchApiResults] = useState(() => {
    const storedResults = sessionStorage.getItem("searchApiResults");
    return storedResults ? JSON.parse(storedResults) : [];
  });

  const [searchCache, setSearchCache] = useState(loadSearchCacheFromSessionStorage);

  useEffect(() => {
    const maxRequestsPerDay = 5;
    const today = new Date().toISOString().split('T')[0];

    const storedRequestData = localStorage.getItem("requestData");
    const requestData = storedRequestData ? JSON.parse(storedRequestData) : null;

    if (requestData) {
      if (requestData.date === today) {
        if (requestData.count >= maxRequestsPerDay) {
          setRequestLimitReached(true);
        }
      } else {
        localStorage.setItem("requestData", JSON.stringify({ date: today, count: 0 }));
      }
    } else {
      localStorage.setItem("requestData", JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  // saving searched value to sessionStorage whenever it changes
  useEffect(() => {
    if (searched) {
      sessionStorage.setItem("localSearched", searched);
    }
  }, [searched]);

  // saving search cache
  useEffect(() => {
    saveSearchCacheToSessionStorage(searchCache);
  }, [searchCache]);

  // saving search results
  useEffect(() => {
    if (searchApiResults.length > 0) {
      sessionStorage.setItem("searchApiResults", JSON.stringify(searchApiResults));
    }
  }, [searchApiResults]);

  async function onSearchSubmit(searchValue) {
    const value = searchValue.trim();
    setSearched(value);
    setSearchApiResults([]);
    setFilteredResults([]);
    setLoading(true);

    try {
      // Check if the search value is already cached
      if (searchCache[value]) {
        setSearchApiResults(searchCache[value]);
        setLoading(false);
        return;
      }

      // Check request limit
      if (!checkRequestLimit()) {
        setLoading(false);
        return;
      }

      // Make API request
      const apiResults = await makeApiRequest(value);
      setSearchApiResults(apiResults);

      // Update cache and request count
      const updatedCache = { ...searchCache, [value]: apiResults };
      setSearchCache(updatedCache);
      incrementRequestCount();
    } catch (error) {
      console.error("Error fetching API results", error);
    } finally {
      setLoading(false);

      if (productListRef.current) {
        productListRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
  return (
    <>
      <div id="homeContent">
        <h1 id="searchForHeader">
          <span className="find-green">find green</span>
          <span className="alternatives">alternatives.</span>
        </h1>
        <SearchBar onSearchSubmit={onSearchSubmit} />
        {requestLimitReached && (
          <div className="error-message">
            Search limit reached for the day. Please try again tomorrow.
          </div>
        )}
        {searched && !loading && !requestLimitReached && (
          <div className="search-results-container">
            <h2 id="searchResultsHeader">Search results for "{searched}"</h2>
            <div className="filter-line-container">
              <FilterPanelContainer id="filterIcon" onFilter={handleFilter} />
              <div id="line"></div>
            </div>
          </div>
        )}
        {loading && (
          <div id="loadingContainer">
            <h2 id="loading">Loading results...</h2>
            <CircularProgress size="3rem" />
          </div>
        )}
        <div ref={productListRef}>
          <ProductList
            products={filteredResults.length ? filteredResults : searchApiResults}
            onSaveClicked={onSaveClicked}
            savedProducts={savedProducts.map((p) => p.id)}
          />
        </div>
      </div>

    </>
  );
}
