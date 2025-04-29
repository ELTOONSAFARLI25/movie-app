import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import React, { useEffect } from "react";
import Navbar from "./layouts/navbar/Navbar";
import Favourites from "./pages/favs/Favs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import WatchLater from "./pages/watchlater/Watchlater";
import DetailPage from "./pages/detailPage/DetailPage";
import NoPage from "./pages/noPage/NoPage";
import { useState } from "react";
import axios from "axios";
function App() {
  const [queryData, setQueryData] = useState();
  const [queryFavData, setQueryFavData] = useState();
  const [queryWatchLaterData, setQueryWatchLaterData] = useState();
  const [queryTxt, setQueryTxt] = useState("");

  let favArr = JSON.parse(localStorage.getItem("favs"));
  let watchLaterArr = JSON.parse(localStorage.getItem("watchLater"));
  let location = useLocation();
  let logedUser = JSON.parse(localStorage.getItem("logedUser"));

  let showNavbar = true;
  if (location.pathname == "/login" || location.pathname == "/register") {
    showNavbar = false;
  }

  return (
    <>
      {showNavbar && showNavbar ? (
        <>
          {" "}
          <Navbar
            setQueryData={setQueryData}
            queryData={queryData}
            queryFavData={queryFavData}
            setQueryFavData={setQueryFavData}
            queryWatchLaterData={queryWatchLaterData}
            setQueryWatchLaterData={setQueryWatchLaterData}
            setQueryTxt={setQueryTxt}
            favArr={favArr}
            watchLaterArr={watchLaterArr}
            logedUser={logedUser}
          />
        </>
      ) : null}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              queryData={queryData}
              setQueryData={setQueryData}
              queryTxt={queryTxt}
            />
          }
        ></Route>
        <Route
          path="/account"
          element={<Account logedUser={logedUser} />}
        ></Route>
        <Route
          path="/favourites"
          element={
            <Favourites
              favArr={favArr}
              queryFavData={queryFavData}
              setQueryFavData={setQueryFavData}
              queryTxt={queryTxt}
            />
          }
        ></Route>
        <Route
          path="/watchlater"
          element={
            <WatchLater
              favArr={favArr}
              queryWatchLaterData={queryWatchLaterData}
              setQueryWatchLaterData={setQueryWatchLaterData}
              queryTxt={queryTxt}
            />
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/film-detail/:id" element={<DetailPage />}></Route>
        <Route path="*" element={<NoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
