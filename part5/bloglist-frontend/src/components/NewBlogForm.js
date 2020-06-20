import React from 'react'

const NewBlogForm = ({newBlogDMO, setNewBlogDMO, handleAddNewBlog}) => {
    return (
    <form onSubmit={handleAddNewBlog}>
    <div>
      title:
        <input
        type="text"
        value={newBlogDMO.title}
        name="NewTitle"
        onChange={({ target }) => { let b = {...newBlogDMO}; b.title = target.value; setNewBlogDMO(b) }}
      />
    </div>
    <div>
      author:
        <input
        type="text"
        value={newBlogDMO.author}
        name="NewUrl"
        onChange={({ target }) => { let b = {...newBlogDMO}; b.author = target.value; setNewBlogDMO(b) }}
      />
    </div>
    <div>
      url:
        <input
        type="text"
        value={newBlogDMO.url}
        name="NewTitle"
        onChange={({ target }) => { let b = {...newBlogDMO}; b.url = target.value; setNewBlogDMO(b) }}
      />
    </div>
    <button type="submit">create</button>
  </form>
    )
}

export default NewBlogForm