import React, { useEffect, useState } from "react";
import Header from "./Header";
import { RAPIDAPI_KEY, RAPIDAPI_HOST } from "../utils/constants";

const Browse = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
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
    setMovies(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-24 px-8">
        {movies.map((movie) => (
          <div key={movie.id} className="inline-block w-40 m-2">
            <img
              src={
                movie.primaryImage?.url ||
                "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.titleText?.text}
              className="w-full rounded"
            />
            <p className="text-white text-sm mt-1">{movie.titleText?.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;