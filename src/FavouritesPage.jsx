import Navbar from "../components/Navbar";
import { SavedProductList } from "./SavedProductList";
import "../assets/styles/FavouritesPage.css"
import Footer from "./Footer";

export default function FavouritesPage({ savedProducts, onRemoveSavedClick }) {
  return (
    <>
      <div className="favourites-container">
        <h1 className="favourites-title">Favourites</h1>
        {savedProducts.length === 0 ? (
          <p className="favourites-empty">
            You currently do not have any products saved.
          </p>
        ) : (
          <SavedProductList
            products={savedProducts}
            onRemoveSavedClick={onRemoveSavedClick}
          />
        )}
      </div>
    </>
  );
}

