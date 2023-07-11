import style from "./Slider.module.css";
import React, { useState } from "react";

const Slider = ({ images }) => {
  const [actualImg, setActualImg] = useState(0);
  const quantity = images?.length;


  const nextImg = () => {
    setActualImg(actualImg === quantity - 1 ? 0 : actualImg + 1);
  };

  const prevImg = () => {
    setActualImg(actualImg === 0 ? quantity - 1 : actualImg - 1);
  };

  return (
    <div className={style.container}>
      <button className={style.prevBtn} onClick={prevImg}>←</button>
      {images.map((images, index) => {
        return (
          <div
            className={
              actualImg === index
                ? `${style.slide} ${style.active}`
                : style.slide
            }
          >
            {actualImg === index && (
              <img className={style.images} key={index} src={images} alt="imagen" />
            )}
          </div>
        )
      })}
      <button className={style.nextBtn} onClick={nextImg}>→</button>
    </div>
  );
};

export default Slider;
