import React from "react";

const Movie = (data) => (
  <div className="movie">
    {console.log(data)}
    <img src={data.data.images[0]} alt={data.data.name} />
    <div className="movie-info">
      <h3>{data.data.name}</h3>
    </div>
    <div className="overview">
      <h3>Overview:</h3>
      <p>{data.data.about}</p>
    </div>
  </div>
);

export default Movie;
