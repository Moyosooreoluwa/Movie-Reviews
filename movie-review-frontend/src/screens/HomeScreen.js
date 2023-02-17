import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import MovieList from '../Components/MovieList';
import PostReview from '../Components/PostReview';

export default function HomeScreen() {
  const data = [
    {
      name: 'Avengers: Endgame1',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
    {
      name: 'Avengers: Endgame2',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
    {
      name: 'Avengers: Endgame3',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
    {
      name: 'Avengers: Endgame4',
      rating: 88,
      review: 'Avengers Assemble',
      tags: 'Superhero, Action, Fiction',
    },
  ];
  return (
    <Container>
      <Row>
        <Col>
          <div className="mb-3">
            <h2>Post a Review</h2>
          </div>
          <PostReview />
        </Col>
        <Col>
          <h2 className="movie-list-title">Movies</h2>
          <Container className="movie-list-container">
            {data.map((x) => (
              <div key={x.name} className="mt-5">
                <MovieList
                  name={x.name}
                  rating={x.rating}
                  tags={x.tags}
                  review={x.review}
                />
              </div>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
