import React, { useEffect, useState } from "react";
import favCss from "./Favs.module.css";
import FavCard from "../../components/favCard/FavCard";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LoopIcon from "@mui/icons-material/Loop";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import axios from "axios";
const Favourites = ({ queryFavData, setQueryFavData, queryTxt }) => {
  const [favArrState, setFavArrState] = useState([]);
  let navigate = useNavigate();
  let watchLaterArr = [];
  const [watchLaterState, setWatchLaterState] = useState([]);
  if (JSON.parse(localStorage.getItem("watchLater"))) {
    watchLaterArr = JSON.parse(localStorage.getItem("watchLater"));
  }
  useEffect(() => {
    setFavArrState(favArr);
    setWatchLaterState(watchLaterArr);
  }, []);
  const usersURL = "https://669f8faab132e2c136fe57d0.mockapi.io/users";

  let user;
  let logedUser = JSON.parse(localStorage.getItem("logedUser"));
  let favArr;
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    axios(usersURL).then((res) => {
      setUsersData(res.data);
    });
  }, []);
  usersData.forEach((elem) => {
    if (elem.email == logedUser.email) {
      user = elem;
    }
  });
  favArr = user?.favs;
  useEffect(() => {
    setFavArrState(favArr);
  }, []);

  console.log(favArrState);
  return (
    <>
      {queryFavData && queryFavData?.length > 0 ? (
        <>
          <div className={favCss.queryContainer}>
            <div className={favCss.queryHeader}>
              <h2 style={{ textTransform: "capitalize" }}>
                "<i style={{ fontWeight: "400" }}> {queryTxt}</i> " aramasının
                sonuçları
              </h2>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LoopIcon style={{ fontSize: "30px" }} />}
                style={{
                  textTransform: "none",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
                onClick={(e) => {
                  setQueryFavData([]);
                }}
              >
                Aramayı sonlandır
              </Button>
            </div>
            <div className={favCss.qeuryResults}>
              {queryFavData.map((elem) => {
                return (
                  <FavCard
                    card={elem}
                    key={uuidv4()}
                    favArr={favArrState}
                    queryFavData={queryFavData}
                    setQueryFavData={setQueryFavData}
                    setFavArrState={setFavArrState}
                    watchLaterArr={watchLaterArr}
                    setWatchLaterState={setWatchLaterState}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {favArrState?.length > 0 ? (
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
                        watchLaterArr={watchLaterArr}
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
                  <RemoveRedEyeIcon
                    style={{ fontSize: "30px", color: "white" }}
                  />
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
      )}
    </>
  );
};

export default Favourites;
