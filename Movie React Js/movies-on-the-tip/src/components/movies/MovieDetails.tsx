import React, { useEffect, useState } from "react";
import IMovie from "../../models/IMovie";
import { LoadingStatus } from "../../GlobalConstants";
import { useParams } from "react-router-dom";
import { getMovieByTitle } from "../../services/movie";
import { Modal, Container, Row, Col, Badge } from "react-bootstrap";
import LoadingIndicator from "../common/LoadingIndicator";
import "./MovieDetails.css";
import AlertHelper from "../common/AlertHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faStar as faRegStar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCalendarDay,
  faMasksTheater,
  faScroll,
  faStar,
  faStarHalfStroke,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import MovieContext from "../context/MovieContext";

const MovieDetails = () => {
  const movieContext = React.useContext(MovieContext);

  let el = <></>;
  const [status, setStatus] = useState<LoadingStatus>("Loading");
  const [movie, setMovie] = useState<IMovie>();
  const [openImage, setOpenImage] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isImgError, setIsImageError] = useState(false);

  const onImageError = (fallbackUrl: string) => {
    if (!isImgError) {
      setImgUrl(fallbackUrl);
      setIsImageError(true);
    }
  };

  const initializeMovie = () => {
    return {
      id: "",
      title: "",
      year: "",
      genres: [],
      ratings: [],
      poster: "",
      contentRating: "",
      duration: "",
      releaseDate: "",
      averageRating: 0,
      originalTitle: "",
      storyline: "",
      actors: [],
      imdbRating: 0,
      posterurl: "",
    };
  };

  let { movieTitle } = useParams();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (movieTitle) {
          const data = await getMovieByTitle(movieContext, movieTitle);

          console.log(data);
          setMovie(data);
          setOpenImage(false);
          setStatus("Loaded");
        } else {
          setMovie(initializeMovie());
          setStatus("Error");
          setOpenImage(false);
        }
      } catch (error) {
        setMovie(initializeMovie());
        setStatus("Error");
        setOpenImage(false);
        // setError(error);
      }
    };
    fetchMovieDetails();
  }, []);

  const {
    id,
    title,
    year,
    genres,
    ratings,
    poster,
    contentRating,
    duration,
    releaseDate,
    averageRating,
    originalTitle,
    storyline,
    actors,
    imdbRating,
    posterurl,
  } = movie || initializeMovie();

  // const getAverageRating = () => {
  //   const avgRating = ratings.reduce(
  //     (totalRating, rating) => totalRating + rating,
  //     0
  //   );
  //   return (avgRating / ratings.length).toFixed(0);
  // };

  switch (status) {
    case "Loading":
      el = (
        <LoadingIndicator
          size="large"
          message="Please wait while we are loading movie details..."
        />
      );
      break;
    case "Loaded":
      el = (
        <>
          <Container
            id="movie-details-container"
            style={{ border: "1px solid black" }}
            className="card p-3 mt-4"
          >
            <Row className="mt-2">
              <Col xs={12} lg={4}>
                <img
                  src={imgUrl}
                  onError={() => {
                    onImageError(
                      `${process.env.REACT_APP_APPLICATION_URL}/${poster}`
                    );
                  }}
                  alt={`${title} movie poster`}
                  className="movie-details-poster my-3 cursor-pointer"
                  style={{ border: "2px solid teal" }}
                  data-toggle="modal"
                  data-target="#imageModal"
                  onClick={() => setOpenImage(true)}
                />
              </Col>
              <Col xs={12} lg={8} className="my-2">
                <header>
                  <h1>{`${title} (${year})`}</h1>
                </header>
                <hr />

                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="me-2"
                      style={{ color: "gold" }}
                    ></FontAwesomeIcon>
                    IMDB Rating
                  </Col>
                  <Col xs={6}>{imdbRating || 0}</Col>
                </Row>
                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faRegStar}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Content Rating
                  </Col>
                  <Col xs={6}>{contentRating || "--"}</Col>
                </Row>

                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faStarHalfStroke}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Average Rating
                  </Col>
                  <Col xs={6}>{averageRating || 0}</Col>
                </Row>
                <Row xs={12} className="mt-2  mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Duration
                  </Col>
                  <Col xs={6}>{duration || "--"}</Col>
                </Row>

                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faMasksTheater}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Generes
                  </Col>
                  <Col xs={6}>
                    {genres.map((genre, index) => (
                      <Badge
                        pill
                        bg="success"
                        text="white"
                        key={index}
                        className="me-2"
                      >
                        {genre}
                      </Badge>
                    ))}
                    {/* {genres.join(", ")} */}
                  </Col>
                </Row>
                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Actors
                  </Col>
                  <Col xs={6} className="">
                    {actors.map((actor, index) => (
                      <Badge bg="info" key={index} className="me-2">
                        {actor}
                      </Badge>
                    ))}
                    {/* {actors.join(", ")} */}
                  </Col>
                </Row>
                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Release Date
                  </Col>
                  <Col xs={6}>{releaseDate}</Col>
                </Row>

                <Row xs={12} className="mt-2 mb-2">
                  <Col xs={4} className="font-bold text-left">
                    <FontAwesomeIcon
                      icon={faScroll}
                      className="me-2"
                    ></FontAwesomeIcon>
                    Story line
                  </Col>
                  <Col xs={8} className="text-wrap">
                    {storyline}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Modal
            show={openImage}
            fullscreen={true}
            onHide={() => setOpenImage(false)}
            className="text-center image-modal"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img
                src={imgUrl}
                onError={() => {
                  onImageError(
                    `${process.env.REACT_APP_APPLICATION_URL}/${poster}`
                  );
                }}
                alt={title}
                style={{ height: "80vh" }}
              ></img>
            </Modal.Body>
          </Modal>
        </>
      );
      break;
    case "Error":
      el = (
        <AlertHelper
          message="Failed to get movie details"
          variant="danger"
        ></AlertHelper>
      );
      break;
  }

  return el;
};

export default MovieDetails;
