import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchMovie",
  initialState: {
    searchedMovie: [],
    movieName: "",
  },
  reducers: {
    setSearchMovieDetails: (state, action) => {
      state.searchedMovie = action.payload.movies;
      state.movieName = action.payload.searchMovie;
    },
    clearSearch: (state) => {
      state.searchedMovie = [];
      state.movieName = "";
    }
  }
});

export const { setSearchMovieDetails, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
