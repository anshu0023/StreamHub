import React from 'react'
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';

const MovieCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();

  if (posterPath === null) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  };

  return (
    <div
      className="w-[140px] sm:w-[150px] md:w-[160px] lg:w-[170px] aspect-[2/3] pr-2 transform transition-transform duration-300 hover:scale-100 cursor-pointer"
      onClick={handleOpen}
    >
      <img
        src={`${TMDB_IMG_URL}/${posterPath}`}
        alt="movie-banner"
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  );
};

export default MovieCard;
