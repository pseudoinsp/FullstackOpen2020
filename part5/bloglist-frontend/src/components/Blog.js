import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, incrementLike, removeEnabled, remove }) => {
    const [detailed, setDetailed] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showWhenEnabled = { display: removeEnabled(blog) ? '' : 'none' }

    if(detailed) {
        return (
            <div style={blogStyle}>
                {blog.title} <button onClick={() => setDetailed(false)}>hide</button>
                <br />
                {blog.url}
                <br />
                likes {blog.likes} <button id="like-button" onClick={() => incrementLike(blog)}>like</button>
                <br />
                {blog.author}
                <br />
                <button id='remove-button' style={showWhenEnabled} onClick={() => remove(blog)}>remove</button>
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={() => setDetailed(true)}>view</button>
        </div>
    )}

Blog.propTypes = {
    blog: PropTypes.any.isRequired,
    incrementLike: PropTypes.func.isRequired,
    removeEnabled: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default Blog
