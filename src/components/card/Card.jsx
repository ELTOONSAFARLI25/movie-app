import React, { useEffect, useState } from "react";
import cardCss from "./Card.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { Link } from "react-router-dom";
import axios from "axios";
import { red } from "@mui/material/colors";
const Card = ({
  card,
  favArr,
  setIsVisible,
  setIsVisibleWL,
  watchLaterState,
  setWatchLaterState,
  usersData,
}) => {
  const [isFav, setIsFav] = useState(false);
  const [updatedUser, setUpdatedUser] = useState([]);
  let test = false;
  if (favArr.find((elem) => elem.id == card.id)) {
    test = true;
  }
  useEffect(() => {
    setIsFav(test);
  }, [favArr]);
  const [isWatchLater, setIsWatchLater] = useState(false);

  let test2 = false;
  if (watchLaterState.find((elem) => elem.id == card.id)) {
    test2 = true;
  }
  useEffect(() => {
    if (watchLaterState.find((elem) => elem.id == card.id)) {
      setIsWatchLater(test2);
    }
  }, [watchLaterState]);
  let logedUser = JSON.parse(localStorage.getItem("logedUser"));
  const usersURL = "https://669f8faab132e2c136fe57d0.mockapi.io/users";
  let user;

  return (
    <>
      {" "}
      <div className={cardCss.container}>
        <img
          src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
          alt="poster"
        />
        <div className={cardCss.buttons}>
          <button
            onClick={() => {
              usersData.forEach((elem) => {
                if (elem.email == logedUser.email) {
                  user = elem;
                }
              });
              if (!user?.favs.find((elem) => elem.id == card.id)) {
                // favArr.push(card);
                user.favs.push(card);
                setIsFav(true);
                setIsVisible(true);
                setTimeout(() => {
                  setIsVisible(false);
                }, 3000);
              } else {
                user.favs = user.favs.filter((elem) => elem.id != card.id);
                // favArr = favArr.filter((elem) => elem.id != card.id);
                setIsFav(false);
              }
              console.log(user);
              axios.put(`${usersURL}/${user.id}`, user);
              // localStorage.setItem("favs", JSON.stringify(favArr));
            }}
          >
            {" "}
            ;
            {isFav ? (
              <FavoriteIcon color="error" />
            ) : (
              <FavoriteBorderIcon color="error" />
            )}
          </button>
          <button
            onClick={() => {
              if (!watchLaterState.find((elem) => elem.id == card.id)) {
                watchLaterState.push(card);
                setIsWatchLater(true);
                setIsVisibleWL(true);
                setTimeout(() => {
                  setIsVisibleWL(false);
                }, 3000);
              } else {
                watchLaterState = watchLaterState.filter(
                  (elem) => elem.id != card.id
                );
              }
              setWatchLaterState(watchLaterState);
              localStorage.setItem(
                "watchLater",
                JSON.stringify(watchLaterState)
              );
            }}
          >
            <WatchLaterIcon
              style={isWatchLater ? { color: "green" } : { color: "inherit" }}
            />
          </button>
        </div>
        <Link to={`/film-detail/${card.id}`}>
          <div className={cardCss.title_box}>
            <p className={cardCss.title}>{card.title}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
