import React from 'react'

const User = ({user}) => {
    console.log(user)

    if(!user) {
        return null
    }

    return (
        <>
            <h1>{user.username}</h1>
            <h2>added blogs</h2>
            <ul>
                {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
            </ul>
        </>
    )
}

export default User