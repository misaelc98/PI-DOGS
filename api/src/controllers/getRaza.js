const { dataDogs } = require("../controllers/getDog");

const getRaza = async (req, res) => {
  try {
    const { idRaza } = req.params;
    const everyDog = await dataDogs();
    const dog = everyDog.find((el) => el.id === parseInt(idRaza));
    if (dog) {
      res.status(200).json(dog);
    } else {
      res.status(404).send("Raza no encontrada");
    }
  } catch (error) {
    res.status(500).json({ error: "Error al encontrar la raza" });
  }
};

module.exports = {
  getRaza,
};