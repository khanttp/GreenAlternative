import ProductItem from "./ProductItem";
import "../assets/styles/products.css";

export function ProductList({ products, onSaveClicked, savedProducts }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onSaveClicked={onSaveClicked}
          isSaved={savedProducts.includes(product.id)}
        />
      ))}
    </div>
  );
}
