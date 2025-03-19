import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import detailCss from "./DetailPage.module.css";
import { v4 as uuidv4 } from "uuid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Button } from "@mui/material";

const DetailPage = () => {
  let { id } = useParams();

  const API_KEY = "6c4ff3c43361c47955ece05593b724ad";
  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=tr-TR`;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    axios(API_URL).then((res) => {
      setMovie(res.data);
    });
  }, []);

  const date = new Date(movie.release_date);
  const formatted_date = date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  let favArr = [];
  if (JSON.parse(localStorage.getItem("favs"))) {
    favArr = JSON.parse(localStorage.getItem("favs"));
  }
  const [favState, setFavState] = useState([]);

  let wathcLaterArr = [];
  const [watchLaterState, setWatchLaterState] = useState([]);
  if (JSON.parse(localStorage.getItem("watchLater"))) {
    wathcLaterArr = JSON.parse(localStorage.getItem("watchLater"));
  }
  useEffect(() => {
    setFavState(favArr);
    setWatchLaterState(wathcLaterArr);
  }, []);
  return (
    <>
      <div className={detailCss.contianer}>
        <div className={detailCss.poster_img}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
        </div>
        <div className={detailCss.details}>
          <h1 className={detailCss.title}>
            {movie.original_title}
            <i style={{ fontWeight: "300" }}>({movie.title})</i>
          </h1>
          <i>
            <h2 style={{ fontWeight: "300" }}>{movie.tagline}</h2>
          </i>
          <div className={detailCss.genres}>
            <h2>Tür:</h2>
            {movie.genres &&
              movie.genres.map((genre) => {
                return (
                  <>
                    <h3 key={uuidv4()} style={{ fontWeight: "400" }}>
                      {genre.name}
                    </h3>
                    <p>/</p>
                  </>
                );
              })}
          </div>
          <div className={detailCss.overview}>
            {movie.overview ? (
              <p>{movie.overview}</p>
            ) : (
              <>
                <p>Genel bakış yok...</p>
              </>
            )}{" "}
          </div>

          <div className={detailCss.extra_details}>
            <h2>
              {movie.vote_average?.toFixed(2)}/10 ({movie.vote_count} oy
              kullanildi)
            </h2>
            <h2>
              Yayınlanma tarihi: <i> {formatted_date}</i>
            </h2>
          </div>
          <div className={detailCss.buttons}>
            <Button
              variant="outlined"
              color="error"
              endIcon={
                favArr.find((elem) => elem.id == movie.id) ? (
                  <HeartBrokenIcon style={{ fontSize: "25px" }} />
                ) : (
                  <FavoriteIcon style={{ fontSize: "25px" }} />
                )
              }
              style={{
                padding: "15px 30px",
                fontSize: "15px",
                fontWeight: "700",
                border: "2px solid red",
                textTransform: "none",
                backgroundColor: favArr.find((elem) => elem.id == movie.id)
                  ? "red"
                  : "inherit",
                color: favArr.find((elem) => elem.id == movie.id)
                  ? "white"
                  : "red",
              }}
              onClick={(e) => {
                if (!favArr.find((elem) => elem.id == movie.id)) {
                  favArr.push(movie);
                } else {
                  favArr = favArr.filter((elem) => elem.id != movie.id);
                }
                setFavState(favArr);
                localStorage.setItem("favs", JSON.stringify(favState));
              }}
            >
              {favArr.find((elem) => elem.id == movie.id)
                ? "FAVORILERDEN SİL"
                : "FAVORİLERE EKLE"}
            </Button>
            <Button
              variant="outlined"
              color="success"
              endIcon={
                wathcLaterArr.find((elem) => elem.id == movie.id) ? (
                  <DoneAllIcon style={{ fontSize: "25px" }} />
                ) : (
                  <WatchLaterIcon style={{ fontSize: "25px" }} />
                )
              }
              style={{
                padding: "15px 30px",
                fontSize: "15px",
                fontWeight: "700",
                border: "2px solid green",
                textTransform: "none",
                backgroundColor: wathcLaterArr.find(
                  (elem) => elem.id == movie.id
                )
                  ? "green"
                  : "inherit",
                color: wathcLaterArr.find((elem) => elem.id == movie.id)
                  ? "white"
                  : "green",
              }}
              onClick={(e) => {
                if (!wathcLaterArr.find((elem) => elem.id == movie.id)) {
                  wathcLaterArr.push(movie);
                } else {
                  wathcLaterArr = wathcLaterArr.filter(
                    (elem) => elem.id != movie.id
                  );
                }
                setWatchLaterState(wathcLaterArr);
                localStorage.setItem(
                  "watchLater",
                  JSON.stringify(watchLaterState)
                );
              }}
            >
              SONRA İZLEYİN
            </Button>
          </div>
        </div>
        <div className={detailCss.backdrop_img}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
