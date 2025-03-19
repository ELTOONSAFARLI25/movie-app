import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import navCss from "../navbar/Navbar.module.css";
//---------------
import { Button } from "@mui/material";
//---------------
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import axios from "axios";
import { QueryStatsTwoTone } from "@mui/icons-material";

const Navbar = ({ setQueryData, setQueryTxt }) => {
  let location = useLocation();
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
            <div className={navCss.search_bar}>
              <input
                type="text"
                placeholder="Ara..."
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
              />
              <button
                className={navCss.search_icon}
                onClick={() => {
                  if (location.pathname == "/") {
                    console.log("home");
                    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=tr-TR&query=${query}`;
                    axios(URL).then((res) => {
                      setQueryData(res.data.results);
                      setQueryTxt(query);

                      setQuery("");
                    });
                  } else if (location.pathname == "/favourites") {
                    console.log("favs");
                  } else if (location.pathname == "/watchlater") {
                    console.log("watchLater");
                  }
                }}
              >
                {" "}
                <SearchIcon style={{ cursor: "pointer" }} />
              </button>
            </div>

            <ul>
              <li>
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
