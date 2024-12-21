import './assets/styles/App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import FavouritesPage from "./components/FavouritesPage"
import HomePage from "./components/HomePage"
import AboutPage from "./components/AboutPage"
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [savedProducts, setSavedProducts] = useState(() => {
    const localdata = localStorage.getItem("savedProducts");
    if (localdata == null) return [];
    return JSON.parse(localdata);
  });

  useEffect(() => {
    localStorage.setItem("savedProducts", JSON.stringify(savedProducts))
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
        <Navbar></Navbar>
        <div id="content">
        <Routes>
          <Route path="/" element={
            <HomePage savedProducts={savedProducts} onSaveClicked={onSaveClicked} />
          } />
          <Route path="/FavouritesPage" element={<FavouritesPage savedProducts={savedProducts} onRemoveSavedClick={onRemoveSavedClick} />} />
          <Route path="/AboutPage" element={<AboutPage />} />
        </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </>
  )
}

export default App
