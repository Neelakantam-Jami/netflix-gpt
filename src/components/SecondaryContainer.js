import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);
  return (
    movies.nowPlayingMovies && movies.popularMovies && movies.topRatedMovies &&
    <div className="bg-black">
      <div className="mt-0 md:-mt-64 md:pl-12 relative"> 
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer;