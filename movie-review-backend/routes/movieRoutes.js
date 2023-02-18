import express from 'express';
import Movie from '../models/movieModel.js';

const movieRouter = express.Router();

movieRouter.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

export default movieRouter;
