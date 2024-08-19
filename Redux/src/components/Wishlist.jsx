import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { addToCart, removeFromWishlist } from "../store/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <>
      <Hero title="Wishlist" subtitle="Wishlist" />
      <div className="page-content-wrapper">
        <div className="shopping-cart-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cart-table-container">
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th className="product-name" colSpan={2}>
                          Product
                        </th>
                        <th className="product-price">Price</th>
                        <th className="product-subtotal">&nbsp;</th>
                        <th className="product-remove">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item) => (
                        <tr key={item.id}>
                          <td className="product-thumbnail">
                            <Link to={"/product/" + item.slug}>
                              <img
                                src={"/" + item.image}
                                className="img-fluid"
                                alt=""
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link to={"/product/" + item.slug}>
                              {item.title}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="price">${item.price}</span>
                          </td>
                          <td className="add-to-cart">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="theme-button theme-button--alt theme-button--wishlist"
                            >
                              ADD TO CART
                            </button>
                          </td>
                          <td className="product-remove">
                            <button
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              <i className="pe-7s-close" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
