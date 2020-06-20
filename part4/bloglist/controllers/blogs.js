const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

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
    try
    {
        const decodedToken = jwt.verify(request.token, config.SECRET)
    
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }    
    
        const user = await User.findById(decodedToken.id)
    
        const blog = new Blog(request.body)
        blog.user = user._id
        blog.likes = blog.likes || 0
    
        if(!blog.title && !blog.url) {
            return response.status(400).json({
                error: 'one of title or URL should be provided'
            })  
        }

        const createdBlog = await blog.save()

        user.blogs = user.blogs.concat(createdBlog._id)
        await user.save()

        const createdBlogWithUser = await Blog.findById(createdBlog._id).populate('user', { 'username': 1, 'name': 1  })

        response.status(201).json(createdBlogWithUser.toJSON())        
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
        const decodedToken = jwt.verify(request.token, config.SECRET)
    
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }    
    
        const deleteRequester = await User.findById(decodedToken.id)   
        
        const blogToDelete = await Blog.findById(request.params.id)

        if(deleteRequester._id.toString() !== blogToDelete.user.toString()) {
            return response.status(403).json({'error': 'only the user who added the post can delete it'})
        }
        
        await Blog.findByIdAndDelete(request.params.id)
        
        response.status(204).end()
    }
    catch(exception) {
        next(exception)
    }
})

module.exports = blogsRouter