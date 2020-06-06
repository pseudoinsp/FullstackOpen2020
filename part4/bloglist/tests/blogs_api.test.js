const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let note of helper.initialBlogs) {
        let noteObject = new Blog(note)
        await noteObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain('React patterns')
})

test('returned blogs has id property', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    ids.forEach(id => expect(id).toBeDefined())
})

test('a valid blog can be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.ValidBlogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDB()
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtTheEnd.map(b => b.title)
    expect(titles).toContain(helper.ValidBlogToAdd.title)
})

test('posting a blog without likes created with 0 likes', async () => {
    await api
        .post('/api/blogs')
        .send(helper.blogToAddWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDB()
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const createdBlog = blogsAtTheEnd.find(b => b.title === helper.blogToAddWithoutLikes.title)
    expect(createdBlog.likes).toBe(0)
})


test('posting a blog without title and URL fails', async () => {
    await api
        .post('/api/blogs')
        .send(helper.blogToAddWithoutTitleAndUrl)
        .expect(400)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtTheEnd = await helper.blogsInDB()
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1)

    const createdBlog = blogsAtTheEnd.find(b => b.title === blogToDelete.title)
    expect(createdBlog).toBe(undefined)
})

afterAll(() => {
    mongoose.connection.close()
})