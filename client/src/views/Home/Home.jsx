import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Paginate from "../../components/Pager/Pager";
import SearchBar from "../../components/SearchBar/SearchBar";
import Slider from "../../components/Galery/Slider";
import style from "../Home/Home.module.css";
import Cards from "../../components/Cards/Cards";
import Loading from "../../components/Loading/Loading";
import {
  getAllDogs,
  getTemperaments,
  setOrder,
  resetFilters,
  combinedFilters,
  setPage,
} from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const filtersChosen = useSelector((state) => state.filtersChosen);
  const orderChosen = useSelector((state) => state.orderChosen);
  const actualPage = useSelector((state) => state.actualPage);

  //LOCAL STATE FOR FILTERS
  const [filtersChosenLocal, setfiltersChosenLocal] = useState({
    temperamentChosen: "",
    originChosen: "",
  });

  useEffect(() => {
    setfiltersChosenLocal(filtersChosen);
    setOrderChosenLocal(orderChosen);
  }, [filtersChosen, orderChosen]);

  //LOCAL STATE FOR ORDER
  const [order, setOrderChosenLocal] = useState();

  function handleOrder(e) {
    const selectedFilter = e.target.value;
    setOrderChosenLocal(selectedFilter);
    dispatch(setOrder(selectedFilter));
  }

  //PAGINATED
  const [currentPage, setCurrentPage] = useState(1);

  const dogsPerPage = 8;
  const pages = Math.ceil(allDogs.length / dogsPerPage);
  const indexLast = dogsPerPage * currentPage;
  const indexStart = indexLast - dogsPerPage;
  const currentDogs = allDogs.slice(indexStart, indexLast);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //FILTERS BY ORIGIN AND TEMPERAMET
  function handleFilterOrigin(e) {
    const selectedFilter = e.target.value;
    setfiltersChosenLocal({
      ...filtersChosenLocal,
      originChosen: selectedFilter,
    });
    dispatch(
      combinedFilters({
        ...filtersChosen,
        originChosen: selectedFilter,
      })
    );
    dispatch(setOrder(order));
    setCurrentPage(1);
  }

  function handleFilterByTemperament(e) {
    const selectedFilter = e.target.value;
    setfiltersChosenLocal({
      ...filtersChosenLocal,
      temperamentChosen: selectedFilter,
    });
    dispatch(
      combinedFilters({
        ...filtersChosen,
        temperamentChosen: selectedFilter,
      })
    );
    dispatch(setOrder(order));
    setCurrentPage(1);
  }

  //Manejo de la busqueda
  const handleSearch = (e) => {
    setCurrentPage(1);
  };

  //RESET STATES AND FILTERS
  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(getAllDogs());
    dispatch(getTemperaments());
    setCurrentPage(1);
  };

  const loading = useSelector((state) => state.loading);

  return (
    <div>
      {loading && <Loading />}
      <div className={style.mainContainer}>
        <div className={style.filterContainer}>
          <div className={style.searchContainer}>
            <SearchBar handleSearch={handleSearch} />
            <div className={style.selectContainer}>
              <button className={style.btn} onClick={handleResetFilters}>
                RESET
              </button>
            </div>
          </div>
          <div className={style.filters}>
            <div className={style.selectContainer}>
              <select
                className={style.origin}
                name="Filter_Origin"
                value={filtersChosenLocal.originChosen}
                onChange={handleFilterOrigin}
              >
                <option value="All">All</option>
                <option value="API">API</option>
                <option value="BD">DB</option>
              </select>
            </div>
            <div className={style.selectContainer}>
              <select className={style.alphabetic} onChange={handleOrder}>
                <option disabled selected defaultValue>
                  ALPHABETICAL
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>
            <div className={style.selectContainer}>
              <select className={style.weight} onChange={handleOrder}>
                <option disabled selected defaultValue>
                  WEIGHT
                </option>
                <option value="Max">Max</option>
                <option value="Min">Min</option>
              </select>
            </div>
            <div className={style.selectContainer}>
              <select
                className={style.temperaments}
                onChange={handleFilterByTemperament}
                value={filtersChosenLocal.temperamentChosen}
              >
                {/* <option disabled selected defaultValue>
                  TEMPERAMENTS
                </option> */}
                <option>All</option>
                {allTemperaments?.map((temp) => (
                  <option value={temp.name} key={temp.id}>
                    {temp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={style.pagination}>
          
          <Paginate
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
          />{" "}
          {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
        </div>
        <div className={style.bodyContainer}>
          <div className={style.cardsRender}>
            <Cards currentDogs={currentDogs} />
          </div>
          <div className={style.pagination}>
            <Paginate
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              paginado={paginado}
            />{" "}
            {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

