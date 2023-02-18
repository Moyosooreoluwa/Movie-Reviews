import express from 'express';
import Movie from '../models/movieModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Movie.remove({});
  const createdMovies = await Movie.insertMany(data.movies);
  res.send(createdMovies);
});

export default seedRouter;
