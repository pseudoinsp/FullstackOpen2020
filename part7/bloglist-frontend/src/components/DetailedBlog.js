import React from 'react'

const DetailedBlog = ({ blog, incrementLike, removeEnabled, remove }) => {

    const showWhenEnabled = { display: removeEnabled(blog) ? '' : 'none' }

    if(!blog)
        return null

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <br />
            {blog.url}
            <br />
            {blog.likes} likes <button id="like-button" onClick={() => incrementLike(blog)}>like</button>
            <br />
            {blog.author}
            <br />
            <button id='remove-button' style={showWhenEnabled} onClick={() => remove(blog)}>remove</button>
        </div>
    )
}

export default DetailedBlog