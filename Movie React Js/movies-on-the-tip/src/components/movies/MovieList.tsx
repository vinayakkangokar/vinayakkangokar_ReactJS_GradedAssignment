import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import IMovie from "../../models/IMovie";
import { getMovies } from "../../services/movie";
import Movie from "./Movie";
import { LoadingStatus } from "../../GlobalConstants";
import AlertHelper from "../common/AlertHelper";
import LoadingIndicator from "../common/LoadingIndicator";
import MovieContext from "../context/MovieContext";

type Props = {
  showRemove: boolean;
  searchValue: string;
};

const MovieList = ({ showRemove, searchValue }: Props) => {
  const movieContext = React.useContext(MovieContext);

  const [status, setStatus] = useState<LoadingStatus>("Loading");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);

  const cleanUp = () => {
    setMovies([]);
    setError(null);
    setStatus("Loading");
    setIsRemoved(false);
  };

  const fetchMovies = async () => {
    try {
      let data = await getMovies(movieContext);
      if (searchValue.trim().length > 0) {
        data = data.filter((x) =>
          x.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        );
      }
      setMovies(data);
      setStatus("Loaded");
      setError(null);
    } catch (error: any) {
      setMovies([]);
      setStatus("Error");
      setError(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    return cleanUp();
  }, []);

  useEffect(() => {
    fetchMovies();
    return cleanUp();
  }, [isRemoved]);

  useEffect(() => {
    fetchMovies();
    return cleanUp();
  }, [searchValue]);

  let el = <></>;

  switch (status) {
    case "Loading":
      el = (
        <LoadingIndicator
          size="large"
          message="Please wait while we are fetching movies..."
        />
      );
      break;
    case "Loaded":
      el =
        movies.length > 0 ? (
          <Row xs={1} md={4} lg={6}>
            {movies.map((movie, index) => {
              return (
                <Col className="d-flex align-items-stretch my-3" key={index}>
                  <Movie
                    movie={movie}
                    showRemove={showRemove}
                    changeHandler={() => setIsRemoved(true)}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <AlertHelper variant="info" message="No movies found"></AlertHelper>
        );
      break;
    case "Error":
      el = (
        <AlertHelper variant="danger" message="Failed to get movie details" />
      );
      break;
  }

  return el;
};

export default MovieList;
