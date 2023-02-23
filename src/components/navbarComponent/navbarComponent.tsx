import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../services/auth/authService';

const NavbarComponent = () => {

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/weather">Weather App</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;