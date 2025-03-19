import React, { useEffect, useState } from "react";
import categoryCss from "./Category.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../card/Card";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

const Category = ({
  category,
  favArr,
  setIsVisible,
  setIsVisibleWL,
  watchLaterState,
  setWatchLaterState,
}) => {
  const [apiData, setApiData] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzRmZjNjNDMzNjFjNDc5NTVlY2UwNTU5M2I3MjRhZCIsIm5iZiI6MTc0MTcyODI1OS45NjQsInN1YiI6IjY3ZDBhYTAzNDJjMGNjYzNjYTFlMDA4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f-wUaGyxtHbrGmoZXCSJDOdcH8Ab4mB_MIADduVy6Ig",
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playin"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);
  let category_text;
  if (category == "now_playing") category_text = "Şu anda oynatılıyor";
  else if (category == "popular") category_text = "Popüler";
  else if (category == "top_rated") category_text = "En yüksek puanlı";
  else if (category == "upcoming") category_text = "Yakında";
  return (
    <>
      <div className={categoryCss.category}>
        <h1>{category_text}</h1>
        <div className={categoryCss.swiper}>
          <Swiper spaceBetween={20} slidesPerView={4}>
            {apiData &&
              apiData.map((elem) => {
                return (
                  <SwiperSlide key={uuidv4()}>
                    <Card
                      card={elem}
                      favArr={favArr}
                      setIsVisible={setIsVisible}
                      setIsVisibleWL={setIsVisibleWL}
                      watchLaterState={watchLaterState}
                      setWatchLaterState={setWatchLaterState}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Category;
