const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;

const dogsApi = async () => {
  const urLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
  const apiData = await axios.get(urLink);
  const apiInfo = await apiData.data.map((dog) => {
    let caracter = [];
    if (dog.temperament) {
      caracter = dog.temperament.split(", ");
    }

    let altura = [];
    if (dog.height.metric) {
      altura = dog.height.metric.split(" - ");
    }

    let peso = [];
    if (dog.weight.metric) {
      peso = dog.weight.metric.split(" - ");
    }
    return {
      id: dog.id,
      name: dog.name,
      height: altura,
      weight: peso,
      temperaments: caracter,
      life_span: dog.life_span,
      image: dog.image.url,
    };
  });
  return apiInfo;
};

const dogsDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const dataDogs = async () => {
  const dataFromApi = await dogsApi();
  const dataFromDb = await dogsDb();
  const allDataMixed = [...dataFromApi, ...dataFromDb];
  return allDataMixed;
};

module.exports = {
  dataDogs,
};
