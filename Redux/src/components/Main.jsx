import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory, addToCart, addToWishlist } from '../store/productSlice';
import { fetchBlogs } from '../store/blogSlice';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import Slider from '../components/Slider';

const Main = () => {
  const dispatch = useDispatch();

  
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);

  const blogs = useSelector((state) => state.blogs.filteredBlogs);
  const blogStatus = useSelector((state) => state.blogs.status);
  const blogError = useSelector((state) => state.blogs.error);

  
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProductsByCategory('all')); 
    }
    if (blogStatus === 'idle') {
      dispatch(fetchBlogs());
    }
  }, [dispatch, productStatus, blogStatus]);

  
  const handleFilterChange = (category) => {
    dispatch(fetchProductsByCategory(category));
  };

  
  let productContent;
  if (productStatus === 'loading') {
    productContent = <div>Loading products...</div>;
  } else if (productStatus === 'succeeded') {
    productContent = Array.isArray(filteredProducts) ? (
      filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={() => dispatch(addToCart(product))}
            addToWishlist={() => dispatch(addToWishlist(product))}
          />
        ))
      ) : (
        <div>No products found</div>
      )
    ) : (
      <div>Invalid product data</div>
    );
  } else if (productStatus === 'failed') {
    productContent = <div>{productError}</div>;
  }

  let blogContent;
  if (blogStatus === 'loading') {
    blogContent = <div>Loading blogs...</div>;
  } else if (blogStatus === 'succeeded') {
    blogContent = blogs.slice(0, 4).map((blog) => (
      <BlogCard key={blog.id} blog={blog} />
    ));
  } else if (blogStatus === 'failed') {
    blogContent = <div>{blogError}</div>;
  }

  return (
    <>
      <Slider />
      <div>
        <div className="product-fullpage-no-gutter-area">
          <div className="row no-gutters">
            <div className="col-lg-12">
              <div className="product-double-row-tab-wrapper">
                <div className="tab-product-navigation">
                  <ul className="nav nav-tabs justify-content-center" id="nav-tab2" role="tablist">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        id="product-tab-1"
                        type="button"
                        data-bs-toggle="tab"
                        data-bs-target="#product-series-1"
                        role="tab"
                        onClick={() => handleFilterChange('all')}
                        aria-controls="product-series-1"
                        aria-selected="true"
                      >
                        All
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        id="product-tab-2"
                        type="button"
                        data-bs-toggle="tab"
                        data-bs-target="#product-series-2"
                        role="tab"
                        onClick={() => handleFilterChange('new_arrival')}
                        aria-controls="product-series-2"
                        aria-selected="false"
                      >
                        New Arrivals
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        id="product-tab-3"
                        type="button"
                        data-bs-toggle="tab"
                        data-bs-target="#product-series-3"
                        role="tab"
                        onClick={() => handleFilterChange('featured')}
                        aria-controls="product-series-3"
                        aria-selected="false"
                      >
                        Featured
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        id="product-tab-4"
                        type="button"
                        data-bs-toggle="tab"
                        data-bs-target="#product-series-4"
                        role="tab"
                        onClick={() => handleFilterChange('on_sale')}
                        aria-controls="product-series-4"
                        aria-selected="false"
                      >
                        On Sale
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row no-gutters">{productContent}</div>
        </div>
        <div className="blog-slider-area bg--dark-grey">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title-area text-center">
                  <h2 className="section-title">From Our Blog</h2>
                </div>
              </div>
            </div>
            <div className="row">{blogContent}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
