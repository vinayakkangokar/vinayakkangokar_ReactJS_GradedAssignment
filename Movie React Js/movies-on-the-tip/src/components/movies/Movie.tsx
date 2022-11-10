import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "./Movie.css";
import IMovie from "../../models/IMovie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  addFavouriteMovie,
  removeFavouriteMovie,
  getMovies,
} from "../../services/movie";
import ToastHelper from "../common/ToastHelper";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
  movie: IMovie;
  showRemove: boolean;
  changeHandler: Function;
};

const Movie = ({ movie, showRemove, changeHandler }: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [isImgError, setIsImageError] = useState(false);

  const toastCloseHandler = () => {
    setShowToast(false);
    setToastMsg("");
    setIsError(false);
  };

  const prepareAddToMovieObj = () => {
    return {
      title: movie.title,
      year: movie.year,
      genres: movie.genres,
      ratings: movie.ratings,
      poster: movie.poster,
      contentRating: movie.contentRating,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      averageRating: movie.averageRating,
      originalTitle: movie.originalTitle,
      storyline: movie.storyline,
      actors: movie.actors,
      imdbRating: movie.imdbRating,
      posterurl: movie.posterurl,
    };
  };

  const addToFavourite = async () => {
    try {
      const favMovies = await getMovies("favourit");
      const filteredMovies = favMovies.filter(
        (x) => x.title.toLowerCase() === movie.title.toLocaleLowerCase()
      );
      if (filteredMovies.length == 0) {
        let movieToAdd: Omit<IMovie, "id"> = prepareAddToMovieObj();
        const result = await addFavouriteMovie(movieToAdd);
        setShowToast(true);
        setToastMsg(`${movie.title} added to favourites`);
        setIsError(false);
      } else {
        setShowToast(true);
        setToastMsg(`${movie.title} already added to favourites`);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const errMsg = error.response?.data
          .toLowerCase()
          .includes("Error: Insert failed, duplicate id".toLowerCase())
          ? `${movie.title} already added to favourites`
          : "Failed to add movie to favourites";

        setShowToast(true);
        setToastMsg(errMsg);
        setIsError(true);
      } else {
        setShowToast(true);
        setToastMsg("Failed to add movie to favourites");
        setIsError(true);
      }
    }
  };

  const removeFromFavourite = async () => {
    try {
      if (movie.id) {
        const result = await removeFavouriteMovie(movie.id?.toString());

        setTimeout(changeHandler, 500);
        setToastMsg(`${movie.title} Removed from favourites`);
        setIsError(false);
        setShowToast(true);
      } else {
        setTimeout(changeHandler, 500);
        setToastMsg(`Unable to remove ${movie.title} from favourites`);
        setIsError(false);
        setShowToast(true);
      }
    } catch (error) {
      setToastMsg(`Something went wrong...`);
      setIsError(true);
      setShowToast(true);
    }
  };

  const onError = (fallbackUrl: string) => {
    if (!isImgError) {
      setImgUrl(fallbackUrl);
      setIsImageError(true);
    }
  };

  let navigate = useNavigate();

  const getCardText = () => {
    return showRemove ? (
      <Card.Text
        className="text-center fav-styles cursor-pointer"
        onClick={removeFromFavourite}
      >
        Remove from Favourites
        <FontAwesomeIcon
          icon={faRectangleXmark}
          className="ms-2"
        ></FontAwesomeIcon>
      </Card.Text>
    ) : (
      <Card.Text
        className="text-center fav-styles cursor-pointer"
        onClick={addToFavourite}
      >
        Add to Favourites
        <FontAwesomeIcon
          icon={faHeart}
          className="ms-2 favourites-color"
        ></FontAwesomeIcon>
      </Card.Text>
    );
  };

  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Img
          alt={`${movie.title} movie poster`}
          variant="top"
          src={imgUrl}
          onError={() => {
            onError(`${process.env.REACT_APP_APPLICATION_URL}/${movie.poster}`);
          }}
          onClick={() => navigate(`/${movie.title}`)}
          className="movie-poster cursor-pointer"
        />

        <Card.Body>
          <Card.Title className="text-truncate">{movie.title}</Card.Title>
          <hr />
          {getCardText()}
        </Card.Body>
      </Card>

      {showToast && (
        <ToastHelper
          heading={isError ? "Oops!" : "Success"}
          message={toastMsg}
          variant={isError ? "danger" : "success"}
          onCloseHandler={toastCloseHandler}
        />
      )}
    </>
  );
};

export default Movie;
