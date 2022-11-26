import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiPlay, BiInfoCircle, BiChevronRight } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";

const Movie = ({ movie }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 1, scale: 0 }}
      exit={{ opacity: 1, scale: 0 }}
      transition={{ duration: 0.5 }}
      layout
      className="movie"
    >
      <img
        src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
        alt={movie.title}
      />
      <div className="movie-info">
        <div className="rating">
          <BsFillStarFill className="yellow" />
          <span>{movie.vote_average}</span>
        </div>
        <div className="title">
          <h3>{movie.title}</h3>
        </div>
        <div className="movie-footer">
          <a href="#" className="trailer-btn">
            <BiPlay />
            <span>Trailer</span>
          </a>
          <button type="button" onClick={handleShow} className="movie-modal">
            <BiInfoCircle />
          </button>
          <Modal id="movieModal" show={show} onHide={handleClose}>
            <Modal.Body closebutton>
              <div className="movie-modal-header">
                <div className="img-container">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original/" + movie.poster_path
                    }
                    alt={movie.title}
                    className="img-fluid"
                  />
                </div>
                <div className="info-container text-white">
                  <h2>
                    {movie.title} <BiChevronRight />
                  </h2>
                  <div className="rating">
                    <BsFillStarFill className="yellow" />
                    <span>{movie.vote_average}</span>
                  </div>
                  <p>{movie.overview}</p>
                  <a href="#" className="trailer-btn">
                    <BiPlay />
                    <span>Trailer</span>
                  </a>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

export default Movie;
