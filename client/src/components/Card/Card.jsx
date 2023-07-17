import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "../Card/Card.module.css";

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
        <h2 className={style.temperament}>Temperaments</h2>
        <div className={style.tempContainer}>
          {temperaments.map((temps) => (
            <h3>{temps}</h3>
          ))}
        </div>
        <p>
          {`${weightMin}`} - {`${weightMax}`}
        </p>
      </div>
    </div>
  );
};

export default Card;

// import React from "react";
// import style from "../Card/Card.module.css";
// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// export default function Card({
//   image,
//   name,
//   temperaments,
//   weightMin,
//   weightMax,
// }) {


//   return (
//     <div className={style.cardContainer} >
      
//       <div className={style.imageContainer}>
//         <img
//           className={style.dogImage}
//           src={`${image}`}
//           alt={`imagen de: ${name}`}
//         />
//       </div>
//       <h2 className={style.name}>{name}</h2>
//       <h2 className={style.temperamnt}>Temperaments</h2>
//       <div className={style.tempContainer}>
      
//         {temperaments.map((temps) => (
//           <h3>{temps}</h3>
//         ))}
//       </div>
//       <p>
//         {`${weightMin}`} - {`${weightMax}`}
//       </p>
      
//     </div>
//   );
// }

// key={temps + Math.random}

// const [hovered, setHovered] = useState(false);
// onMouseEnter={() => setHovered(true)}
// onMouseLeave={() => setHovered(false)}
