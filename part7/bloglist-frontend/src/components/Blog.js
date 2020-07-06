import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className="blog" style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
    )}

    Blog.propTypes = {
        blog: PropTypes.any.isRequired
}

export default Blog
