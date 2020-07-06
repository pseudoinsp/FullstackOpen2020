import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    // case 'VOTE_ANECDOTE':
    //   const id = action.data.id
    //   const votedAnecdote = state.find(n => n.id === id)
    //   const changedAnecdote = { 
    //     ...votedAnecdote, 
    //     votes: votedAnecdote.votes + 1 
    //   }
    //   return state.map(anecdote =>
    //     anecdote.id !== id ? anecdote : changedAnecdote 
    //   )
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

// export const vote = anecdote => {
//   return async dispatch => {
//     const modifiedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
//     await anecdoteService.update(modifiedAnecdote)

//     dispatch({
//       type: "VOTE_ANECDOTE",
//       data: {
//         id: anecdote.id
//       }
//     })
//   }
// }

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