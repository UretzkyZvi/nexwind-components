import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "./type"; // Import the Movie type accordingly
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryRowProps = {
  title: string;
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
};

const CategoryRow: React.FC<CategoryRowProps> = ({
  title,
  movies,
  onMovieSelect,
}) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const handleSelectedMovie = (movie: Movie) => {
    onMovieSelect(movie);
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, [movies]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndXRef.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current - touchEndXRef.current > 75) {
      // Swiped left
      scrollRight();
    } else if (touchStartXRef.current - touchEndXRef.current < -75) {
      // Swiped right
      scrollLeft();
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkScroll = () => checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
    }
    checkScrollPosition(); // Initial check

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
      }
    };
  }, [movies]);

  return (
    <div className="relative" id={title}>
      <h2 className="text-sm sm:text-md md:text-lg font-bold mb-4">{title}</h2>
      <div
        className="flex overflow-x-scroll snap-x snap-mandatory touch-pan-x space-x-4 p-4"
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onMovieSelect={handleSelectedMovie} />
        ))}
      </div>
      {!isAtStart && (
        <div className="absolute top-0 left-0 w-8 sm:w-16 h-full bg-black z-50 backdrop-blur-lg bg-opacity-5 group" onClick={scrollLeft}>
          <ChevronLeft className="w-8 sm:w-16 h-full text-white group-hover:cursor-pointer group-active:text-black/40" />
        </div>
      )}
      {!isAtEnd && (
        <div className="absolute top-0 right-0 w-8 sm:w-16 h-full bg-black z-50 backdrop-blur-2xl bg-opacity-10 group" onClick={scrollRight}>
          <ChevronRight className="w-8 sm:w-16 h-full text-white group-hover:cursor-pointer group-active:text-black/40" />
        </div>
      )}
    </div>
  );
};

export default CategoryRow;
