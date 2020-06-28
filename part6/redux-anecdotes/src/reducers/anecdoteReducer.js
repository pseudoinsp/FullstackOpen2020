const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const votedAnecdote = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...votedAnecdote, 
        votes: votedAnecdote.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    case 'CREATE_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    data: {
      id
    }
  }
}

export const createAnecdote = anecdote => {
  return {
    type: "CREATE_ANECDOTE",
    data : {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer