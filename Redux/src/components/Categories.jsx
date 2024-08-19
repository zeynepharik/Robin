import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategories } from "../store/categorySlice";
import { fetchProductsByCategory, addToCart, addToWishlist } from "../store/productSlice"; 
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import alertify from 'alertifyjs';

const Categories = () => {
  const { categoryId } = useParams(); 
  const dispatch = useDispatch();
  
  
  const categories = useSelector((state) => state.category.categories);
  const products = useSelector((state) => state.products.products); 
  const productsStatus = useSelector((state) => state.products.status); 
  const error = useSelector((state) => state.products.error); 

  useEffect(() => {
    
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }

    
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    } else {
      dispatch(fetchProductsByCategory()); 
    }
  }, [categoryId, dispatch, categories.length]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alertify.success(`${product.title} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    alertify.success(`${product.title} added to wishlist!`);
  };

  return (
    <>
      <Hero title="Categories" />
      <div className="product-fullpage-no-gutter-area">
        <div className="row no-gutters">
          {productsStatus === "loading" && <div>Loading...</div>}
          {productsStatus === "succeeded" && products.length > 0 ? (
            products.map((item) => (
              <CategoryCard
                key={item.id}
                product={item}
                addToCart={handleAddToCart}
                addToWishlist={handleAddToWishlist}
              />
            ))
          ) : productsStatus === "failed" ? (
            <div>{error}</div>
          ) : (
            <div>No products found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
