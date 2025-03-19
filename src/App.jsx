import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import React from "react";
import Navbar from "./layouts/navbar/Navbar";
import Favourites from "./pages/favs/Favs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import WatchLater from "./pages/watchlater/Watchlater";
import DetailPage from "./pages/detailPage/DetailPage";
import { useState } from "react";
function App() {
  const [queryData, setQueryData] = useState();
  const [queryTxt, setQueryTxt] = useState("");
  return (
    <>
      <Navbar setQueryData={setQueryData} setQueryTxt={setQueryTxt} />
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
        <Route path="/account" element={<Account />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/watchlater" element={<WatchLater />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/film-detail/:id" element={<DetailPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
