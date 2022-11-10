import React, { useState, useEffect } from "react";
import { Container, Tab, Form, Nav, InputGroup } from "react-bootstrap";
import MovieList from "../movies/MovieList";
import { MOVIE_API } from "../../GlobalConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type Props = {
  contextHandler: Function;
};

const Navigation = ({ contextHandler }: Props) => {
  const [key, setKey] = useState<MOVIE_API>("movies-in-theaters");
  const [searchValue, setSearchValue] = useState("");

  const onSelectedTabChange = (eventKey: any) => {
    setKey(eventKey);
    contextHandler(eventKey);
  };

  const searchMovie = (evnt: any) => {
    const searchVal = evnt.target.value;
    setSearchValue(searchVal);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <Container fluid>
      <Tab.Container
        defaultActiveKey="movies-in-theaters"
        onSelect={onSelectedTabChange}
      >
        <Nav variant="tabs" className="">
          <Nav.Item>
            <Nav.Link eventKey="movies-in-theaters" className="navigation-tab">
              Movies in Theaters
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="movies-coming" className="navigation-tab">
              Coming Soon
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="top-rated-movies" className="navigation-tab">
              Top Rated Movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="top-rated-india" className="navigation-tab">
              Top Rated Indian Movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="favourit" className="navigation-tab">
              Favourites
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Form
              className="d-flex"
              style={{ position: "absolute", right: "1%", width: "20vw" }}
            >
              <InputGroup className="mb-3">
                <Form.Control
                  type="search"
                  id="search-box"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchValue}
                  onChange={searchMovie}
                />
                <InputGroup.Text
                  id="search-icon"
                  className="bg-primary text-white"
                >
                  <FontAwesomeIcon className="" icon={faMagnifyingGlass} />
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </Nav.Item>
        </Nav>

        <Tab.Content className="">
          {
            <>
              <Tab.Pane eventKey="movies-in-theaters">
                {key === "movies-in-theaters" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="movies-coming">
                {key.toString() === "movies-coming" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="top-rated-movies">
                {key.toString() === "top-rated-movies" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="top-rated-india">
                {key.toString() === "top-rated-india" && (
                  <MovieList showRemove={false} searchValue={searchValue} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="favourit">
                {key.toString() === "favourit" && (
                  <MovieList showRemove={true} searchValue={searchValue} />
                )}
              </Tab.Pane>
            </>
          }
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Navigation;
