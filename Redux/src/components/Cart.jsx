import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../store/productSlice";
import alertify from 'alertifyjs';
import Hero from "../components/Hero";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.products.cart);

  const handleRemoveFromCart = (id, title) => {
    dispatch(removeFromCart(id));
    alertify.error(`${title} removed from cart!`);
  };

  const subtotal = cart.reduce((acc, item) => {
    
    console.log("Item Price:", item.price);
    console.log("Item Quantity:", item.quantity);

    
    if (item.price && item.quantity) {
      return acc + item.price * item.quantity;
    }
    return acc; 
  }, 0);

  return (
    <>
      <Hero title="Cart" bread="Cart" />
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
                        <th className="product-quantity">Quantity</th>
                        <th className="product-subtotal">Total</th>
                        <th className="product-remove">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td className="product-thumbnail">
                            <Link to={`/product/${item.slug}`}>
                              <img
                                src={`/${item.image}`}
                                className="img-fluid"
                                alt={item.title}
                              />
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link to={`/product/${item.slug}`}>
                              {item.title}
                            </Link>
                          </td>
                          <td className="product-price">
                            <span className="price">${item.price}</span>
                          </td>
                          <td className="product-quantity">
                            <div className="pro-qty d-inline-block mx-0">
                              <input
                                type="text"
                                defaultValue={item.quantity}
                                readOnly
                              />
                            </div>
                          </td>
                          <td className="total-price">
                            <span className="price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </td>
                          <td className="product-remove">
                            <button
                              onClick={() =>
                                handleRemoveFromCart(item.id, item.title)
                              }
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

              <div className="col-lg-6 offset-lg-6">
                <div className="cart-calculation-area">
                  <h2 className="cart-calculation-area__title">
                    Cart totals
                  </h2>
                  <table className="cart-calculation-table">
                    <tbody>
                      <tr>
                        <th>SUBTOTAL</th>
                        <td className="subtotal">${subtotal.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>TOTAL</th>
                        <td className="total">${subtotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-calculation-button">
                    <Link
                      to="/checkout"
                      className="theme-button theme-button--alt theme-button--checkout"
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
