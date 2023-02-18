import express from 'express';
import Movie from '../models/movieModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Movie.remove({});
  const createdMovies = await Movie.insertMany(data.movies);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdMovies, createdUsers });
});

export default seedRouter;
