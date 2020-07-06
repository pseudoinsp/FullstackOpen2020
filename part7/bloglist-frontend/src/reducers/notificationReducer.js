const initialState = { notification: null, color: 'red' }
let currentTimeout = null

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
      
    switch(action.type) {
      case 'SET_NOTIFICATION':
        return action.data
      default:
        return state
    }
}

export const setNotification = (notification, color, shownSec) => {
    return async dispatch => {
        if(currentTimeout !== null)
            clearTimeout(currentTimeout)

        dispatch({
            type: 'SET_NOTIFICATION',
            data: { notification, color }
        })

        await new Promise(resolve => currentTimeout = setTimeout(resolve, shownSec * 1000))

        dispatch({
            type: 'SET_NOTIFICATION',
            data: { notification: null, color: 'red' }    
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        data: { notification: null, color: 'red' }    
    }
}

export default notificationReducer


