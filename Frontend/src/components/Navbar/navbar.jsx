import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate,Link} from "react-router-dom";


function NavScrollExample({logout}) {
  const navigate  = useNavigate();

  const deleteToken= ()=>{
    localStorage.removeItem("token");
    logout();
  }

 
  return (
    <Navbar bg="dark" className='navbar-dark' expand="lg" id="nav">
      <Container fluid>
        <Navbar.Brand as={Link}  to="/"> E-commerce </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',color: 'white' }}
            navbarScroll
          as={Link} to="/">Home
            
          </Nav>

          <Nav style={{paddingRight:"7rem"}}>
          <Nav.Link as={Link} to="/cart"><i className="fa fa-shopping-cart"></i></Nav.Link>
          <NavDropdown title={<i className="fa fa-user"></i>} id="navbarScrollingDropdown" className="dropdown-menu-right">
              <NavDropdown.Item as={Link} to="/">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/order">My Orders</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/changepass">Change Password</NavDropdown.Item>
              <NavDropdown.Item onClick={deleteToken} as={Link} to="/login">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
}

export default NavScrollExample;