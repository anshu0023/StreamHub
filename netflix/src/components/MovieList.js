import React, { useRef } from 'react';
import MovieCard from './MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MovieList = ({ title, movies, searchMovie = false }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
  };

  return (
    <div className="px-8 relative">
      <h1 className={`${searchMovie ? 'text-black' : 'text-white'} text-3xl py-3`}>
        {title}
      </h1>

      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-90"
        onClick={scrollLeft}
      >
        <FaChevronLeft className="text-white" />
      </button>

      {/* Movie Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-4"
      >
        {movies?.map((movie, index) => (
          <div key={movie.id} className="relative">
            {/* Rank Number */}
            
            <MovieCard movieId={movie.id} posterPath={movie.poster_path} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-90"
        onClick={scrollRight}
      >
        <FaChevronRight className="text-white" />
      </button>
    </div>
  );
};

export default MovieList;
