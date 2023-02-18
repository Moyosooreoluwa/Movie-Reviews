import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';

export default function PostReview() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [tags, setTags] = useState('');

  const postHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/movies', {
        name,
        rating,
        review,
        tags,
      });
      toast.success('Review Posted.');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <div className="mb-3">
        <h2>Post a Review</h2>
      </div>
      <Container>
        <div className="form-border mt-5">
          <Form className="post-form" onSubmit={postHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label className="label">Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setRating(e.target.value)}
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
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label className="label">Tags (Genre)</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setTags(e.target.value)}
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
  );
}
