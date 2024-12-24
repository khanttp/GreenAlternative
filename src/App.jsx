import './assets/styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FavouritesPage from "./components/FavouritesPage"
import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [savedProducts, setSavedProducts] = useState(() => {
    const sessionData = sessionStorage.getItem("savedProducts");
    if (sessionData == null) return [];
    return JSON.parse(sessionData);
  });

  useEffect(() => {
    sessionStorage.setItem("savedProducts", JSON.stringify(savedProducts))
  }, [savedProducts])

  function onSaveClicked(product) {
    setSavedProducts((prevSavedProducts) => {
      const isAlreadySaved = prevSavedProducts.some((p) => p.id === product.id);
      if (isAlreadySaved) {
        return prevSavedProducts.filter((p) => p.id !== product.id);
      } else {
        return [...prevSavedProducts, product];
      }
    });
  }

  function onRemoveSavedClick(productid) {
    setSavedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productid)
    );
  }

  return (
    <>
      <Router>
        <div className='app-container'>
          <Navbar></Navbar>
          <Routes>
            <Route path="/GreenAlternative" element={
              <HomePage savedProducts={savedProducts} onSaveClicked={onSaveClicked} />
            } />
            <Route path="/FavouritesPage" element={
              <FavouritesPage savedProducts={savedProducts} onRemoveSavedClick={onRemoveSavedClick} />
            } />
            <Route path="/AboutPage" element={<AboutPage />} />
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </>
  )
}

export default App