import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../components/Hero";
import { fetchBlogs, getBlogBySlug } from "../store/blogSlice";

const BlogDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

 
  const { filteredBlogs, status, error } = useSelector((state) => state.blogs);

  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  
  const blog = getBlogBySlug(filteredBlogs, slug);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <>
      <Hero title={blog.title} />
      <div className="page-content-wrapper">
        <div className="blog-page-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 order-1">
                <div className="blog-single-post-details-wrapper">
                  <h2 className="post-title">{blog.title}</h2>

                  <div className="post-thumbnail">
                    {blog.image === "" ? (
                      <iframe
                        width="100%"
                        height="500px"
                        src={blog.video}
                        frameBorder="0"
                        title="video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img src={"/" + blog.image} alt={blog.title} />
                    )}
                  </div>
                  <div className="post-text-content">
                    <p>{blog.long_description}</p>
                  </div>
                  <div className="post-share-section">
                    <span>SHARE :</span>
                    <ul className="post-social-icons">
                      <li>
                        <a href="/">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-google-plus" />
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-pinterest" />
                        </a>
                      </li>
                    </ul>
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

export default BlogDetails;
