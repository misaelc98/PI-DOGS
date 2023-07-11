import style from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {

    return (
        <div className={style.mainContainer}>

                <NavLink to="/home" className={style.logo}>

                    <h1 >The PawPedia</h1>
                    
                </NavLink> 
        </div>
    )
}