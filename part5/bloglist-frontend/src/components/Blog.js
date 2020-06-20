import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [detailed, setDetailed] = useState(false) 

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(detailed) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setDetailed(false)}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.author}
      </div>
    )
  }

  return (
    <div blogStyle={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setDetailed(true)}>view</button>
    </div>
  )}

export default Blog
