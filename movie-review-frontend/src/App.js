import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostReview from './Components/PostReview';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="mb-5">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>MovieReviews</Navbar.Brand>
              </LinkContainer>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  {/* {!userInfo && ( */}
                  <Link className="nav-link" to="/signin">
                    Sign In (Admin Only)
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Row>
              <Col>
                <div className="mb-3">
                  <h2>Post a Review</h2>
                </div>
                <PostReview />
              </Col>
              <Col>
                <h2>Movies</h2>
              </Col>
            </Row>
          </Container>
        </main>

        <footer className="mt-5">
          <div className="text-center">Moyo 2022</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
