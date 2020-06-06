var lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item
    return blogs.length === 0 ? 0 : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (withMaxLike, current) => withMaxLike.likes >= current.likes ?  withMaxLike : current

    return blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) 
        return  null
    
    const reducer = (groupWithMostElements, current) => groupWithMostElements.length >= current.length ?  groupWithMostElements : current
    const authors = lodash.groupBy(blogs, blog => blog.author)
    let blogEntriesOfAuthorWithMostBlogs = lodash.reduce(authors, reducer)
    return { 'author': blogEntriesOfAuthorWithMostBlogs[0].author, 'blogs': blogEntriesOfAuthorWithMostBlogs.length }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}