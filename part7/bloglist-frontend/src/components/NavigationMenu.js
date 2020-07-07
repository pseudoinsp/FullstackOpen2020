import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavigationMenu = ({ user, handleLogout }) => {
    const padding = {
      paddingRight: 5
    }

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to="/" style={padding}>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to='/users' style={padding}>users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user?.username} logged in
                        <button onClick={() => handleLogout()}>logout</button>
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  export default NavigationMenu