import React, { useState } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {
     const movies = useSelector(store => store.movies?.nowPlayingMovies);
     const [isPlaying, setIsPlaying] = useState(true);
     const [showModal, setShowModal] = useState(false);

     if(movies === null) return;
     const mainMovie = movies[0];
     const title = mainMovie?.titleText?.text;

  return (
    <div className="relative w-full h-screen">
      <VideoBackground movie={mainMovie} isPlaying={isPlaying} />
      <div className="absolute top-0 left-0 z-10 text-white">
        <VideoTitle
          title={title}
          overview=""
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(prev => !prev)}
          onMoreInfo={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-neutral-900 text-white p-8 rounded-lg max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p>{mainMovie?.plot || "No description available."}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MainContainer