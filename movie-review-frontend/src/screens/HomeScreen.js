import React, { useContext, useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import MovieList from '../Components/MovieList';
import PostReview from '../Components/PostReview';
import About from '../Components/About';
import LoadingSpinner from '../Components/LoadingSpinner';
import MessageBox from '../Components/MessageBox';
import { Store } from '../store';
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, movies: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  // const [movies, setMovies] = useState([]);
  const [{ loading, error, movies }, dispatch] = useReducer(reducer, {
    movies: [],
    loading: true,
    error: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('api/movies');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.movies });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //setMovies(result.data.movies);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>MovieReviews - I review some movies</title>
      </Helmet>
      <Container>
        <Row>
          <Col>{userInfo ? <PostReview /> : <About />}</Col>
          <Col>
            <h2 className="movie-list-title">Movies</h2>
            <Container className="movie-list-container">
              {/* <input
              className="mt-2 mb-2 search"
              type="text"
              placeholder="Search movie names or tags"
            /> */}
              <Form className="d-flex me-auto search">
                <InputGroup>
                  <FormControl
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search movie names or tags..."
                    aria-label="Search movie names or tags..."
                    aria-describedby="button-search"
                  ></FormControl>
                </InputGroup>
              </Form>

              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : searchTerm === '' ? (
                movies.map((movie) => (
                  <div key={movie._id} className="mt-5">
                    <MovieList
                      name={movie.name}
                      rating={movie.rating}
                      tags={movie.tags}
                      review={movie.review}
                    />
                  </div>
                ))
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
                      <MovieList
                        name={movie.name}
                        rating={movie.rating}
                        tags={movie.tags}
                        review={movie.review}
                      />
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
