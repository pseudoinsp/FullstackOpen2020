const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SET_FILTER':
        return action.filter
      default:
        return state
    }
}

export const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default notificationReducer


