import React, { use, useEffect, useState } from "react";
import homeCss from "./Home.module.css";
import film_dunyasi_banner from "../../assets/film_dunyasi_banner.jpg";
import { Button } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import LoopIcon from "@mui/icons-material/Loop";
import Category from "../../components/category/Category";
import { Alert } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import Card from "../../components/card/Card";
const Home = ({ queryData, setQueryData, queryTxt }) => {
  let favArr = [];
  let localFavArr = JSON.parse(localStorage.getItem("favs"));
  if (localFavArr) {
    favArr = localFavArr;
  }
  let watchLaterArr = [];
  const [watchLaterState, setWatchLaterState] = useState([]);

  let localWatchLater = JSON.parse(localStorage.getItem("watchLater"));
  if (localWatchLater) {
    watchLaterArr = localWatchLater;
  }
  useEffect(() => {
    setWatchLaterState(watchLaterArr);
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleWL, setIsVisibleWL] = useState(false);
  return (
    <>
      {queryData?.length > 0 ? (
        <>
          <div className={homeCss.queryContainer}>
            <div className={homeCss.queryHeader}>
              {" "}
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
                  setQueryData([]);
                }}
              >
                Aramayı sonlandır
              </Button>
            </div>

            <div className={homeCss.qeuryResults}>
              {queryData &&
                queryData.map((elem) => {
                  return (
                    <Card
                      key={uuidv4()}
                      card={elem}
                      favArr={favArr}
                      setIsVisible={setIsVisible}
                      setIsVisibleWL={setIsVisibleWL}
                      watchLaterState={watchLaterState}
                      setWatchLaterState={setWatchLaterState}
                    />
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className={homeCss.header}>
            <Alert
              icon={false}
              severity="error"
              className={`${homeCss.alert} ${
                isVisible ? homeCss.show_alert : homeCss.hide_alert
              }`}
            >
              Favorilere eklendi
            </Alert>
            <Alert
              icon={false}
              severity="success"
              className={`${homeCss.watch_later_alert} ${
                isVisibleWL ? homeCss.show_alert : homeCss.hide_alert
              }`}
            >
              Sonra Izleyin listesine eklendi
            </Alert>

            <img
              src={film_dunyasi_banner}
              alt=""
              className={homeCss.banner_img}
            />
            <p className={homeCss.banner_capture}>
              “Gladiator II” Cinematographer John Mathieson on Capturing Robotic
              Rhinos & Colossal Carnage
            </p>
            <div className={homeCss.banner_buttons}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                style={{
                  textTransform: "none",
                  backgroundColor: "white",
                  borderRadius: "9px",
                  fontWeight: "600",
                }}
              >
                Şimdi İzle
              </Button>
              <Button
                variant="outlined"
                endIcon={<WatchLaterIcon />}
                color="inherit"
                size="large"
                style={{
                  textTransform: "none",
                  backgroundColor: "red",
                  color: "white",
                  borderColor: "red",
                  borderRadius: "9px",
                  fontWeight: "600",
                }}
              >
                Sonra İzle
              </Button>
            </div>
          </div>
          <div className={homeCss.main_container}>
            <Category
              category="now_playing"
              favArr={favArr}
              setIsVisible={setIsVisible}
              setIsVisibleWL={setIsVisibleWL}
              watchLaterState={watchLaterState}
              setWatchLaterState={setWatchLaterState}
            />
            <Category
              category="popular"
              favArr={favArr}
              setIsVisible={setIsVisible}
              setIsVisibleWL={setIsVisibleWL}
              watchLaterState={watchLaterState}
              setWatchLaterState={setWatchLaterState}
            />
            <Category
              category="top_rated"
              favArr={favArr}
              setIsVisible={setIsVisible}
              setIsVisibleWL={setIsVisibleWL}
              watchLaterState={watchLaterState}
              setWatchLaterState={setWatchLaterState}
            />
            <Category
              category="upcoming"
              favArr={favArr}
              setIsVisible={setIsVisible}
              setIsVisibleWL={setIsVisibleWL}
              watchLaterState={watchLaterState}
              setWatchLaterState={setWatchLaterState}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
