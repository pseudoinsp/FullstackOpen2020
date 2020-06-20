import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 

  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null) 

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageColor, setNotificationColor] = useState('green')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loadedUser = JSON.parse(loggedUserJSON)
      setUser(loadedUser)
      blogService.setToken(loadedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const receivedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(receivedUser))
      setUser(receivedUser)
      blogService.setToken(receivedUser.token)
      setUsername('')
      setPassword('')
      notifyUser(`Successful login with user ${receivedUser.name}`, 'green')
      console.log('successful login')
    }
    catch(exception) {
      notifyUser(`Unsuccessful login: ${exception}`, 'red')
      console.log('unsuccessful login')
    }
  }

  const handleLogout = event => {
     console.log('logout called')
     blogService.setToken(null) 
     notifyUser(`Logged out from user ${user.name}`, 'green')
     window.localStorage.removeItem('loggedBlogappUser')
     setUser(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
    }
    catch (exception) {
      notifyUser(`Blog was not added: ${exception}`, 'red')
      console.log('error during new blog addition')
    }
  }

  const notifyUser = (message, color) => {
    setNotificationColor(color)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  if(user === null) {
    return (
      <div>
        <Notification message={notificationMessage} color={notificationMessageColor} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
            <div>
              username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
    )
  }

  return (
    <>
      <div>
        <Notification message={notificationMessage} color={notificationMessageColor} />
          <h2>Create new</h2>
           <NewBlogForm createNewBlog={addNewBlog} />
        </div>
        <div>
          <h2>blogs</h2>
          {username} logged in 
          <button onClick={() => handleLogout()}>logout</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      
    </>
  )
}

export default App