import React, { Component } from 'react';
import Hero from "../components/Hero";

class Faq extends Component {
  state = {
    faq: [],
    status: 'idle', 
    error: null
  };

  getFaq = () => {
    this.setState({ status: 'loading' });
    fetch('http://localhost:3000/faq')
      .then(response => response.json())
      .then(faq => this.setState({ faq, status: 'succeeded' }))
      .catch(error => this.setState({ error: error.message, status: 'failed' }));
  };

  componentDidMount() {
    this.getFaq();
  }

  render() {
    const { faq, status, error } = this.state;

    return (
      <>
        <Hero title="FAQ"/>
        <div className="page-content-wrapper">
          <div className="faq-area section-space">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="faq-wrapper">
                    <div className="single-faq">
                      <h2 className="faq-title">Frequently Asked Questions</h2>
                      <div className="accordion" id="shippingInfo">
                        {status === 'loading' && <p>Loading...</p>}
                        {status === 'failed' && <p>{error}</p>}
                        {status === 'succeeded' && faq.map((faqItem) => (
                          <div className="accordion-item" key={faqItem.id}>
                            <h2 className="accordion-header" id={"heading" + faqItem.id}>
                              <button className="accordion-button" type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={"#collapse" + faqItem.id}
                                      aria-expanded="true"
                                      aria-controls={"collapse" + faqItem.id}>
                                {faqItem.title}
                              </button>
                            </h2>
                            <div id={"collapse" + faqItem.id}
                                 className="accordion-collapse collapse"
                                 aria-labelledby={"heading" + faqItem.id}
                                 data-bs-parent="#shippingInfo">
                              <div className="accordion-body">
                                <p>{faqItem.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default Faq;
