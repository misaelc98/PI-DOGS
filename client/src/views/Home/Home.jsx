import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
} from "../../redux/actions";
import Paginate from "../../components/Pager/Pager";
import SearchBar from "../../components/SearchBar/SearchBar";
import Slider from "../../components/Galery/Slider";

import style from "../Home/Home.module.css";
import Cards from "../../components/Cards/Cards";

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //valores del estado global de redux que requiero
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex); //elementos a renderizar en la pagina, segun el valor de paginado

  // console.log(currentDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // eslint-disable-next-line
  const [orden, setOrden] = useState("");

  useEffect(() => {
    //acciones a depachar luego de montar el componente
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperament = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };


  const handleSearch = (e) => {
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={style.mainContainer}>
        <div className={style.filterContainer}>
          <div className={style.searchContainer}>
            <SearchBar handleSearch={handleSearch} />
          </div>
          <div className={style.filters}>
            <div className={style.selectContainer}>
              <select className={style.selectBox} onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
              <div className={style.iconContainer}>
                <i class="material-symbols-outlined">expand_more</i>
              </div>
            </div>
            <div className={style.selectContainer}>
              <select
                className={style.selectBox}
                onChange={handleOrderByWeight}
              >
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>
              <div className={style.iconContainer}>
                <i class="material-symbols-outlined">expand_more</i>
              </div>
            </div>
            <div className={style.selectContainer}>
              <select
                className={style.selectBox}
                onChange={handleFilterByTemperament}
              >
                <option disabled selected defaultValue>
                  Temperaments
                </option>
                <option value="Todos">All</option>
                {allTemperaments?.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>
              <div className={style.iconContainer}>
                <i class="material-symbols-outlined">expand_more</i>
              </div>
            </div>
          </div>
        </div>
        <div className={style.bodyContainer}>
          <div className={style.cardsRender}>
            <Cards 
            currentDogs={currentDogs}
            />
          </div>
          <div className={style.pagination}>
            <Paginate
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              paginado={paginado}
            />{" "}
            {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
          </div>

          {/* <Footer/> */}
        </div>
      </div>
    </div>

  );
}

export default Home;

// <div className={style.leftBody}>
//           <Slider />
//         </div>
//         <div className={style.rightBody}>
//           <h3>¿LISTO?</h3>
//           <NavLink to="/home">
//             <button>FIND YOUR NEXT DOG</button>
//           </NavLink>
//         </div>
