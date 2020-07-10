
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const handleLogin = receivedToken => {
    setToken(receivedToken)
    localStorage.setItem('library-user-token', receivedToken)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const persistedToken = window.localStorage.getItem('library-user-token')
    if (persistedToken) {
        setToken(persistedToken)
    }
}, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('editAuthor')}>edit author</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => handleLogout()}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <EditAuthor
        show={page === 'editAuthor'}
      />

      <LoginForm handleLogin={handleLogin}
        show={page === 'login'}
      />    

    </div>
  )
}

export default App