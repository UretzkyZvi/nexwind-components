import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  backdropBaseUrl,
  fetchMovieImages,
  fetchMoviesByCategory,
  imageBaseUrl,
} from "../server/tmdbService";
import CategoryRow from "../components/showcase/movie/CategoryRow";
import { Movie } from "../components/showcase/movie/type";
import clsx from "clsx";
import { Play } from "lucide-react";

const MoviePage: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState<Movie>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState([
    { title: "Popular", query: "popular", movies: [] },
    { title: "Top Rated", query: "top_rated", movies: [] },
    { title: "Now Playing", query: "now_playing", movies: [] },
    { title: "Upcoming", query: "upcoming", movies: [] },
    { title: "Discover", query: "discover", movies: [] },
    // Add other categories as needed
  ]);

  useEffect(() => {
    categories.forEach(async (category, index) => {
      try {
        const data = await fetchMoviesByCategory(category.query.toLowerCase());
        setCurrentMovie(data.results[0]);
        setCategories((prev) => {
          const newCategories = [...prev];
          newCategories[index].movies = data.results;
          return newCategories;
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    });
  }, []);

  useEffect(() => {
    const originalBodyClassList = document.body.classList.value;
    document.body.classList.remove("bg-background", "dark:bg-dark-background");
    document.body.classList.add("bg-black");
    return () => {
      document.body.className = originalBodyClassList;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white relative w-full h-screen "
    >
      {currentMovie && (
        <>
          <img
            src={`${backdropBaseUrl}${currentMovie.backdrop_path}`}
            alt={currentMovie.original_title}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
          />
          <div className="absolute top-60 left-10 p-4 bg-black rounded-lg shadow backdrop-blur-sm backdrop-opacity-10 bg-opacity-20 ">
            <div className="flex flex-1 gap-4 justify-center items-start  ">
              <div className="relative">
                <img
                  src={`${imageBaseUrl}${currentMovie.poster_path}`}
                  alt={currentMovie.original_title}
                  className="w-56 h-96 object-center object-cover rounded "
                />
              </div>

              <div className="w-96">
                <h1 className="text-4xl text-white font-bold mb-4">
                  {currentMovie.title}
                </h1>
                <button className="px-6 py-3  bg-white flex space-x-2 text-black font-bold rounded group  hover:bg-gray-300  active:bg-gray-300/30  transition">
                  <span>
                    <Play className="w-6 h-6 fill-black group-active:text-black/60 group-active:fill-black/60" />
                  </span>
                  <span className="group-active:text-black/60">Play</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={clsx(
          "sticky -bottom-3/4 w-full min-h-screen   flex flex-col p-4  backdrop-blur-sm backdrop-brightness-50"
        )}
      >
        {categories.map((category, index) => (
          <CategoryRow
            key={index}
            title={category.title}
            movies={category.movies}
            onMovieSelect={(m) => setCurrentMovie(m)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
