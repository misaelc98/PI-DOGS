const { Dog, Temperament } = require("../db");

const getDogPk = async (id) => {
  return await Dog.findByPk(id, {
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = { getDogPk };
