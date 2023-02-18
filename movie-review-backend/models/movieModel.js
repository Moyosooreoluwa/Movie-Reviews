import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    tags: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
