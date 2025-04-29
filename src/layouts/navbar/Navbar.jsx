import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navCss from "../navbar/Navbar.module.css";
//---------------
import { Button } from "@mui/material";
//---------------
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { QueryStatsTwoTone } from "@mui/icons-material";

const Navbar = ({
  queryData,
  setQueryData,
  queryFavData,
  setQueryFavData,
  queryWatchLaterData,
  setQueryWatchLaterData,
  setQueryTxt,
  favArr,
  watchLaterArr,
  logedUser,
}) => {
  let location = useLocation();
  let navigate = useNavigate();
  const API_KEY = "6c4ff3c43361c47955ece05593b724ad";
  const [query, setQuery] = useState("");
  return (
    <>
      <nav>
        <div className={navCss.container}>
          <div className={navCss.left_navbar}>
            <div className={navCss.logo}>
              <h1 style={{ fontSize: "35px" }}>FilmDünyası</h1>
            </div>
            <ul>
              <li>
                <Link to="/">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/favourites">Favoriler</Link>
              </li>
              <li>
                <Link to="/watchlater">Sonra İzleyin</Link>
              </li>
            </ul>
          </div>
          <div className={navCss.right_navbar}>
            {" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (location.pathname == "/") {
                  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=tr-TR&query=${query}`;
                  axios(URL).then((res) => {
                    setQueryData(res.data.results);
                    setQueryTxt(query);

                    setQuery("");
                  });
                } else if (location.pathname == "/favourites") {
                  let queryResultArrFav = [];
                  favArr &&
                    favArr.forEach((elem) => {
                      if (
                        elem.original_title
                          .toLowerCase()
                          .includes(query.trim().toLowerCase()) ||
                        elem.title
                          .toLowerCase()
                          .includes(query.trim().toLowerCase())
                      ) {
                        queryResultArrFav.push(elem);
                      }
                    });
                  setQueryFavData(queryResultArrFav);
                  setQueryTxt(query);
                  setQuery("");
                } else if (location.pathname == "/watchlater") {
                  let qeuryResultArrWatchLater = [];
                  watchLaterArr &&
                    watchLaterArr.forEach((elem) => {
                      if (
                        elem.original_title
                          .toLowerCase()
                          .includes(query.trim().toLowerCase()) ||
                        elem.title
                          .toLowerCase()
                          .includes(query.trim().toLowerCase())
                      ) {
                        qeuryResultArrWatchLater.push(elem);
                      }
                    });
                  setQueryWatchLaterData(qeuryResultArrWatchLater);
                  setQueryTxt(query);
                  setQuery("");
                }
              }}
            >
              <div className={navCss.search_bar}>
                {" "}
                <input
                  type="text"
                  placeholder="Ara..."
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                />
                <button className={navCss.search_icon}>
                  {" "}
                  <SearchIcon style={{ cursor: "pointer" }} />
                </button>
              </div>
            </form>
            <ul>
              <li>
                {logedUser ? (
                  <div className={navCss.account_link}>
                    <Link to="/account">
                      <AccountCircleIcon
                        style={{
                          fontSize: "35px",
                        }}
                      />
                      <KeyboardArrowDownIcon />
                    </Link>
                    <div className={navCss.account_logOut}>
                      <p
                        onClick={(e) => {
                          console.log("logout");
                          localStorage.setItem(
                            "logedUser",
                            JSON.stringify(null)
                          );
                          navigate("/");
                          window.location.reload();
                        }}
                      >
                        Çıkış yap
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link to="/login">
                    <Button
                      color="error"
                      endIcon={<LoginIcon />}
                      className={navCss.button}
                      style={{ textTransform: "none", fontSize: "17px" }}
                    >
                      Giriş
                    </Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
