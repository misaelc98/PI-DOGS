import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
} from "../../redux/actions";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Pager/Pager";
import style from "../Home/Home.module.css";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import Slider from "../../components/Galery/Slider";
//#00c1b5 Color celeste

function Home() {
  const imagesHome = [
    "https://img.freepik.com/fotos-premium/funny-hipster-cute-dog-art-illustration-perros-antropomorficos_739548-2069.jpg",
    "https://img.freepik.com/fotos-premium/funny-hipster-cute-dog-art-illustration-perros-antropomorficos_739548-2112.jpg",
    "https://img.freepik.com/fotos-premium/funny-hipster-cute-dog-art-illustration-perros-antropomorficos_739548-2097.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEsymz8I3EPDTrJU-mhoAl0-L_IopXlVRfEDRb2rNudWfTT0nsjuV8Cwax3Dvdbnm980g",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTARRO-9pbyNQib4OzlWxLthxtZi8uIAqcXfne6Ngu3xqSkAZd89ztPvWDIV8LnbO-JXJo",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ30Ij5z1Pk9Se7tCTH4fo0mkGG9peNLePdtV6DCtdwIfap2F9XQExj7A2uVNLBozC0MmU",
  ];

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
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.topContainer}>
        <Header />
      </div>
      <div className={style.bodyContainer}>
        <div className={`${style.pagination}`}>
          <Paginate
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
          />{" "}
          {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
        </div>
        <div className={style.main_container}>
          <div className={style.container_cards}>
            {currentDogs?.map((el) => {
              //validacion que existan los datos
              return (
                <div className={`${style.container_card}`} key={el.id}>
                  <NavLink to={"/dog-detail/" + el.id}>
                    {
                      <Card
                        key={el.id}
                        image={el.image}
                        name={el.name}
                        temperaments={
                          el.temperaments[0].name
                            ? el.temperaments.map((el) => el.name)
                            : el.temperaments
                        }
                      />
                      //si temperaments viene en un formato distinto desde la BD
                    }
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

{
  /* <div className={style.leftBody}>
          <Slider images={imagesHome} />
        </div> */
}
