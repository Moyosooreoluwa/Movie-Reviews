import React, { useContext, useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import axios from 'axios';

import About from '../Components/About';
import LoadingSpinner from '../Components/LoadingSpinner';
import MessageBox from '../Components/MessageBox';
import { Store } from '../store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, movies: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        successCreate: true,
      };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    case 'CREATE_RESET':
      return { ...state, loading: false, successCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loading: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loading: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loading: false, successDelete: false };

    default:
      return state;
  }
};

export default function HomeScreen() {
  const [
    {
      loading,
      error,
      movies,
      loadingCreate,
      loadingDelete,
      successDelete,
      successCreate,
    },
    dispatch,
  ] = useReducer(reducer, {
    movies: [],
    loading: true,
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [tags, setTags] = useState('');

  const postHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/movies',
        {
          name,
          year,
          rating,
          review,
          tags,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      // window.location.href = '/';
      toast.success('Review Posted.');
      onClear();
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };

  const onClear = () => {
    setName('');
    setYear('');
    setRating('');
    setReview('');
    setTags('');
  };

  const deleteHandler = async (movie) => {
    if (window.confirm('are you sure you want to delete this product?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/movies/${movie._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('Product Deleted');
      } catch (err) {
        dispatch({ type: 'DELETE_FAIL' });
        toast.error(getError(err));
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/movies');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        console.log(result.data.length);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else if (successCreate) {
      dispatch({ type: 'CREATE_RESET' });
    } else {
      fetchData();
    }
  }, [successCreate, successDelete]);

  return (
    <div>
      <Helmet>
        <title>MovieReviews - I review some movies.</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            {userInfo ? (
              <div>
                <div className="mb-3">
                  <h2>Post A Review</h2>
                  <Container>
                    <div className="form-border mt-5">
                      <Form className="post-form" onSubmit={postHandler}>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label className="label">Name</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            autocomplete="off"
                          />
                          <Form.Text className="text-muted">
                            E.g The Godfather
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="year">
                          <Form.Label className="label">Year</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setYear(e.target.value)}
                            value={year}
                            autocomplete="off"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rating">
                          <Form.Label className="label">Rating</Form.Label>
                          <Form.Control
                            type="number"
                            max={100}
                            min={0}
                            required
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            autocomplete="off"
                          />
                          <Form.Text className="text-muted">
                            Out of 100
                          </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="review">
                          <Form.Label className="label">Review</Form.Label>
                          <Form.Control
                            className="inputs"
                            as="textarea"
                            required
                            aria-multiline
                            onChange={(e) => setReview(e.target.value)}
                            value={review}
                            autocomplete="off"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tags">
                          <Form.Label className="label">
                            Tags (Genre)
                          </Form.Label>
                          <Form.Control
                            type="text"
                            required
                            onChange={(e) => setTags(e.target.value)}
                            value={tags}
                            autocomplete="off"
                          />
                          <Form.Text className="text-muted">
                            E.g Thriller, Animation, etc.
                          </Form.Text>
                        </Form.Group>
                        <div className="'mb-3">
                          <Button className="btn-post" type="submit">
                            Post
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Container>
                </div>
              </div>
            ) : (
              <About />
            )}
          </Col>
          <Col>
            <h2 className="movie-list-title">Movies</h2>
            <Container className="movie-list-container">
              <Form className="d-flex me-auto search">
                <InputGroup>
                  <FormControl
                    type="text"
                    name="q"
                    id="q"
                    autoComplete="off"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movie names or tags..."
                    aria-label="Search movie names or tags..."
                    aria-describedby="button-search"
                  ></FormControl>
                </InputGroup>
              </Form>

              {searchTerm === '' ? (
                <div className="text-muted mt-1">Reviews: {movies.length}</div>
              ) : (
                <div className="text-muted mt-1">
                  Reviews:{' '}
                  {
                    movies.filter(
                      (movie) =>
                        movie.name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        movie.tags
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    ).length
                  }
                </div>
              )}
              {/* {loadingCreate && <LoadingSpinner />}
              {loadingDelete && <LoadingSpinner />} */}
              {loading && <LoadingSpinner />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              {loading === false && searchTerm === '' && movies.length === 0 ? (
                <MessageBox variant="dark">No movies found.</MessageBox>
              ) : searchTerm === '' ? (
                movies.map((movie) => (
                  <div key={movie._id} className="mt-5">
                    <Card key={movie._id} className="card-list">
                      <Card.Body>
                        {' '}
                        <Card.Header className="text-muted year">
                          {movie.year}
                        </Card.Header>
                        <Card.Title className="">{movie.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {movie.tags}
                        </Card.Subtitle>
                        <Card.Text>{movie.review}</Card.Text>
                        <Card.Footer>
                          {movie.rating} / 100
                          {userInfo && (
                            <Button
                              onClick={() => deleteHandler(movie)}
                              type="button"
                              className="btn-delete"
                              variant="danger"
                            >
                              -
                            </Button>
                          )}
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              ) : movies.filter(
                  (movie) =>
                    movie.name
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase()) ||
                    movie.tags.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 ? (
                <MessageBox variant="dark">No Movies Found</MessageBox>
              ) : (
                movies
                  .filter(
                    (movie) =>
                      movie.name
                        .toLowerCase()
                        .includes(searchTerm.toLocaleLowerCase()) ||
                      movie.tags
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((movie) => (
                    <div key={movie._id} className="mt-5">
                      <Card key={movie._id} className="card-list">
                        <Card.Body>
                          {' '}
                          <Card.Title>{movie.name}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {movie.tags}
                          </Card.Subtitle>
                          <Card.Text>{movie.review}</Card.Text>
                          <Card.Footer>
                            {movie.rating} / 100
                            {userInfo && (
                              <Button
                                onClick={() => deleteHandler(movie)}
                                type="button"
                                className="btn-delete"
                                variant="danger"
                              >
                                -
                              </Button>
                            )}
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
