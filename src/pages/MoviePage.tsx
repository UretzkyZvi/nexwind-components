import React, { useEffect, useRef, useState } from "react";
import {
  backdropBaseUrl,
  fetchMoviesByCategory,
  imageBaseUrl,
} from "../server/tmdbService";
import CategoryRow from "../components/showcase/movie/CategoryRow";
import { Movie } from "../components/showcase/movie/type";
import clsx from "clsx";
import { Play } from "lucide-react";

const MoviePage: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState<Movie>();

  const [opacity, setOpacity] = useState(0);
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

  const roundToNearest5 = (num: number) => Math.round(num / 0.05) * 0.05;
  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = window.screenY || document.documentElement.scrollTop;
      const maxDepth = 100; // Opacity change within the first 100 pixels of scrolling
      const newOpacity = Math.max(scrollDepth / maxDepth, 0); // Calculate opacity
      setOpacity(roundToNearest5(newOpacity));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black text-white relative w-full h-screen ">
      <header
        className={`sticky z-50 top-0 h-16 w-screen flex transition-all duration-300 ease-in-out bg-black bg-opacity-${Math.round(
          opacity * 100
        )}`}
      >
        <div className="px-4"></div>
      </header>
      {currentMovie && (
        <>
          <img
            src={`${backdropBaseUrl}${currentMovie.backdrop_path}`}
            alt={currentMovie.original_title}
            className="absolute top-0 w-full  h-full object-center object-cover lg:w-full lg:h-full"
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
      <main
        className={clsx(
          "absolute -bottom-full w-full min-h-screen   flex flex-col p-4  backdrop-blur-sm backdrop-brightness-50"
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
      </main>
    </div>
  );
};

export default MoviePage;
