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
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}