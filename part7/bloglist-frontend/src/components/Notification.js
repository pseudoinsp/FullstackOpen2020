import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(state => state.notification.notification)
    const color = useSelector(state => state.notification.color)

    const notificationStyle = {
        color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    console.log(notification)
    if (notification === null) {
        return null
    }

    return (
        <div className="error" style={notificationStyle}>
            {notification}
        </div>
    )
}

export default Notification