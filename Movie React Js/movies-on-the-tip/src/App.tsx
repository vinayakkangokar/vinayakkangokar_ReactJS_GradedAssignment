import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./components/Base";
import MovieDetails from "./components/movies/MovieDetails";
import MovieContext from "./components/context/MovieContext";

function App() {
  const [movieContext, setMovieContext] = useState("movies-in-theaters");

  const updateAppContext = (context: string) => {
    setMovieContext(context);
  };

  return (
    <MovieContext.Provider value={movieContext}>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={
              <Base
                showNav={true}
                showBackToHome={false}
                contextHandler={(value: string) => {
                  updateAppContext(value);
                }}
              >
                <></>
              </Base>
            }
          ></Route>
          <Route
            path={"/:movieTitle"}
            element={
              <Base
                showNav={false}
                showBackToHome={true}
                contextHandler={(value: string) => {
                  updateAppContext(value);
                }}
              >
                <MovieDetails />
              </Base>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  );
}

export default App;
