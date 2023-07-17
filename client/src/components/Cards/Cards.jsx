import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import style from "./Cards.module.css";

export default function Cards({ currentDogs }) {
  return (
    <div className={style.cardList}>
      {currentDogs?.map((el) => {
        return (
          <NavLink to={"/dogs/" + el.id}>
            <div key={el.id}>
              <Card
                key={el?.id}
                image={el?.image}
                name={el?.name}
                weightMin={el?.weightMin}
                weightMax={el?.weightMax}
                temperaments={
                  el?.temperaments.name
                    ? el.temperaments.map((el) => el.name)
                    : el.temperaments
                }
              />
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
