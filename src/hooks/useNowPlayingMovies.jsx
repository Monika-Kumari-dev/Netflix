import { useDispatch } from "react-redux";
import { RAPIDAPI_KEY, RAPIDAPI_HOST } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useState, useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://moviesdatabase.p.rapidapi.com/titles?startYear=2020&titleType=movie",
        {
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
          },
        }
      );
      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
      setMovies(data.results || []);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return { movies, isLoading };
};

export default useNowPlayingMovies;