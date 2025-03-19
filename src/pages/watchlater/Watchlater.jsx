import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import watchLaterCss from "./WatchLater.module.css";
import WatchLaterCard from "../../components/watchLaterCard/watchLaterCard";
const Watchlater = () => {
  const [watchLaterState, setWatchLaterState] = useState([]);

  let favArr = [];
  if (JSON.parse(localStorage.getItem("favs"))) {
    favArr = JSON.parse(localStorage.getItem("favs"));
  }
  const [favArrState, setFavArrState] = useState([]);
  useEffect(() => {
    const watchLaterArr = JSON.parse(localStorage.getItem("watchLater"));
    setWatchLaterState(watchLaterArr);
    setFavArrState(favArr);
  }, []);
  let navigate = useNavigate();
  return (
    <>
      {watchLaterState.length > 0 ? (
        <>
          {" "}
          <h1 className={watchLaterCss.header_title}>Sonra İzlenecekler</h1>
          <div className={watchLaterCss.container}>
            {watchLaterState &&
              watchLaterState.map((elem) => {
                return (
                  <WatchLaterCard
                    card={elem}
                    key={uuidv4()}
                    watchLaterArr={watchLaterState}
                    setWatchLaterState={setWatchLaterState}
                    favArr={favArr}
                    setFavArrState={setFavArrState}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <div className={watchLaterCss.emptyContainer}>
          <h1>Sonra izlenecekler listesinde hiç film yok</h1>
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

export default Watchlater;
