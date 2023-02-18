import React, { useContext, useReducer } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Store } from '../store';
import axios from 'axios';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function MovieList(props) {
  const [{ loading, error, movies, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const deleteHandler = async (movie) => {
    if (window.confirm('are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${movie._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('Product Deleted');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(err);
        dispatch({ type: 'DELETE_FAIL' });
      }
    }
  };
  return (
    <Card key={props._id} className="card-list">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.tags}</Card.Subtitle>
        <Card.Text>{props.review}</Card.Text>
        <Card.Footer>
          {props.rating} / 100{'          '}
          {userInfo && (
            <Button
              onClick={() => deleteHandler(props)}
              className="btn-delete"
              variant="danger"
            >
              -
            </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
