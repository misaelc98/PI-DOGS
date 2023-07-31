import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, showDogDetails } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css";
import Loading from "../../components/Loading/Loading";
import { FcRuler } from "react-icons/fc";
import { PiScalesLight } from "react-icons/pi";
import {FcLike} from "react-icons/fc";

export default function DogDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(showDogDetails(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);

  let temperamentDog = [];

  if (details.temperaments) {
    temperamentDog = [...details.temperaments];
  }

  if (details.temperaments?.name) {
    temperamentDog = details.temperaments?.map((temp) => temp.name);
  }

  const loading = useSelector((state) => state.loading);

  return (
    <div className={style.mainContainer}>
      {loading && <Loading />}
      <NavLink to="/home" className={style.navlink}>
        <div className={style.arrow}>
          <span>← </span>
        </div>
      </NavLink>

      <div className={style.boxImage}>
        <img
          className={style.image}
          src={details?.image}
          alt={`imagen de ${details?.name}`}
        />
      </div>
      <div className={style.boxDetails}>
        <div>
          <h1 className={style.name}>{details?.name}</h1>
        </div>
        <div>
          <h3
            className={style.props}
          > 
          <FcRuler /> {`Height: ${`${details?.heightMin} - ${details?.heightMax}`}  CM`}</h3>
        </div>
        <div>
          <h3
            className={style.props}
          > <PiScalesLight/> {`Weight: ${`${details?.weightMin} - ${details?.weightMax}`} KG`}</h3>
        </div>
        <div>
          <h3 className={style.props}> <FcLike/> {`Lifespan: ${details?.life_span}`}</h3>
        </div>
        <div className={style.temperamento}>
          <h3>Temperaments</h3>
        </div>
        <div className={style.tempsContainer}>
          {temperamentDog.map((t) => (
            <h3 key={t}> {t}</h3>
          ))}
        </div>
      </div>
    </div>

    //       <div className={style.rightDetail}>
    //         <h1 className={style.name}>{details?.name}</h1>
    //         <div className={style.caracContainer}>
    //           <h3>{`Height: ${`${details?.heightMin} - ${details?.heightMax}`}  CM`}</h3>
    //           <h3>{`Weight: ${`${details?.weightMin} - ${details?.weightMax}`} KG`}</h3>
    //           <h3>{`Lifespan: ${details?.life_span}`}</h3>
    //         </div>
    //         <div className={style.tempContainer}>
    //           <h3>Temperaments</h3>

    //           {temperamentDog.map((t) => (
    //             <h3 key={t}> {t}</h3>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
  );
}

// <NavLink to="/home">
// <button className={`${style.button_home}`}>Home</button>
// </NavLink>
