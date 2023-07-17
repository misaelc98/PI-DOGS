import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDogDetails } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./Detail.module.css";

export default function DogDetails({
  image,
  name,
  temperaments,
  weightMin,
  weightMax,
  heightMin,
  heightMax,
  life_span
  
}) {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
  dispatch(showDogDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);

  let temperamentDog = [];

  if (details.temperaments) {
    temperamentDog = [...details.temperaments];
  }

  if (details.temperaments?.name) {
    temperamentDog = details.temperaments?.map((temp) => temp.name);
  }

  return (
    <div className={`${style.main_container}`}>
            <NavLink to="/home">
                <button className={`${style.button_home}`}>Home</button>
            </NavLink>
      <div className={`${style.sub_container}`}>
        <div className={`${style.container_elements}`}>
          <div className={`${style.image_container}`}>
            <img src={details?.image} alt={`imagen de ${details?.name}`} />
          </div>

          <div className={`${style.right_container}`}>
            <h1>{details?.name}</h1>
            <h3>{`Height: ${`${details?.heightMin} - ${details?.heightMax}`            }  CM`}</h3>
            <h3>{`Weight: ${`${details?.weightMin} - ${details?.weightMax}`
            } KG`}</h3>
            <h3>{`Lifespan: ${details?.life_span}`}</h3>
            <div>
              <h3>Temperaments</h3>
              <ul className={`${style.list_container}`}>
                {temperamentDog.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}