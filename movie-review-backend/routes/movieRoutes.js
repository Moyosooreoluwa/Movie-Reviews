import express from 'express';
import Movie from '../models/movieModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin } from '../utils.js';

const movieRouter = express.Router();

movieRouter.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

movieRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newMovie = new Movie({
      name: req.body.name,
      rating: req.body.rating,
      review: req.body.review,
      tags: req.body.tags,
    });
    const movie = await newMovie.save();
    res.send({
      _id: movie._id,
      name: movie.name,
      rating: movie.rating,
      review: movie.review,
      tags: movie.tags,
    });
    res.send('Review Created');
  })
);

movieRouter.delete(
  '/:id',
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
