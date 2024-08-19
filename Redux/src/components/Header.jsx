import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, removeFromWishlist, addToWishlist, removeFromCart } from "../store/productSlice";

class Header extends Component {
  calculateSubtotal = () => {
    return this.props.cart.reduce((total, item) => {
      const itemQuantity = Number(item.quantity) || 0;
      const itemPrice = Number(item.price) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  render() {
    const { wishlist, cart, removeFromWishlist, addToCart, removeFromCart } = this.props;
    const subtotal = this.calculateSubtotal();

    return (
      <>
        <div className="header-area header-area--default header-area--default--white header-sticky">
          <div className="header-navigation-area header-navigation-area--white header-navigation-area--extra-space d-none d-lg-block">
            <div className="container wide">
              <div className="row">
                <div className="col-lg-12">
                  <div className="header-info-wrapper header-info-wrapper--alt-style">
                    <div className="header-logo">
                      <a href="index.html">
                        <img src="/img/logo.png" className="img-fluid" alt="Logo" />
                      </a>
                    </div>
                    <div className="header-navigation-wrapper">
                      <nav>
                        <ul>
                          <li className="has">
                            <Link to="/">Home</Link>
                          </li>
                          <li className="has">
                            <Link to="/about">About</Link>
                          </li>
                          <li className="has-children">
                            <a href="/">Categories</a>
                            <ul className="submenu submenu--column-1">
                              
                            </ul>
                          </li>
                          <li className="has">
                            <Link to="/blog">Blog</Link>
                          </li>
                          <li className="has">
                            <Link to="/faq">Faq</Link>
                          </li>
                          <li className="has">
                            <Link to="/contact">Contact</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="header-icon-area">
                      <div className="account-dropdown">
                        <Link to="/ordertracking">Order Tracking</Link>
                      </div>
                      <div className="header-icon d-flex align-items-center">
                        <ul className="header-icon__list">
                          <li>
                            <Link to="/wishlist">
                              <i className="fa fa-heart-o" />
                              <span className="item-count">{wishlist.length}</span>
                            </Link>
                            <div className="minicart-wrapper">
                              <p className="minicart-wrapper__title">WISHLIST</p>
                              <div className="minicart-wrapper__items ps-scroll">
                                {wishlist.map((item) => (
                                  <div key={item.id} className="minicart-wrapper__items__single">
                                    <p
                                      onClick={() => removeFromWishlist(item.id)}
                                      className="close-icon"
                                    >
                                      <i className="pe-7s-close" />
                                    </p>
                                    <div className="image">
                                      <Link to={`/product/${item.slug}`}>
                                        <img
                                          src={`/${item.image}`}
                                          className="img-fluid"
                                          alt=""
                                          style={{ width: "90px", height: "100px" }}
                                        />
                                      </Link>
                                    </div>
                                    <div className="content">
                                      <p className="product-title">
                                        <Link to={`/product/${item.slug}`}>
                                          {item.title}
                                        </Link>
                                      </p>
                                      <p className="product-calculation">
                                        <span className="price">{item.price}$</span>
                                      </p>
                                      <a
                                        href="#"
                                        onClick={() => addToCart(item)}
                                        className="wishlist-cart-icon"
                                      >
                                        <i className="fa fa-shopping-basket" />
                                        ADD TO CART
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="minicart-wrapper__buttons mb-0">
                                <Link
                                  to="/wishlist"
                                  className="theme-button theme-button--minicart-button mb-0"
                                >
                                  VIEW WISHLIST
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li>
                            <Link to="/cart">
                              <i className="fa fa-shopping-basket" />
                              <span className="item-count">{cart.length}</span>
                            </Link>
                            <div className="minicart-wrapper">
                              <p className="minicart-wrapper__title">CART</p>
                              <div className="minicart-wrapper__items ps-scroll">
                                {cart.map((item) => (
                                  <div key={item.id} className="minicart-wrapper__items__single">
                                    <p
                                      onClick={() => removeFromCart(item.id)}
                                      className="close-icon"
                                    >
                                      <i className="pe-7s-close" />
                                    </p>
                                    <div className="image">
                                      <Link to={`/product/${item.slug}`}>
                                        <img
                                          src={`/${item.image}`}
                                          className="img-fluid"
                                          alt=""
                                          style={{ width: "90px", height: "100px" }}
                                        />
                                      </Link>
                                    </div>
                                    <div className="content">
                                      <p className="product-title">
                                        <Link to={`/product/${item.slug}`}>
                                          {item.title}
                                        </Link>
                                      </p>
                                      <p className="product-calculation">
                                        <span className="count">{item.quantity}</span> x
                                        <span className="price">{item.price}$</span>
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <p className="minicart-wrapper__subtotal">
                                SUBTOTAL: <span>{subtotal.toFixed(2)} $</span>
                              </p>
                              <div className="minicart-wrapper__buttons">
                                <Link
                                  to="/cart"
                                  className="theme-button theme-button--minicart-button"
                                >
                                  VIEW CART
                                </Link>
                                <Link
                                  to="/checkout"
                                  className="theme-button theme-button--alt theme-button--minicart-button theme-button--minicart-button--alt mb-0"
                                >
                                  CHECKOUT
                                </Link>
                              </div>
                              <p className="minicart-wrapper__featuretext">
                                Free Shipping on All Orders Over $100!
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header-mobile-navigation d-block d-lg-none">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-md-6">
                  <div className="header-logo">
                    <a href="/">
                      <img src="/img/logo.png" className="img-fluid" alt="Logo" />
                    </a>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="mobile-navigation text-end">
                    <ul className="header-icon__list header-icon__list">
                      <li>
                        <Link to="/wishlist">
                          <i className="fa fa-heart-o" />
                          <span className="item-count">{wishlist.length}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/cart">
                          <i className="fa fa-shopping-basket" />
                          <span className="item-count">{cart.length}</span>
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="mobile-menu-icon"
                          id="mobile-menu-trigger"
                        >
                          <i className="fa fa-bars" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  wishlist: state.products.wishlist,
  cart: state.products.cart,
});

const mapDispatchToProps = {
  addToCart,
  removeFromWishlist,
  addToWishlist,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
