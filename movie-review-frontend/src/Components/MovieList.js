import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export default function MovieList(props) {
  return (
    <Card key={props.name}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.tags}</Card.Subtitle>
        <Card.Text>{props.review}</Card.Text>
        <Card.Footer>{props.rating} /100</Card.Footer>
      </Card.Body>
    </Card>
  );
}
