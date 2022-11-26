import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import Filter from "./components/Filter";
import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion, AnimatePresence } from "framer-motion";

// const FEATURED_API = "https://naruto-api.herokuapp.com/api/v1/characters";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [searchKey, setSearchKey] = useState("");

  // let movieIDs = [];
  // let moviesFullInfoArray = [];

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=50663d733568df292cc22a4b4c473ec0"
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  };

  // filtered?.map((movie) => {
  //   movieIDs.push(movie.id);
  // });

  // for (let i = 0; i < movieIDs.length; i++) {
  //   const fetchMovieFull = async () => {
  //     const data = await fetch(
  //       `https://api.themoviedb.org/3/movie/${movieIDs[i]}?api_key=50663d733568df292cc22a4b4c473ec0&append_to_response=videos`
  //     );
  //     const moviesFullInfo = await data.json();
  //     moviesFullInfoArray.push(moviesFullInfo);
  //     console.log(moviesFullInfoArray);
  //   };
  //   fetchMovieFull();
  // }

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=50663d733568df292cc22a4b4c473ec0&query=${searchKey}`;
      const res = await fetch(url);
      const data = await res.json();
      setPopular(data.results);
      setFiltered(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Movie Buff</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="searchKey"
                value={searchKey}
                onChange={changeHandler}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div id="main">
        {filtered.length > 0 ? (
          <Container>
            <Row>
              <Col>
                <div className="filter-buttons">
                  <Filter
                    popular={popular}
                    setFiltered={setFiltered}
                    activeGenre={activeGenre}
                    setActiveGenre={setActiveGenre}
                  />
                </div>
                <motion.div layout className="popular-movies">
                  <AnimatePresence>
                    {filtered?.map((movie) => {
                      return <Movie key={movie.id} movie={movie} />;
                    })}
                  </AnimatePresence>
                </motion.div>
              </Col>
            </Row>
          </Container>
        ) : (
          <h1>No Movies Found</h1>
        )}
      </div>
    </>
  );
}

export default App;
