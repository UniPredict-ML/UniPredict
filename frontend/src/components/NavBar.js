import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ onCoursePredictionClick, onAboutUsClick, onHomeClick }) {
  return (
    <Navbar
      className="navbar-custom"
      style={{
        maxWidth: '40rem',
        transform: 'skewX(25deg)',
        marginTop: '50px'
      }}
      collapseOnSelect
      expand="lg"
    >
      <Container style={{ transform: 'skewX(-25deg)' }}>
        <Navbar.Brand style={{ marginLeft: '0.5rem', marginRight: '2.5rem' }}>🎓 UniPredct</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link style={{ transform: 'skewX(25deg)' }} onClick={onHomeClick}>
              <span style={{ display: 'inline-block', transform: 'skewX(-25deg)' }}>Home</span>
            </Nav.Link>
            <Nav.Link style={{ transform: 'skewX(25deg)' }} onClick={onCoursePredictionClick}>
              <span style={{ display: 'inline-block', transform: 'skewX(-25deg)' }}>Course Prediction</span>
            </Nav.Link>
            <Nav.Link style={{ transform: 'skewX(25deg)' }} onClick={onAboutUsClick}>
              <span style={{ display: 'inline-block', transform: 'skewX(-25deg)' }}>About Us</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
