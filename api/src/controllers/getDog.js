const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const {getDogPk} = require("../helpers/dogByPk");

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
      heightMin: altura[0],
      heightMax: altura[1],
      weightMin: peso[0],
      weightMax: peso[1],
      temperaments: caracter,
      life_span: dog.life_span,
      image: dog.image.url,
    };
  });
  return apiInfo;
};

const dogsDb = async () => {
  const formatedDogsDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
    return formatedDogsDB.map((dog) => {
    const {id, name, heightMin, heightMax , weightMin, weightMax, life_span, image, Temperaments} = dog;
    
    const tempi = Temperaments.map((t) => {
      return t.name;
    })
    return{
    id,
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    temperaments : tempi,
    life_span,
    image
    };
  })
};

const dataDogs = async () => {
  const dataFromApi = await dogsApi();
  const dataFromDb = await dogsDb();
  const allDataMixed = [...dataFromDb, ...dataFromApi];
  return allDataMixed;
};


module.exports = {
  dataDogs,
  dogsDb,
  dogsApi,
};



// const dogsDb = async (id) => {
//   const formatedDogsDB = await getDogPk(id);
//     return formatedDogsDB.map((dog) => {
//     const {id, name, heightMin, heightMax , weightMin, weightMax, life_span, image, Temperaments} = dog;
    
//     const tempi = Temperaments.map((t) => {
//       return t.name;
//     })
//     return{
//     id,
//     name,
//     heightMin,
//     heightMax,
//     weightMin,
//     weightMax,
//     temperaments : tempi,
//     life_span,
//     image
//     };
//   })
// };