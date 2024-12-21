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

  const [filteredResults, setFilteredResults] = useState([]);

  const handleFilter = ({ sortOrder }) => {

    let filtered = [...searchApiResults];

    // Helper function to parse the price safely
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


  const productListRef = useRef(null);


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
    const value = searchValue.trim()
    setSearched(value);
    setSearchApiResults([]);
    setFilteredResults([]);
    setLoading(true);

    try {
      // is already cached
      if (searchCache[value]) {
        setSearchApiResults(searchCache[value]);
        setLoading(false);
        return;
      }

      // not cached
      const apiResults = await makeApiRequest("environmentally friendly " + value);
      setSearchApiResults(apiResults);

      // update the cache
      const updatedCache = { ...searchCache, [value]: apiResults };
      setSearchCache(updatedCache);

    } catch (error) {
      console.error("Error fetching API results", error);
    } finally {
      setLoading(false);

      // scroll to the productlist after search submit
      if (productListRef.current) {
        productListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <>
      <div id="homeContent" style={{ paddingTop: "20px" }}>
        <h1 id="searchForHeader">
          <span className="find-green">find green</span>
          <span className="alternatives">alternatives.</span>
        </h1>
        <SearchBar onSearchSubmit={onSearchSubmit} />
        {searched && !loading && (
          <div className='afterSearch'>
            <h2 id="searchResultsHeader">Search results for "{searched}"</h2>
            <FilterPanelContainer onFilter={handleFilter} />
            <div id='line'
              style={{
              }}
            ></div>
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
