import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

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
                        <td><Link to={`/users/${u.id}`}>{u.username}</Link></td>
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