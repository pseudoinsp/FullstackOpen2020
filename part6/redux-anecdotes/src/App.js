import React from 'react'
import AnecdoteForm from './components/NewAnecdote'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
          <Filter />
          <AnecdoteForm />
          <br />
          <AnecdoteList />
    </div>
  )
}

export default App