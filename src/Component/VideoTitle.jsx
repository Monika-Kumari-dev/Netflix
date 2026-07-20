import React from 'react'

const VideoTitle = ({ title, overview, isPlaying, onTogglePlay, onMoreInfo }) => {
  return (
    <div className="pt-36 px-12">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="py-6 text-lg">{overview}</p>
    <div>
      <button
        onClick={onTogglePlay}
        className="bg-linear-to-r from-red-500 to-indigo-600 text-white font-medium p-4 px-6 rounded-xl shadow-[0_6px_0_#1e3a8a] hover:brightness-110 active:translate-y-1.5 active:shadow-[0_2px_0_#1e3a8a] transition-all duration-150">
   {isPlaying ? '⏸ Pause' : '▶️ Play'}
</button>
      <button
        onClick={onMoreInfo}
        className=" mx-2 bg-linear-to-r from-red-500 to-indigo-600 text-white font-medium p-4 px-4 rounded-xl shadow-[0_6px_0_#1e3a8a] hover:brightness-110 active:translate-y-1.5 active:shadow-[0_2px_0_#1e3a8a] transition-all duration-150">More Info</button>
    </div>
    </div>
  )
}

export default VideoTitle