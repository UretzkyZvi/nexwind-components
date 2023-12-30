import { MovieImages } from "../components/showcase/movie/type";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesByCategory = async (category: string) => {
    console.log('debug API_KEY: ', API_KEY)
    if (category === 'discover') {
        category = 'discover/movie';
    } else {
        category = `movie/${category}`;
    }

    const response = await fetch(`${BASE_URL}/${category}?api_key=${API_KEY}`);
    console.log(response);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return response.json();
};

export const fetchMovieById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie');
    }
    return response.json();
};

export const fetchMovieCredits = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie credits');
    }
    return response.json();
}

export const fetchMovieImages = async (id: number) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie images');
    }
    return response.json() as Promise<MovieImages>;
}

export const fetchMovieVideos = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie videos');
    }
    return response.json();
}

export const fetchMovieReviews = async (id: string) => {
    const response = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie reviews');
    }
    return response.json();
}
export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
export const backdropBaseUrl = 'https://image.tmdb.org/t/p/original';
export const youtubeBaseUrl = 'https://www.youtube.com/watch?v=';
export const youtubeThumbnailBaseUrl = 'https://img.youtube.com/vi/';
export const youtubeThumbnailQuality = '/hqdefault.jpg';
export const imdbBaseUrl = 'https://www.imdb.com/title/';
export const imdbTitleBaseUrl = 'https://www.imdb.com/title/';
export const imdbNameBaseUrl = 'https://www.imdb.com/name/';
export const imdbTitleSearchBaseUrl = 'https://www.imdb.com/find?q=';
export const imdbNameSearchBaseUrl = 'https://www.imdb.com/find?q=';
export const imdbTitleSearchUrlSuffix = '&ref_=nv_sr_sm';