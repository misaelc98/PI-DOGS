const { Dog, Temperament } = require("../db");

const createDog = async (req, res) => {
  try {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      temperaments,
      image,
    } = req.body;

    const dog = await Dog.create({
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      image: image || "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    });

    if (temperaments && temperaments.length > 0) {
      const temperamentosAgregados = await Temperament.findAll({
        where: { name: temperaments },
      });
      dog.addTemperament(temperamentosAgregados);
    }

    res.status(200).send("Dog added succesfully!");
  } catch (error) {
    res.status(500).json({ error: "The dog already exists!" });
  }
};

module.exports = {
  createDog,
};