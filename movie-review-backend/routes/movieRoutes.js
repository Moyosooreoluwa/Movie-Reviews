import express from 'express';
import Movie from '../models/movieModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const movieRouter = express.Router();

movieRouter.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

movieRouter.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (movie) {
    res.send(movie);
  } else {
    res.status(404).send('Movie not found.');
  }
});

movieRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newMovie = new Movie({
      name: req.body.name,
      year: req.body.year,
      rating: req.body.rating,
      review: req.body.review,
      tags: req.body.tags,
    });
    const movie = await newMovie.save();
    res.send({
      _id: movie._id,
      name: movie.name,
      year: movie.year,
      rating: movie.rating,
      review: movie.review,
      tags: movie.tags,
    });
    res.send('Review Created');
  })
);

movieRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      await movie.remove();
      res.send({ message: 'Movie Deleted' });
    } else {
      res.status(404).send({ message: 'Movie not found.' });
    }
  })
);

export default movieRouter;
