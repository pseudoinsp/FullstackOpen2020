import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeBlogs, createBlog ,likeBlog, deleteBlog  } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const newBlogFormRef = React.createRef()
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.userinfo?.user)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const loadedUser = JSON.parse(loggedUserJSON)
            dispatch(setUser(loadedUser))
            blogService.setToken(loadedUser.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const receivedUser = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(receivedUser))
            dispatch(setUser(receivedUser))
            blogService.setToken(receivedUser.token)
            setUsername('')
            setPassword('')
            dispatch(setNotification(`Successful login with user ${receivedUser.name}`, 'green', 3))
            console.log('successful login')
        }
        catch(exception) {
            dispatch(setNotification(`Unsuccessful login: ${exception}`, 'red', 3))
            console.log('unsuccessful login')
        }
    }

    const handleLogout = event => {
        console.log('logout called')
        blogService.setToken(null)
        dispatch(setNotification(`Logged out from user ${user.name}`, 'green', 3))
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }

    const addNewBlog = async (newBlog) => {
        try {
            dispatch(createBlog(newBlog))
            newBlogFormRef.current.toggleVisibility()
            dispatch(setNotification(`Added blog with title ${newBlog.title}`, 'green', 3))
        }
        catch (exception) {
            dispatch(setNotification(`Blog was not added: ${exception}`, 'red', 3))
            console.log('error during new blog addition')
        }
    }

    const isRemoveEnabled = (blog) => {
        return user.username === blog.user.username
    }

    const handleBlogDeletion = async blogToDelete => {
        if(window.confirm(`Are you sure you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
            try {
                dispatch((deleteBlog(blogToDelete)))
                dispatch(setNotification(`Removed blog with title ${blogToDelete.title}`, 'green', 3))
            }
            catch (exception) {
                dispatch(setNotification(`Blog was not deleted: ${exception}`, 'red', 3))
            }
        }
    }

    const incrementLike = async blogToUpdate => {
        try {
            dispatch(likeBlog(blogToUpdate))
            dispatch(setNotification(`Like number increased to ${blogToUpdate.likes + 1}`, 'green', 3))
        }
        catch (exception) {
            dispatch(setNotification(`Like was not added: ${exception}`, 'red', 3))
            console.log('error during new blog update')
        }
    }

    if(user === null) {
        return (
            <div>
                <Notification />
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                      username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            id="username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            id="password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button id="login-button" type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <>
            <div>
                <Notification />
                <h2>Create new</h2>
                <Togglable buttonLabel='new blog' ref={newBlogFormRef} >
                    <NewBlogForm createNewBlog={addNewBlog} />
                </Togglable>
            </div>
            <div>
                <h2>blogs</h2>
                {user?.username} logged in
                <button onClick={() => handleLogout()}>logout</button>
                {blogs.sort((x, y) => parseFloat(y.likes) - parseFloat(x.likes)).map(blog =>
                    <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeEnabled={isRemoveEnabled} remove={handleBlogDeletion} />
                )}
            </div>
        </>
    )
}

export default App