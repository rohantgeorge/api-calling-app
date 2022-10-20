import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
// import API from "./API.json";

const FEATURED_API = "https://naruto-api.herokuapp.com/api/v1/characters";

const SEARCH_API = "https://api.jikan.moe/v4/anime/22/characters&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchterm] = useState("");

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    fetch(SEARCH_API + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.name);
      });
  };

  const handleOnChange = (e) => {
    setSearchterm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit} id="form">
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="search"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div id="main">
        {movies?.map((movie) => (
          <>
            {/* {console.log(movie)} */}
            <Movie key={movie.id} data={movie} />
          </>
        ))}
      </div>
    </>
  );
}

export default App;
