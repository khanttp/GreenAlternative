import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Rating from '@mui/material/Rating';

export default function ProductItem({ product, onSaveClicked, isSaved }) {

  return (
    <div className="product-item">
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        <img src={product.image} alt={product.title} className="product-image" />
      </a>
      <h3 className="product-name">{product.title}</h3>
      <div className="ratingsContainer">
        <Rating name="read-only" size="medium" precision={0.5} value={product.rating} readOnly />
        <p className="reviewsCount">{product.reviews}</p>
      </div>
      <p className="product-price">{product.price}</p>
      <IconButton onClick={() => onSaveClicked(product)} aria-label="save">
        {isSaved ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
      </IconButton>
    </div>
  );
}
