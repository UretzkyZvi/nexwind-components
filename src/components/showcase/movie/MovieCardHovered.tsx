import React from "react";
import { Movie } from "./type";
import { imageBaseUrl } from "../../../server/tmdbService";
import { motion } from "framer-motion";

type MovieCardHoveredProps = {
  movie: Movie;
};

const MovieCardHovered: React.FC<MovieCardHoveredProps> = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
      transition={{ duration: 0.4 }}
      className="bg-black text-white rounded p-4 shadow-lg max-w-[300px]  h-96  movieCardHovered"
    >
      <img
        src={`${imageBaseUrl}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-sm truncate">{movie.overview}</p>
        <button className="mt-4 bg-red-600 px-4 py-2 rounded text-white">
          Watch Now
        </button>
      </div>
    </motion.div>
  );
};

export default MovieCardHovered;
