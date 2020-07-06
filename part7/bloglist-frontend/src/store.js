import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import thunk from 'redux-thunk'

const aggregateReducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    userinfo: userReducer
})

const store = createStore(
    aggregateReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store