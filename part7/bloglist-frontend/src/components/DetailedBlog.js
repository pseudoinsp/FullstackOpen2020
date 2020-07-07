import React from 'react'
import AddComment from './AddComment'

const DetailedBlog = ({ blog, incrementLike, handleAddComment, removeEnabled, remove }) => {

    const showWhenEnabled = { display: removeEnabled(blog) ? '' : 'none' }

    if(!blog)
        return null

    const onSubmit = newComment => {
        handleAddComment(blog, newComment)
    }

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
            <h2>comments</h2>
            <AddComment onSubmit={onSubmit} />
            <ul>
                {blog.comments.map(c => <li key={c}>{c}</li>)}
            </ul>
            <br />
            <button id='remove-button' style={showWhenEnabled} onClick={() => remove(blog)}>remove</button>
        </div>
    )
}

export default DetailedBlog