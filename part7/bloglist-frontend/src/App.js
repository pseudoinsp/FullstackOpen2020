import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog  } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)

    const newBlogFormRef = React.createRef()
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

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
        setUser(null)
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

    const deleteBlog = async blogToDelete => {
        if(window.confirm(`Are you sure you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
            try {
                // await blogService.deleteBlog(blogToDelete.id)
                dispatch(setNotification(`Removed blog with title ${blogToDelete.title}`, 'green', 3))
                // setBlogs(blogs.filter(b => b.id !== blogToDelete.id))
            }
            catch (exception) {
                // dispatch(setNotification(`Blog was not deleted: ${exception}`, 'red', 3))
            }
        }
    }

    const incrementLike = async blogToUpdate => {
        try {
            // const blogDTO = { ...blogToUpdate }
            // blogDTO.likes++
            // await blogService.update(blogToUpdate.id, blogDTO)
            // dispatch(setNotification(`Like number increased to ${blogDTO.likes}`, 'green', 3))
            // setBlogs(blogs.map(b => b.id !== blogToUpdate.id ? b : blogDTO))
        }
        catch (exception) {
            // dispatch(setNotification(`Like was not added: ${exception}`, 'red', 3))
            // console.log('error during new blog update')
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
                {user.username} logged in
                <button onClick={() => handleLogout()}>logout</button>
                {blogs.sort((x, y) => parseFloat(y.likes) - parseFloat(x.likes)).map(blog =>
                    <Blog key={blog.id} blog={blog} incrementLike={incrementLike} removeEnabled={isRemoveEnabled} remove={deleteBlog} />
                )}
            </div>
        </>
    )
}

export default App