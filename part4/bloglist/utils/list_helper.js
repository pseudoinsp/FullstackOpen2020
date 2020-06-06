// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item
    return blogs.length === 0 ? 0 : blogs.map(blog => blog.likes).reduce(reducer, 0)
}
  
module.exports = {
    dummy,
    totalLikes
}