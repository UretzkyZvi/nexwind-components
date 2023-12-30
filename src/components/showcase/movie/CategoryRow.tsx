import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "./type";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CategoryRowProps = {
  title: string;
  movies: Movie[]; // Define Movie type as needed
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
  const handleSelectedMovie = (movie: Movie) => {
    onMovieSelect(movie);
  };
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, [movies]);

  const scrollAmount = 200; // Adjust as needed

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const checkScroll = () => checkScrollPosition();
  
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
    }
  
    checkScrollPosition(); // Initial check
  
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
    };
  }, [movies]); 

  return (
    <div className="relative">
      <h2 className="text-sm sm:text-md md:text-lg font-bold mb-4">{title}</h2>
  
      <div
        className="flex overflow-x-hidden space-x-4 p-4"
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            onMovieSelect={(m) => handleSelectedMovie(m)}
          />
        ))}
      </div>
  
      {!isAtStart && (
        <div
          className="absolute top-0 left-0 w-16 h-full bg-black z-50 backdrop-blur-lg bg-opacity-5 group"
          onClick={scrollLeft}
        >
          <ChevronLeft className="w-16 h-full text-white group-hover:cursor-pointer group-active:text-black/40" />
        </div>
      )}
  
      {!isAtEnd && (
        <div
          className="absolute top-0 right-0 w-16 h-full bg-black z-50 backdrop-blur-2xl bg-opacity-10 group"
          onClick={scrollRight}
        >
          <ChevronRight className="w-16 h-full text-white group-hover:cursor-pointer group-active:text-black/40" />
        </div>
      )}
    </div>
  );
  
};

export default CategoryRow;
