import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist, addToCart } from "../store/productSlice";
import alertify from 'alertifyjs';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  
  const wishlist = useSelector((state) => state.products.wishlist);
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    alertify.success(`${product.title} favorilere eklendi.`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alertify.success(`${product.title} sepete eklendi.`);
  };

  return (
    <div className="col-xl-custom-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-custom-sm-6">
      <div className="single-grid-product single-grid-product--overlay">
        <div className="single-grid-product__image">
          <a
            href="#"
            className="favorite-icon"
            onClick={handleAddToWishlist}
            data-tippy="Add to Wishlist"
            data-tippy-inertia="true"
            data-tippy-animation="shift-away"
            data-tippy-delay={50}
            data-tippy-arrow="true"
            data-tippy-theme="sharpborder"
            data-tippy-placement="left"
          >
            
            <i className={`fa ${isInWishlist ? 'fa-heart' : 'fa-heart-o'}`} />
          </a>
          <div className="product-badge-wrapper">
            <span className="hot">
              {product.status?.new_arrival ? "New" : ""}
            </span>
            <span className="hot">
              {product.status?.featured ? "Featured" : ""}
            </span>
            <span className="hot">
              {product.status?.on_sale ? "On Sale" : ""}
            </span>
          </div>
          <Link
            to={`/product/${product.slug}`}
            className="image-wrap"
          >
            <img
              src={product.image}
              className="img-fluid"
              alt={product.title}
            />
            <img
              src={product.image}
              className="img-fluid"
              alt={product.title}
            />
          </Link>
          <div className="product-hover-icon-wrapper">
            <span className="single-icon single-icon--add-to-cart">
              <button
                data-tippy="Add to cart"
                data-tippy-inertia="true"
                onClick={handleAddToCart}
                data-tippy-animation="shift-away"
                data-tippy-delay={50}
                data-tippy-arrow="true"
                data-tippy-theme="sharpborder"
                className="btn btn--icon btn--icon--left"
              >
                <i className="fa fa-shopping-basket" />
                <span>ADD TO CART</span>
              </button>
            </span>
          </div>
          <div className="product-info">
            <p className="title">
              <Link to={`/product/${product.slug}`}>
                {product.title}
              </Link>
            </p>
            <p className="price">{product.price}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
