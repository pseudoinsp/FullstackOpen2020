const initialState = null
let currentTimeout = null

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
      
    switch(action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      default:
        return state
    }
}

export const setNotification = (notification, shownSec) => {
    return async dispatch => {

        if(currentTimeout !== null)
            clearTimeout(currentTimeout)

        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })

        await new Promise(resolve => currentTimeout = setTimeout(resolve, shownSec * 1000))

        dispatch({
            type: 'SET_NOTIFICATION',
            notification : null    
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        notification : null
    }
}

export default notificationReducer


