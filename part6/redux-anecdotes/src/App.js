import React from 'react'
import AnecdoteForm from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
          <AnecdoteForm />
          <br />
          <AnecdoteList />
    </div>
  )
}

export default App