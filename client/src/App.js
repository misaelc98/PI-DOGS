import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Header from "./components/Header/Header";
import DogDetails from "./Views/Detail/Detail";
import AddForm from "./components/AddForm/AddForm";

function App() {

// enctype = multipart/form-data PARA PODER CARGAR LA IMAGEN

  return (

    <div className="App">

      <Header />

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

        <Route path="/dogdetail/:id" element={<DogDetails/>} />

        <Route path="/dog" element={<AddForm/>} />

      </Routes>

    </div>
  );
}

export default App;