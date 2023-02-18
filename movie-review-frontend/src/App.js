import './App.css';

import { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Link, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SigninScreen from './screens/SigninScreen';
import HomeScreen from './screens/HomeScreen';
import { Store } from './store';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <BrowserRouter>
      <div>
        <ToastContainer position="bottom-center" limit={1} />
        <header className="mb-5">
          <Navbar
            bg="transparent"
            variant="transparent"
            expand="lg"
            sticky="top"
          >
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>MovieReviews</Navbar.Brand>
              </LinkContainer>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end ">
                  {userInfo ? (
                    <Link
                      className="nav-link nav-text"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Admin Sign Out
                    </Link>
                  ) : (
                    <Link className="nav-link nav-text" to="/signin">
                      Sign In (Admin Only)
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>

        <footer className="mt-5">
          <div className="text-center">Moyo 2023</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
