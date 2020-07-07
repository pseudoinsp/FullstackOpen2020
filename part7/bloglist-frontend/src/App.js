import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import DetailedBlog from './components/DetailedBlog'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NavigationMenu from './components/NavigationMenu'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs, createBlog ,likeBlog, deleteBlog, addComment  } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
    Switch, Route, useRouteMatch, useHistory    
  } from "react-router-dom"
import { Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const newBlogFormRef = React.createRef()
    const dispatch = useDispatch()
    const history = useHistory()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.userinfo?.user)
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
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
        dispatch(setNotification(`Logged out from user ${user?.username}`, 'green', 3))
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
        return user?.username === blog?.user.username
    }

    const handleBlogDeletion = async blogToDelete => {
        if(window.confirm(`Are you sure you want to remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
            try {
                dispatch((deleteBlog(blogToDelete)))
                dispatch(setNotification(`Removed blog with title ${blogToDelete.title}`, 'green', 3))
                history.push('/blogs')
            }
            catch (exception) {
                dispatch(setNotification(`Blog was not deleted: ${exception}`, 'red', 3))
            }
        }
    }

    const handleAddComment = async (blogToAddTo, comment) => {
        try {
            dispatch(addComment(blogToAddTo, comment))
            dispatch(setNotification(`Comment added to ${blogToAddTo.title}`, 'green', 3))
        }
        catch (exception) {
            dispatch(setNotification(`Comment was not added: ${exception}`, 'red', 3))
            console.log('error during new blog comment')
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

    const usersMatch = useRouteMatch('/users/:id')
    const queriedUser = usersMatch 
    ? users.find(a => a.id === (usersMatch.params.id))
    : null

    const blogsMatch = useRouteMatch('/blogs/:id')
    const queriedBlog = blogsMatch 
    ? blogs.find(a => a.id === (blogsMatch.params.id))
    : null

    if(!user) {
        return (
            <div>
                <Notification />
                <h2>Log in to application</h2>
                <Form onSubmit={handleLogin}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                                value={username}
                                name="Username"
                                id="username"
                                onChange={({ target }) => setUsername(target.value)} />
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                value={password}
                                name="Password"
                                id="password"
                                onChange={({ target }) => setPassword(target.value)} />
                        <Button variant="primary" id="login-button" type="submit">login</Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }

    return (
        <div class='container'>
            <div>
                <Notification />
                <NavigationMenu user={user} handleLogout={handleLogout} />
                <h2>blog app</h2>
                <Togglable buttonLabel='new blog' ref={newBlogFormRef} >
                    <NewBlogForm createNewBlog={addNewBlog} />
                </Togglable>
            </div>
            <Switch>
                <Route path="/users/:id">
                    <User user={queriedUser} />
                </Route>
                <Route path="/users">
                    <Users users={users} />
                </Route>
                <Route path="/blogs/:id">
                    <DetailedBlog blog = {queriedBlog} incrementLike={incrementLike} handleAddComment={handleAddComment} removeEnabled={isRemoveEnabled} remove={handleBlogDeletion} />
                </Route>
                <Route path="/">
                    <div>
                        <ListGroup variant="flush">
                        {blogs.sort((x, y) => parseFloat(y.likes) - parseFloat(x.likes)).map(blog =>
                            <ListGroupItem>
                                <Blog key={blog.id} blog={blog} />
                            </ListGroupItem>)}
                        </ListGroup>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default App