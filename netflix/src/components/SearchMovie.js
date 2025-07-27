import React, { useState, useEffect } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import { clearSearch } from '../redux/searchSlice'; // ✅ Correct
import MovieList from './MovieList';
import { FaSearch } from 'react-icons/fa';

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

    // ✅ Clear stale search result on mount
    useEffect(() => {
        dispatch(clearSearch());
    }, [dispatch]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!searchMovie.trim()) return;

        dispatch(setLoading(true));
        try {
            const res = await axios.get(
                `${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`,
                options
            );
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    };

    return (
        <>
            <div className='flex justify-center pt-[10%] w-full'>
                <form onSubmit={submitHandler} className='w-[50%]'>
                    <div className='flex items-center shadow-md border-2 p-2 border-gray-200 rounded-lg w-full bg-white'>
                        <input
                            value={searchMovie}
                            onChange={(e) => setSearchMovie(e.target.value)}
                            className='w-full outline-none rounded-md text-lg text-black'
                            type="text"
                            placeholder='Search Movies...'
                        />
                        <button
                            type='submit'
                            className='bg-red-800 text-white rounded-md px-4 py-2 flex items-center justify-center'
                        >
                            {isLoading ? "Loading..." : <FaSearch />}
                        </button>
                    </div>
                </form>
            </div>

            {searchedMovie?.length > 0 ? (
                <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
            ) : (
                movieName && <h1 className='text-center text-gray-400 mt-10'>Movie Not Found!!</h1>
            )}
        </>
    );
};

export default SearchMovie;
