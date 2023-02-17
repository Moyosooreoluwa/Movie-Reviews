import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function PostReview() {
  return (
    <Container>
      <div className="form-border mt-5">
        <Form className="post-form">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="label">Name</Form.Label>
            <Form.Control
              type="text"
              required
              // onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">E.g The Godfather</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label className="label">Rating</Form.Label>
            <Form.Control
              type="number"
              max={100}
              min={0}
              required
              // onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">Out of 100</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="review">
            <Form.Label className="label">Review</Form.Label>
            <Form.Control
              className="inputs"
              as="textarea"
              required
              aria-multiline

              // onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label className="label">Tags (Genre)</Form.Label>
            <Form.Control
              type="text"
              required
              // onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted">
              E.g Thriller, Animation, etc.
            </Form.Text>
          </Form.Group>
          <div className="'mb-3">
            <Button type="submit">Post</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
