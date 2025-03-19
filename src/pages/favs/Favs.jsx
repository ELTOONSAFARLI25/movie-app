import React, { useEffect, useState } from "react";
import favCss from "./Favs.module.css";
import FavCard from "../../components/favCard/FavCard";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Favourites = () => {
  const [favArrState, setFavArrState] = useState([]);
  let navigate = useNavigate();
  let wathcLaterArr = [];
  const [watchLaterState, setWatchLaterState] = useState([]);
  if (JSON.parse(localStorage.getItem("watchLater"))) {
    wathcLaterArr = JSON.parse(localStorage.getItem("watchLater"));
  }
  useEffect(() => {
    const favArr = JSON.parse(localStorage.getItem("favs"));
    setFavArrState(favArr);
    setWatchLaterState(wathcLaterArr);
  }, []);

  return (
    <>
      {favArrState.length > 0 ? (
        <>
          <h1 className={favCss.header_title}>Favoriler</h1>
          <div className={favCss.container}>
            {favArrState &&
              favArrState.map((elem) => {
                return (
                  <FavCard
                    card={elem}
                    key={uuidv4()}
                    favArr={favArrState}
                    setFavArrState={setFavArrState}
                    wathcLaterArr={wathcLaterArr}
                    setWatchLaterState={setWatchLaterState}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <div className={favCss.emptyContainer}>
          <h1>Favorilerinizde hiç film yok</h1>
          <br />
          <Button
            variant="outlined"
            color="inherit"
            style={{
              textTransform: "none",
              fontSize: "30px",
              backgroundColor: "#6A665B",
              border: "none",
              color: "white",
              fontFamily: "Raleway",
            }}
            endIcon={
              <RemoveRedEyeIcon style={{ fontSize: "30px", color: "white" }} />
            }
            onClick={(e) => {
              navigate("/");
            }}
          >
            Filmlere göz at
          </Button>
        </div>
      )}
    </>
  );
};

export default Favourites;
