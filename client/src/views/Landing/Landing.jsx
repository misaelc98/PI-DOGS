import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";

//#00c1b5 Color celeste

function LandingPage() {
  return (
    <div className={style.containerPadre}>
      <div className={style.containerIzq}>
        <div className={style.containerIzqTop}>
          <h1 className={style.titulo}>The PawPedia</h1>
        </div>
        <div className={style.containerIzqBottom}>
          <NavLink to="/home">
            <button className={style.btn}>INGRESAR</button>
          </NavLink>
        </div>
      </div>

      <div className={style.containerDer}></div>
    </div>
  );
}

export default LandingPage;
