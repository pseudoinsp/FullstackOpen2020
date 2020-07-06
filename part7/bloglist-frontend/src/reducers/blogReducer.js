import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'LIKE_BLOG':
      const id = action.data.id
      const votedBlog = state.find(n => n.id === id)
      const changedBlog = { 
        ...votedBlog, 
        likes: votedBlog.likes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedBlog 
      )
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const modifiedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(modifiedBlog.id, modifiedBlog)

    dispatch({
      type: "LIKE_BLOG",
      data: {
        id: blog.id
      }
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: "CREATE_BLOG",
      data : newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer