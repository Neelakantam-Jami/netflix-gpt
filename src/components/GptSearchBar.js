import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import client from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';


const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async(movie) => {
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1", API_OPTIONS);
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const gptResults = await client.chat.completions.create({ 
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: gptQuery },
      ],
    });

    if (!gptResults.choices) {
      //error message
    }
    
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));  
    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
  };

  return (
      <div className="pt-[40%] md:pt-[10%] flex items-center justify-center">
          <form onSubmit={(e)=>e.preventDefault()} className="bg-black w-full md:w-1/2 grid grid-cols-12 rounded-lg">
            <input ref={searchText} className="p-4 m-2 md:m-4 col-span-9 rounded-lg" type="text" placeholder={lang[langKey].getSearchPlaceholder} />
            <button onClick={handleGptSearchClick} className="py-2 m-2 md:m-4 px-4 col-span-3 bg-red-500 text-white rounded-lg">{lang[langKey].search}</button>
          </form>
    </div>
  )
}

export default GptSearchBar;