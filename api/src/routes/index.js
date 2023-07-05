const { Router } = require("express");
const { Dog , Temperament } = require("../db");
const { dogsByName, dataDogs } = require("../controllers/getDog.js");
const { getTemperaments } = require("../controllers/getTemperaments");
const { createDog } = require("../controllers/createDog");
const { getRaza } = require("../controllers/getRaza");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", dogsByName);  //Funciona correctamente
router.get("/dogs/:idRaza", getRaza);  //Funciona correctamente
router.get("/temperament", getTemperaments);  //Funciona correctamente
router.post("/dog", createDog);  //Funciona correctamente

module.exports = router;


