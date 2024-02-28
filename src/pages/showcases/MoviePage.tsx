import React, { useEffect, useRef, useState } from "react";
import {
  backdropBaseUrl,
  fetchMovieVideos,
  fetchMoviesByCategory,
  imageBaseUrl,
  youtubeBaseUrl,
} from "../../server/tmdbService";
import CategoryRow from "../../components/showcase/movie/CategoryRow";
import { Movie } from "../../components/showcase/movie/type";
import clsx from "clsx";
import { Play, Video } from "lucide-react";
import Modal from "../../components/modals/modal";
import VideoPlayer from "../../components/video-player/video-player";
import { Link } from "react-router-dom";
import HeaderLogo from "../../components/headers/header-logo";

type MovieVideo = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
};

const MoviePage: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState<Movie>();
  const [openModal, setOpenModal] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
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

  const handleSelectedMovie = async (movie: Movie) => {
    setCurrentMovie(movie);
    setOpenModal(true);
    const videos = await fetchMovieVideos(movie.id);
    console.log(videos);
    setMovieVideos(videos.results);
  };

  return (
    <div className="bg-black text-white relative h-screen ">
      <header
        className={`sticky z-50 top-0 h-16  flex items-center justify-between transition-all duration-300 ease-in-out bg-black bg-opacity-${Math.round(
          opacity * 100
        )}`}
      >
        <div className="flex items-center">
          <div className="px-4 inline-flex items-center text-red-500 font-bold text-lg">
            Next Movie
          </div>
          <div className="hidden sm:block">
            <ul className="flex gap-4 p-4">
              {categories.map((category, index) => (
                <li key={index} className="hover:text-zinc-400">
                  <a href={`#${category.title}`}>{category.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="px-8">
          <Link to="/" className="px-4">
           <HeaderLogo backgroundColor="white"/>
          </Link>
        </div>
      </header>
      {currentMovie && (
        <>
          <img
            src={`${backdropBaseUrl}${currentMovie.backdrop_path}`}
            alt={currentMovie.original_title}
            className="absolute top-0 w-full  h-full object-center object-cover lg:w-full lg:h-full"
          />
          <div className="absolute top-60 sm:left-10 p-4 bg-black rounded-lg shadow backdrop-blur-sm backdrop-opacity-10 bg-opacity-20 ">
            <div className="flex flex-1 gap-4 justify-center items-start  ">
              <div className="relative">
                <img
                  src={`${imageBaseUrl}${currentMovie.poster_path}`}
                  alt={currentMovie.original_title}
                  className="sm:w-56 sm:h-96 object-center object-cover rounded "
                />
              </div>

              <div className="sm:w-96">
                <h1 className="text-4xl text-white font-bold mb-4">
                  {currentMovie.title}
                </h1>
                <button onClick={(e)=>{
                  e.preventDefault();
                  handleSelectedMovie(currentMovie);
                }} className="px-6 py-3  bg-white flex space-x-2 text-black font-bold rounded group  hover:bg-gray-300  active:bg-gray-300/30  transition">
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
            onMovieSelect={(m) => {
              handleSelectedMovie(m);
            }}
          />
        ))}
      </main>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="bg-black "
      >
        <div className="flex flex-col gap-4">
          {movieVideos && (
            <VideoPlayer
              src={
                movieVideos.find((x) => x.official)?.site.toLowerCase() ===
                "youtube"
                  ? youtubeBaseUrl + movieVideos.find((x) => x.official)?.key
                  : ""
              }
            />
          )}
          <div className="text-lg font-bold leading-6">Movie Details</div>
          <div className="text-sm  ">{currentMovie?.overview}</div>
        </div>
      </Modal>
    </div>
  );
};

export default MoviePage;
