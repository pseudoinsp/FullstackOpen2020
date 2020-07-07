import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {

    return (
        <div className="blog">
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
    )}

    Blog.propTypes = {
        blog: PropTypes.any.isRequired
}

export default Blog
