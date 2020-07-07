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
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog 
      )
    case 'ADD_COMMENT':
      const idOfBlog = action.data.id
      const comment = action.data.comment
      const commentedBlog = state.find(n => n.id === idOfBlog)
      const modifiedBlog = { 
        ...commentedBlog, 
        comments: commentedBlog.comments.concat(comment)
      }
      return state.map(blog =>
        blog.id !== idOfBlog ? blog : modifiedBlog 
      )
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      const id2 = action.data.id
      return state.filter(blog => blog.id !== id2)
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

export const addComment = (blog, comment) => {
  return async dispatch => {
    await blogService.addComment(blog.id, comment)

    dispatch({
      type: "ADD_COMMENT",
      data: {
        id: blog.id,
        comment
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

export const deleteBlog = blog => {
    return async dispatch => {
      await blogService.deleteBlog(blog.id)
      dispatch({
        type: "DELETE_BLOG",
        data: {
            id: blog.id
        }
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