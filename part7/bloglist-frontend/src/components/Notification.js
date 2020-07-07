import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

    const notification = useSelector(state => state.notification.notification)
    const color = useSelector(state => state.notification.color)

    if (notification === null) {
        return null
    }

    // TODO ugly
    if(color === 'red') {
        return (
            <Alert variant='danger'>
                {notification}
            </Alert>
        )
    }

    return (
        <Alert variant='success'>
                {notification}
            </Alert>
    )
}

export default Notification