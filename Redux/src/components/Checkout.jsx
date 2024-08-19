import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../components/Hero";
import { updateField, setCart, clearCheckout, getOrders } from "../store/checkoutSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    companyName,
    addressLine1,
    addressLine2,
    country,
    townCity,
    state,
    zipCode,
    cart,
    status,
    error
  } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleInputChange = (e) => {
    dispatch(updateField({ name: e.target.name, value: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const order = {
      id: Math.floor(Math.random() * 1000000000),
      trackingid: `FURN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      products: cart.map((item) => item.product.id),
    };

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order successfully saved:", data);
        dispatch(clearCheckout());
        alert(`Your order has been placed! Tracking ID: ${order.trackingid}`);
      })
      .catch((error) => {
        console.error("Error saving the order:", error);
      });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <Hero title="Checkout" />
      <div className="page-content-wrapper">
        <div className="checkout-page-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="checkout-form">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row row-40">
                      <div className="col-lg-7">
                        <div id="billing-form" className="billing-form">
                          <h4 className="checkout-title">Billing & Shipping Address</h4>
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <label htmlFor="firstName">First Name*</label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                required
                                value={firstName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="lastName">Last Name*</label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="email">Email Address*</label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="phoneNumber">Phone no*</label>
                              <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="companyName">Company Name</label>
                              <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-12">
                              <label htmlFor="addressLine1">Address*</label>
                              <input
                                type="text"
                                id="addressLine1"
                                name="addressLine1"
                                placeholder="Address line 1"
                                value={addressLine1}
                                onChange={handleInputChange}
                              />
                              <input
                                type="text"
                                id="addressLine2"
                                name="addressLine2"
                                placeholder="Address line 2"
                                value={addressLine2}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="country">Country*</label>
                              <select
                                id="country"
                                name="country"
                                className="nice-select"
                                value={country}
                                onChange={handleInputChange}
                              >
                                <option value="İstanbul">İstanbul</option>
                                <option value="Ankara">Ankara</option>
                                <option value="Hatay">Hatay</option>
                                <option value="Antalya">Antalya</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="townCity">Town/City*</label>
                              <input
                                type="text"
                                id="townCity"
                                name="townCity"
                                placeholder="Town/City"
                                value={townCity}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="state">State*</label>
                              <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="State"
                                value={state}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-md-6 col-12">
                              <label htmlFor="zipCode">Zip Code*</label>
                              <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                placeholder="Zip Code"
                                value={zipCode}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="row">
                          <div className="col-12">
                            <h4 className="checkout-title">Cart Total</h4>
                            <div className="checkout-cart-total">
                              <h4>
                                Product <span>Total</span>
                              </h4>
                              <ul>
                                {cart.map((item) => (
                                  <li key={item.product.id}>
                                    {item.product.title} X {item.quantity}
                                    <span>${item.product.price * item.quantity}</span>
                                  </li>
                                ))}
                              </ul>
                              <p>
                                Sub Total{" "}
                                <span>${cart.reduce((a, c) => a + c.product.price * c.quantity, 0)}</span>
                              </p>
                              <p>
                                Shipping Fee <span>$15.00</span>
                              </p>
                              <h4>
                                Grand Total{" "}
                                <span>${cart.reduce((a, c) => a + c.product.price * c.quantity, 0) + 15}</span>
                              </h4>
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="theme-button place-order-btn" type="submit">
                              PLACE ORDER
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
