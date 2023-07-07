import style from "../Home/Home.module.css";
import { NavLink } from "react-router-dom";
//#00c1b5 Color celeste 


function home() {

  return (
    <div className={style.mainContainer}>
        <div className={style.topContainer}>
            <div className={style.topLeftContainer}>
                <NavLink className={style.logo}>
                    <h1 >The PawPedia</h1>
                </NavLink>
            </div>
        </div>
    </div>
  );
}

export default home;