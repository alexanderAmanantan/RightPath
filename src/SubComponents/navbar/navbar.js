// src/SubComponents/navbar/navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import './navbar.css';

function NavbarComponent({ activePage, setActivePage }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (path) => {
    setActivePage(path);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center logo-button-container" onClick={() => handleNavLinkClick('/')}>
          {/* Logo */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggleMenu} />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={isMenuOpen}
          onHide={handleToggleMenu}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex justify-content-between align-items-center">
            <Nav className="justify-content-center flex-grow-1 pe-0">
              <Nav.Link
                as={Link}
                to="/travel-packages"
                onClick={() => handleNavLinkClick('/travel-packages')}
                className={activePage === '/travel-packages' ? 'active' : ''}
              >
                Travel Packages
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/transportation"
                onClick={() => handleNavLinkClick('/transportation')}
                className={activePage === '/transportation' ? 'active' : ''}
              >
                Transportation
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/trip-planner"
                onClick={() => handleNavLinkClick('/trip-planner')}
                className={activePage === '/trip-planner' ? 'active' : ''}
              >
                Trip Planner
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/testimonials"
                onClick={() => handleNavLinkClick('/testimonials')}
                className={activePage === '/testimonials' ? 'active' : ''}
              >
                Testimonials
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/about-us"
                onClick={() => handleNavLinkClick('/about-us')}
                className={activePage === '/about-us' ? 'active' : ''}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/access"
                onClick={() => handleNavLinkClick('/access')}
                className={activePage === '/access' ? 'active' : ''}
              >
                Login/Signup
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
