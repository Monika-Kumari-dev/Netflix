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
      const options = {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
      };

      // 3 pages ek saath fetch karo (page 1, 2, 3)
      const [page1, page2, page3] = await Promise.all([
        fetch(
          "https://moviesdatabase.p.rapidapi.com/titles?startYear=2020&titleType=movie&limit=50&page=1",
          options
        ).then((res) => res.json()),
        fetch(
          "https://moviesdatabase.p.rapidapi.com/titles?startYear=2020&titleType=movie&limit=50&page=2",
          options
        ).then((res) => res.json()),
        fetch(
          "https://moviesdatabase.p.rapidapi.com/titles?startYear=2020&titleType=movie&limit=50&page=3",
          options
        ).then((res) => res.json()),
      ]);

      const combined = [
        ...(page1.results || []),
        ...(page2.results || []),
        ...(page3.results || []),
      ];

      dispatch(addNowPlayingMovies(combined));
      setMovies(combined);
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