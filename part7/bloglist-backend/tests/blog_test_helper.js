const Blog = require('../models/blog')
const userHelper = require('./user_test_helper')

const initialBlogs = [ 
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', user: userHelper.initialUsers[0]._id,  likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, 
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, 
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, 
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }]

const ValidBlogToAdd = {
    _id: '4a422aa71b54a676234d17f3',
    title: 'Lord of the Rings',
    author: 'Tolkien',
    url: 'http://www.amazon.com',
    likes: 70,
    __v: 0
}   

const blogToAddWithoutLikes = {
    _id: '5a422aa71b54a676234d17fd',
    title: 'Lord of the Rings',
    author: 'Tolkien',
    url: 'http://www.amazon.com',
    __v: 0
}   

const blogToAddWithoutTitleAndUrl = {
    _id: '5a422aa71b54a676234d17fd',
    author: 'Tolkien',
    __v: 0
}

const blogsInDB = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}
  
module.exports = {
    initialBlogs, ValidBlogToAdd, blogsInDB, blogToAddWithoutLikes, blogToAddWithoutTitleAndUrl
}