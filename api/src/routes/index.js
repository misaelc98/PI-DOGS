const { Router } = require("express");
const { getTemperaments } = require("../controllers/getTemperaments");
const {createDog} = require("../handlers/createDogHandler");
const {dogsByName} = require("../handlers/getDogHandler");
const {getRaza} = require("../handlers/getRazaHandler");

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


