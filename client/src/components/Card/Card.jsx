import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "../Card/Card.module.css";
import { FcRuler } from "react-icons/fc";
import { PiScalesLight } from "react-icons/pi";

const Card = ({ image, name, temperaments, weightMin, weightMax }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${style.cardContainer} ${isHovered ? style.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.imageContainer}>
        <img
          className={style.dogImage}
          src={`${image}`}
          alt={`imagen de: ${name}`}
        />
      </div>
      <div className={style.details}>
        <h2 className={style.name}>{name}</h2>
        <h2 className={style.temperament}>TEMPERAMENTS</h2>
        <div className={style.tempContainer}>
          {temperaments.map((temps) => (
            <h3>{temps}</h3>
          ))}
        </div>
        <p className={style.peso}>
          {" "} <PiScalesLight />
          {`  WEIGHT: ${weightMin}`} - {`${weightMax}`} KG
        </p>
      </div>
    </div>
  );
};

export default Card;
