import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Store } from '../store';

export default function MovieList(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    <Card key={props.name} className="card-list">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.tags}</Card.Subtitle>
        <Card.Text>{props.review}</Card.Text>
        <Card.Footer>
          {props.rating} / 100{'          '}
          {userInfo && (
            <Button className="btn-delete" variant="danger">
              -
            </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
