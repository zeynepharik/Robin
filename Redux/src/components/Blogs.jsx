import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogListCard from '../components/BlogListCard';
import Hero from '../components/Hero';
import { fetchBlogs, searchBlogs } from '../store/blogSlice';

const Blogs = () => {
    const dispatch = useDispatch();
    const { filteredBlogs, status } = useSelector((state) => state.blogs);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBlogs());
        }
    }, [status, dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchBlogs(searchKey));
    };

    return (
        <>
            <Hero title="Blogs"/>
            <div className="page-content-wrapper">
                <div className="blog-page-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2">
                                <div className="blog-sidebar-wrapper">
                                    <div className="single-sidebar-widget single-sidebar-widget--extra-space">
                                        <h2 className="single-sidebar-widget__title single-sidebar-widget__title--extra-space">Search</h2>
                                        <div className="sidebar-search">
                                            <form onSubmit={handleSearch}>
                                                <input
                                                    type="search"
                                                    placeholder="Search..."
                                                    value={searchKey}
                                                    onChange={(e) => setSearchKey(e.target.value)}
                                                />
                                                <button type="submit">
                                                    <i className="fa fa-search"/>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="single-sidebar-widget">
                                        <h2 className="single-sidebar-widget__title">Recent Posts</h2>
                                        <ul className="single-sidebar-widget__dropdown single-sidebar-widget__dropdown--extra-height">
                                            
                                            {filteredBlogs.slice(0, 5).map((blog, index) => (
                                                <li key={index}>
                                                    <Link to={`/blog/${blog.slug}`}>
                                                        {blog.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 order-1">
                                <div className="blog-post-wrapper">
                                    <div className="row">
                                        {filteredBlogs.map((blog, index) => (
                                            <BlogListCard key={index} blog={blog}/>
                                        ))}
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

export default Blogs;
