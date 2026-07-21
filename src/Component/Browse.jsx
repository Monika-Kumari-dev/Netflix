import React, { useState } from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryConatiner from "./SecondaryConatiner";
import GptSearchBar from "./GptSearchBar";

const Browse = () => {
  useNowPlayingMovies();
  const [showGptSearch, setShowGptSearch] = useState(false);
  const [gptResults, setGptResults] = useState([]);

  return (
    <div className="bg-black min-h-screen">
      <Header />

      

      {showGptSearch ? (
        <div className="pt-24">
          <GptSearchBar onResults={setGptResults} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-8 py-6">
            {gptResults.map((movie) => (
              <div key={movie._id} className="aspect-[2/3] rounded-md overflow-hidden">
                <img
                  src={movie.primaryImage?.url || "https://placehold.co/300x450?text=No+Image"}
                  alt={movie.titleText?.text}
                  className="w-full h-full object-cover"
                />
                <p className="text-white text-xs mt-1 truncate">{movie.titleText?.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <MainContainer />
          <SecondaryConatiner />
        </>
      )}
    </div>
  );
};

export default Browse;