import React, { useState } from 'react'
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
        likes {blog.likes} <button onClick={() => incrementLike(blog)}>like</button>
        <br />
        {blog.author}
        <br />
        <button style={showWhenEnabled} onClick={() => remove(blog)}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setDetailed(true)}>view</button>
    </div>
  )}

export default Blog
