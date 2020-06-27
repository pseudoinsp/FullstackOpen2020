import React from 'react'
import AnecdoteForm from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
          <AnecdoteForm />
          <br />
          <AnecdoteList />
    </div>
  )
}

export default App