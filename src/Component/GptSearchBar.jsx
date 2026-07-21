import React, { useState } from 'react';
import { GEMINI_API_KEY, RAPIDAPI_KEY, RAPIDAPI_HOST } from '../utils/constants';

const GptSearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      // Step 1: Gemini se movie names nikalo query samajh ke
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Act as a movie recommendation engine. Based on this request: "${query}", suggest exactly 5 real movie names. If the request mentions Bollywood or Hindi, suggest Hindi movies. If it mentions Hollywood or English, suggest English movies. Reply with ONLY the movie names separated by commas, no numbering, no extra text.`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const geminiData = await geminiRes.json();
      const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const movieNames = text.split(',').map((name) => name.trim()).filter(Boolean);

      // Step 2: har movie name ko MoviesDatabase pe search karo
      const options = {
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST,
        },
      };

      const searchResults = await Promise.all(
        movieNames.map((name) =>
          fetch(
            `https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodeURIComponent(
              name
            )}?exact=false&limit=1`,
            options
          )
            .then((res) => res.json())
            .then((data) => data?.results?.[0])
            .catch(() => null)
        )
      );

      onResults(searchResults.filter(Boolean));
    } catch (error) {
      console.error('GPT search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-4 bg-black/90">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. Bollywood action movies, Hollywood comedy..."
        className="w-1/2 p-3 rounded-l bg-white text-black"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-red-600 text-white px-6 rounded-r font-semibold"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default GptSearchBar;