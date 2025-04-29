import React from "react";
import css from "./WatchLaterCard.module.css";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
const WatchLaterCard = ({
  card,
  setWatchLaterState,
  watchLaterArr,
  setFavArrState,
  favArr,
  queryWatchLaterData,
  setQueryWatchLaterData,
}) => {
  return (
    <>
      <div className={css.container}>
        <img
          src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
          alt="poster"
        />
        <div className={css.buttons}>
          <button
            onClick={(e) => {
              if (queryWatchLaterData?.length > 0) {
                console.log(queryWatchLaterData);
                queryWatchLaterData = queryWatchLaterData.filter(
                  (elem) => elem.id != card.id
                );
                setQueryWatchLaterData(queryWatchLaterData);
              }
              watchLaterArr = watchLaterArr.filter(
                (elem) => elem.id != card.id
              );
              localStorage.setItem("watchLater", JSON.stringify(watchLaterArr));
              console.log();
              setWatchLaterState(watchLaterArr);
            }}
          >
            <RemoveCircleIcon color="error" />
          </button>
          <button
            onClick={() => {
              if (!favArr.find((elem) => elem.id == card.id)) {
                favArr.push(card);
              } else {
                favArr = favArr.filter((elem) => elem.id != card.id);
              }
              setFavArrState(favArr);
              localStorage.setItem("favs", JSON.stringify(favArr));
            }}
          >
            {favArr.find((elem) => elem.id == card.id) ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </button>
        </div>
        <Link to={`/film-detail/${card.id}`}>
          <div className={css.title_box}>
            <p className={css.title}>{card.title}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default WatchLaterCard;
