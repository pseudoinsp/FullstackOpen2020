import React from 'react'
import PropTypes from 'prop-types'

const Users = ({users}) => {
    console.log(users)
    return (
        <>
            <h2>Users</h2>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Blogs created</th>
                </tr>
                {users.map(u => 
                    <tr key={u.id}>
                        <td>{u.username}</td>
                        <td>{u.blogs.length}</td>
                    </tr> 
                )}
                </tbody>
            </table>
        </>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
}

export default Users