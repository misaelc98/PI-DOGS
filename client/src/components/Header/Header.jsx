import style from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className={style.mainContainer}>
    <div className={style.leftContainer}>
      <NavLink to="/home" className={style.logo}>
        <h1>The PawPedia</h1>
      </NavLink>
    </div>
    <div className={style.rightContainer}>
      <NavLink to="/dog">
        <button className={style.btn}>ADD BREED</button>
      </NavLink>
    </div>
  </div>
  );
}


