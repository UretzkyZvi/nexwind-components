import React, { useRef, useState } from "react";
import { Movie } from "./type";
import MovieCardHovered from "./MovieCardHovered"; // Import the new component
import { imageBaseUrl } from "../../../server/tmdbService";
import MovieCardPortal from "./MovieCardPortal";
import { AnimatePresence } from "framer-motion";

type MovieCardProps = {
  movie: Movie;
  onMovieSelect: (movie: Movie) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, onMovieSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();

      return {
        top: cardRect.top + window.scrollY - cardRect.height - 30,
        left: cardRect.left + window.scrollX - cardRect.width / 8,
        position: "absolute",
      } as React.CSSProperties;
    }
    return null;
  };
  return (
    <div
      ref={cardRef}
      className="min-w-[240px] cursor-pointer relative"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onMovieSelect(movie)}
    >
      <img
        src={`${imageBaseUrl}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-auto rounded"
      />
      <div className="absolute bottom-0 left-0 p-2">
        <h3 className="text-sm">{movie.title}</h3>
        <p className="text-xs text-gray-400">{`Rating: ${movie.vote_average}`}</p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <MovieCardPortal>
            <div
              style={calculatePosition() as React.CSSProperties}
              className="absolute z-50"
            >
              <MovieCardHovered movie={movie} />
            </div>
          </MovieCardPortal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieCard;
