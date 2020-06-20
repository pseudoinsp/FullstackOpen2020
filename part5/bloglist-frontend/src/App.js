import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 

  const [password, setPassword] = useState('')
  
  const [user, setUser] = useState(null) 

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageColor, setNotificationColor] = useState('green')

  const newBlogFormRef = React.createRef()

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
      const addedBlog = await blogService.create(newBlog)
      console.log(addedBlog)
      newBlogFormRef.current.toggleVisibility()
      notifyUser(`Added blog with title ${addedBlog.title}`, 'green')
      setBlogs(blogs.concat(addedBlog))
    }
    catch (exception) {
      notifyUser(`Blog was not added: ${exception}`, 'red')
      console.log('error during new blog addition')
    }
  }

  const isRemoveEnabled = (blog) => {
    return user.username === blog.user.username
  }

  const deleteBlog = async blogToDelete => {
    if(window.confirm(`Are you sure you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        await blogService.deleteBlog(blogToDelete.id)
        notifyUser(`Removed blog with title ${blogToDelete.title}`, 'green')
        setBlogs(blogs.filter(b => b.id !== blogToDelete.id))
      }
      catch (exception) {
        notifyUser(`Blog was not deleted: ${exception}`, 'red')
      }
    }
  }

  const incrementLike = async blogToUpdate => {
    try {
      const blogDTO = {...blogToUpdate}
      blogDTO.likes++
      await blogService.update(blogToUpdate.id, blogDTO)
      notifyUser(`Like number increased to ${blogDTO.likes}`, 'green')
      setBlogs(blogs.map(b => b.id !== blogToUpdate.id ? b : blogDTO))
    }
    catch (exception) {
      notifyUser(`Like was not added: ${exception}`, 'red')
      console.log('error during new blog update')
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
          <Togglable buttonLabel='new blog' ref={newBlogFormRef} >
            <NewBlogForm createNewBlog={addNewBlog} />  
          </Togglable>
        </div>
        <div>
          <h2>blogs</h2>
          {username} logged in 
          <button onClick={() => handleLogout()}>logout</button>
          {blogs.sort((x, y) => parseFloat(y.likes) - parseFloat(x.likes)).map(blog =>
            <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeEnabled={isRemoveEnabled} remove={deleteBlog} />
          )}
        </div>
    </>
  )
}

export default App