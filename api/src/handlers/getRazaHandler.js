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

//📍 GET | /dogs/:idRaza
//Esta ruta obtiene el detalle de una raza específica. Es decir que devuelve un objeto con
//la información pedida en el detalle de un perro.
//La raza es recibida por parámetro (ID).
//Tiene que incluir los datos de los temperamentos asociadas a esta raza.
//Debe funcionar tanto para los perros de la API como para los de la base de datos.