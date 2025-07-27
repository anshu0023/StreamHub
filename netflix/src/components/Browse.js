import React, { useEffect } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';
import Footer from './Footer'; // ✅ Import footer

const Browse = () => {
    const user = useSelector(store => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const navigate = useNavigate();

    // Fetch movie data using custom hooks
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
                {
                    toggle ? <SearchMovie /> : (
                        <>
                            <MainContainer />
                            <MovieContainer />
                        </>
                    )
                }
            </div>
            <Footer /> {/* ✅ Footer added at bottom */}
        </div>
    );
};

export default Browse;
