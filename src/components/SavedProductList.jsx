import SavedProductItem from "./SavedProductItem";
import "../assets/styles/products.css";

export function SavedProductList({ products, onRemoveSavedClick }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <SavedProductItem
          key={product.id} 
          product={product}
          onRemoveSavedClick={onRemoveSavedClick}
        />
      ))}
    </div>
  );
}
