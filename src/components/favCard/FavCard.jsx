import React, { useState } from "react";
import favCardCss from "./FavCard.module.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link } from "react-router-dom";
const FavCard = ({
  card,
  favArr,
  setFavArrState,
  watchLaterArr,
  setWatchLaterState,
  queryFavData,
  setQueryFavData,
}) => {
  return (
    <>
      <div className={favCardCss.container}>
        <img
          src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
          alt="poster"
        />
        <div className={favCardCss.buttons}>
          <button
            onClick={(e) => {
              if (queryFavData?.length > 0) {
                queryFavData = queryFavData.filter(
                  (elem) => elem.id != card.id
                );
                setQueryFavData(queryFavData);
              }
              favArr = favArr.filter((elem) => elem.id != card.id);
              localStorage.setItem("favs", JSON.stringify(favArr));
              setFavArrState(favArr);
            }}
          >
            <RemoveCircleIcon color="error" />
          </button>
          <button
            onClick={() => {
              if (!watchLaterArr.find((elem) => elem.id == card.id)) {
                watchLaterArr.push(card);
              } else {
                watchLaterArr = watchLaterArr.filter(
                  (elem) => elem.id != card.id
                );
              }
              setWatchLaterState(watchLaterArr);
              localStorage.setItem("watchLater", JSON.stringify(watchLaterArr));
            }}
          >
            <WatchLaterIcon
              style={
                watchLaterArr.find((elem) => elem.id == card.id)
                  ? { color: "green" }
                  : { color: "inherit" }
              }
            />
          </button>
        </div>
        <Link to={`/film-detail/${card.id}`}>
          <div className={favCardCss.title_box}>
            <p className={favCardCss.title}>{card.title}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FavCard;
