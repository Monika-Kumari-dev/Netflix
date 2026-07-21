import React, { useEffect, useState, useRef } from 'react';
import { YOUTUBE_API_KEY } from "../utils/constants";

const trailerCache = {};

const VideoBackground = ({ movie, isPlaying }) => {
  const iframeRef = useRef(null);

  const [trailerId, setTrailerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const title = movie?.titleText?.text;
    const movieId = movie?.id;
    if (!title || !movieId) return;

    if (trailerCache[movieId] !== undefined) {
      setTrailerId(trailerCache[movieId]);
      setLoading(false);
      return;
    }

    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            title + " official trailer"
          )}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
        );
        const data = await res.json();
        console.log('API Response:', data);

        const id = data?.items?.[0]?.id?.videoId || null;
        trailerCache[movieId] = id;
        setTrailerId(id);
      } catch (error) {
        console.error('Trailer fetch failed:', error);
        setTrailerId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movie]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const command = isPlaying ? 'playVideo' : 'pauseVideo';
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: command, args: '' }),
      '*'
    );
  }, [isPlaying]);

  if (loading) {
    return <div className="w-full h-screen bg-black animate-pulse" />;
  }

  if (!trailerId) {
    return (
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})` }}
      />
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}&modestbranding=1&showinfo=0&rel=0&enablejsapi=1`}
        title={movie?.titleText?.text || 'Movie Trailer'}
        allow="autoplay; encrypted-media"
        frameBorder="0"
        className="absolute top-1/2 left-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default VideoBackground;