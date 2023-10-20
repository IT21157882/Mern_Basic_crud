import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import  logout SVG icon
import LogoutIcon from '../assets/logout-icon.svg';

function ResponsiveAppBar() {
  const linkStyles = {
    color: '#333',
    textDecoration: 'none',
    margin: '0 10px',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  };

  const hoverStyles = {
    color: '#007BFF', // Text color on hover
    textDecoration: 'underline', // Underline the text on hover
  };

  return (
    <Navbar expand="lg" bg="primary" variant="light">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/home" style={linkStyles}>Home</Nav.Link>
            <Nav.Link href="/favorites" style={linkStyles}>Favorite</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* Logout button with SVG icon */}
        <Link to="/login" className="btn btn-light">
          <span style={{ marginRight: '5px' }}></span>
          <img src={LogoutIcon} alt="Logout" width="15" height="15" />
        </Link>
      </Container>
    </Navbar>
  );
}

export default ResponsiveAppBar;
