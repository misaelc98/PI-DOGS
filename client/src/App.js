import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Header from "./components/Header/Header";

function App() {


// enctype=multipart/form-data PARA PODER CARGAR LA IMAGEN

  return (

    <div className="App">

      <Header />

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home />} />

      </Routes>

    </div>
  );
}

export default App;