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
      // image: image || "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    });

    if (temperaments && temperaments.length > 0) {
      const associatedTemperaments = await Temperament.findAll({
        where: { name: temperaments },
      });
      dog.addTemperament(associatedTemperaments);
    }

    res.status(200).send("Perro creado correctamente!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDog,
};