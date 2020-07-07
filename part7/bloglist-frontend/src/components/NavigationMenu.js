import React from 'react'
import { Link } from 'react-router-dom'

const NavigationMenu = ({ user, handleLogout }) => {
    const padding = {
      paddingRight: 5
    }

    return (
      <div>
        <Link to="/" style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        {user?.username} logged in
                        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  export default NavigationMenu