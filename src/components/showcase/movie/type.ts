import exp from "constants";

export type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview?: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average?: number;
    vote_count?: number;
};

export type MovieImages= {
    id: number;
    backdrops: MovieImage[];
    posters: MovieImage[];
    logos: MovieImage[];
};
export type MovieImage= {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
};