import "./App.css";
import { getAllDogs, getTemperaments } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./views/Landing/Landing";
import Home from "./views/Home/Home";
import Header from "./components/Header/Header";
import DogDetails from "./views/Detail/Detail";
import AddForm from "./components/AddForm/AddForm";
import Cards from "./components/Cards/Cards";
import AlertMsg from "./components/AlertMsg/AlertMsg";
import Loading from "./components/Loading/Loading";

function App() {

  const dispatch = useDispatch();
  const showError = useSelector((state)=> state.showError);
  
  //Montaje y acciones despachadas
  
  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  // enctype = multipart/form-data PARA PODER CARGAR LA IMAGEN

  const loading = useSelector((state) => state.loading);

  return (
    <div className="App">

      {showError && <AlertMsg/>}

      {loading && <Loading/>}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/home"
          element={
            <>
              {" "}
              <Header /> <Home /> <Cards />{" "}
            </>
          }
        />

        <Route
          path="/dogs/:id"
          element={
            <>
              {" "}
              <Header /> <DogDetails />{" "}
            </>
          }
        />

        <Route path="/dog" element={<AddForm />} />
      </Routes>
    </div>
  );
}

export default App;
