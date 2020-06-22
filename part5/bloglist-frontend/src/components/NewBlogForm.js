import React, { useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {

    const [newBlog, setNewBlog] = useState({ title: '', author: '', url:'' })

    const handleAddNewBlog = async event => {
        event.preventDefault()
        await createNewBlog(newBlog)
        setNewBlog({ title: '', author: '', url:'' })
    }

    return (
        <form onSubmit={handleAddNewBlog}>
            <div>
             title:
                <input
                    type="text"
                    value={newBlog.title}
                    name="NewTitle"
                    id="title"
                    onChange={({ target }) => { let b = { ...newBlog }; b.title = target.value; setNewBlog(b) }}
                />
            </div>
            <div>
              author:
                <input
                    type="text"
                    value={newBlog.author}
                    name="NewAuthor"
                    id="author"
                    onChange={({ target }) => { let b = { ...newBlog }; b.author = target.value; setNewBlog(b) }}
                />
            </div>
            <div>
              url:
                <input
                    type="text"
                    value={newBlog.url}
                    name="NewUrl"
                    id="url"
                    onChange={({ target }) => { let b = { ...newBlog }; b.url = target.value; setNewBlog(b) }}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default NewBlogForm