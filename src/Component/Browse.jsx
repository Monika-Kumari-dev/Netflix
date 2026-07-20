import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryConatiner from "./SecondaryConatiner";

const Browse = () => {
  const { movies, isLoading } = useNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryConatiner/>
      <div className="pt-24 px-8">
        {isLoading ? (
          <p className="text-white">Loading movies...</p>
        ) : (
          movies.map((movie) => (
            <div key={movie._id} className="inline-block w-40 m-2">
              <img
                src={
                  movie.primaryImage?.url ||
                  "https://placehold.co/300x450?text=No+Image"
                }
                alt={movie.titleText?.text}
                className="w-full rounded" 
              />
              <p className="text-white text-sm mt-1">{movie.titleText?.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Browse;