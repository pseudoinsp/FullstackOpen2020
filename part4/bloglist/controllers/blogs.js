const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1  })
        response.json(blogs.map(blog => blog.toJSON()))
    }
    catch(exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    if(!blog.likes)
    {
        blog.likes = 0
    }

    if(!blog.title && !blog.url) {
        return response.status(400).json({
            error: 'one of title or URL should be provided'
        })  
    }

    const aUser = await User.findOne({})
    blog.user = aUser._id

    try
    {
        const createdBlog = await blog.save()

        aUser.blogs = aUser.blogs.concat(createdBlog._id)
        await aUser.save()
        response.status(201).json(createdBlog.toJSON)        
    }
    catch(exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blogDTO = {...request.body}

    const blogUpdate = {
        title: blogDTO.title,
        author: blogDTO.author,
        url: blogDTO.url,
        likes: blogDTO.likes || 0
    }

    try
    {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, {new: true})
        updatedBlog ? response.json(updatedBlog.toJSON()) : response.status(404).end()
    }
    catch(exception) {
        next(exception)
    }   
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter