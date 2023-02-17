import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
// import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
// import { Store } from '../store/store';
// import { toast } from 'react-toastify';
// import { getError } from '../utils';

const SigninScreen = () => {
  // const navigate = useNavigate();
  // const { search } = useLocation();
  // const redirectInUrl = new URLSearchParams(search).get('redirect');
  // const redirect = redirectInUrl ? redirectInUrl : '/';

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { userInfo } = state;

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post('/api/users/signin', {
  //       email,
  //       password,
  //     });
  //     ctxDispatch({ type: 'USER_SIGNIN', payload: data });
  //     localStorage.setItem('userInfo', JSON.stringify(data));
  //     navigate(redirect || '/');
  //   } catch (err) {
  //     toast.error(getError(err));
  //   }
  // };
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>MovieReviews - Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form
      // onSubmit={submitHandler}
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            // onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="'mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3" style={{ margin: '1rem 0 1rem 0' }}>
          <p className="text-muted">Note: This is for admin only.</p>
        </div>
      </Form>
    </Container>
  );
};

export default SigninScreen;
