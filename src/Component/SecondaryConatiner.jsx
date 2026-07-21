import React from 'react'
import { useSelector } from 'react-redux'

const SecondaryConatiner = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  return (
    <div className="bg-black min-h-screen">
    <div className="relative z-20  px-8 py-6">
      <h2 className="text-white text-2xl font-semibold mb-4">Trending Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies
          .filter((movie) => movie.primaryImage?.url)
.map((movie) => (
          <div
            key={movie._id}
            className="group relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer transition-transform duration-300 ease-out hover:scale-110 hover:z-10 hover:shadow-2xl hover:shadow-black"
          >
            <img
              src={
                movie.primaryImage?.url ||
                "https://placehold.co/300x450?text=No+Image"
              }
              alt={movie.titleText?.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xs font-medium truncate">
                {movie.titleText?.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default SecondaryConatiner