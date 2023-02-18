import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Helmet } from 'react-helmet-async';

import MovieList from '../Components/MovieList';
import PostReview from '../Components/PostReview';
import About from '../Components/About';
import data from '../data';

export default function HomeScreen() {
  return (
    <div>
      <Helmet>
        <title>MovieReviews - I review some movies</title>
      </Helmet>
      <Container>
        <Row>
          <Col>
            {/* <PostReview /> */}
            <About />
          </Col>
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
                    // onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movie names or tags..."
                    aria-label="Search movie names or tags..."
                    aria-describedby="button-search"
                  ></FormControl>
                </InputGroup>
              </Form>
              {data.movies.map((movie) => (
                <div key={movie.name} className="mt-5">
                  <MovieList
                    name={movie.name}
                    rating={movie.rating}
                    tags={movie.tags}
                    review={movie.review}
                  />
                </div>
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
