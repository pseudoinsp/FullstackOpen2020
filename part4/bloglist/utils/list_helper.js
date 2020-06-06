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

const mostLikes = (blogs) => {
    if(blogs.length === 0) 
        return  null
    
    const sumReducer = (sum, item) => sum + item        
    const groupReducer = (groupWithMostElements, current) =>
        groupWithMostElements.map(x => x.likes).reduce(sumReducer, 0) >=
        current.map(x => x.likes).reduce(sumReducer, 0) ?  groupWithMostElements : current
    const authors = lodash.groupBy(blogs, blog => blog.author)
    let blogEntriesOfAuthorWithMostBlogs = lodash.reduce(authors, groupReducer)
    return { 'author': blogEntriesOfAuthorWithMostBlogs[0].author, 'likes': blogEntriesOfAuthorWithMostBlogs.map(x => x.likes).reduce(sumReducer, 0) }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}