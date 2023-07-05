const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

const getTemperaments = async (req, res) => {
  try {
    const caracterApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const caracteres = caracterApi.data.map((c) => c.temperament);
    const temps = caracteres.toString().split(",");
    temps.forEach(el => {
      let i = el.trim();
      Temperament.findOrCreate({
        where: { name: i },
      });
    });

    const allTemp = await Temperament.findAll();
    res.send(allTemp);
  } catch (error) {
    res.status(500).json({ error: "Error al encontrar los temperamentos" });
  }
};

module.exports = {
  getTemperaments,
};


// GET | /temperaments
// Obtiene todos los temperamentos existentes.
// Estos deben ser obtenidos de la API 
//(se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, 
//deben ser guardados en la base de datos para su posterior consumo desde allí.