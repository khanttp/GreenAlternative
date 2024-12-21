import IconButton from "@mui/material/IconButton";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Rating from '@mui/material/Rating';

export default function SavedProductItem({ product, onRemoveSavedClick }) {
  return (
    <div className="product-item">
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        <img src={product.image} alt={product.title} className="product-image" />
      </a>
      <h3 className="product-name">{product.title}</h3>
      <div className="ratingsContainer">
        <Rating name="read-only" value={product.rating} readOnly />
        <p className="reviewsCount">{product.reviews}</p>
      </div>
      <p className="product-price">{product.price}</p>
      <IconButton onClick={() => onRemoveSavedClick(product.id)} aria-label="save">
        <DeleteRoundedIcon></DeleteRoundedIcon>
      </IconButton>
    </div>
  );
}
