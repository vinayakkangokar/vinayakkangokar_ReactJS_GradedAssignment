export type MOVIE_TYPE =
  | "IN_THEATERS"
  | "COMING_SOON"
  | "TOP_RATED_INDIAN"
  | "TOP_RATED_MOVIES"
  | "FAVOURITES";

// export const MOVIE_API = {
//   IN_THEATERS: "movies-in-theaters",
//   COMING_SOON: "movies-coming",
//   TOP_RATED_INDIAN: "top-rated-india",
//   TOP_RATED_MOVIES: "top-rated-movies",
//   FAVOURITES: "favourit",
// };

export type MOVIE_API =
  | "movies-in-theaters"
  | "movies-coming"
  | "top-rated-india"
  | "top-rated-movies"
  | "favourit";

export type LoadingStatus = "Loading" | "Loaded" | "Error";
