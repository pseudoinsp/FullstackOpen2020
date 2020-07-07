import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const NewBlogForm = ({ createNewBlog }) => {

    const [newBlog, setNewBlog] = useState({ title: '', author: '', url:'' })

    const handleAddNewBlog = async event => {
        event.preventDefault()
        await createNewBlog(newBlog)
        setNewBlog({ title: '', author: '', url:'' })
    }

    return (
        <Form onSubmit={handleAddNewBlog}>
            <Form.Group>
                <Form.Label>title:</Form.Label>
                <Form.Control type="text"
                        value={newBlog.title}
                        name="NewTitle"
                        id="title"
                        onChange={({ target }) => { let b = { ...newBlog }; b.title = target.value; setNewBlog(b) }} />
                <Form.Label>author:</Form.Label>
                <Form.Control type="text"
                        value={newBlog.author}
                        name="NewAuthor"
                        id="author"
                        onChange={({ target }) => { let b = { ...newBlog }; b.author = target.value; setNewBlog(b) }} />
                <Form.Label>url:</Form.Label>
                <Form.Control type="text"
                        value={newBlog.url}
                        name="NewUrl"
                        id="url"
                        onChange={({ target }) => { let b = { ...newBlog }; b.url = target.value; setNewBlog(b) }}/>
                <Button variant="primary" type="submit">create</Button>
            </Form.Group>
        </Form>
    )
}

export default NewBlogForm