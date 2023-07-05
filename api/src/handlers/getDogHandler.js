const { dataDogs } = require("../controllers/getDog");

const dogsByName = async (req, res) => {
  const { name } = req.query;
  const perros = await dataDogs();
  if (name) {
    const dog = perros.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    );
    dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found");
  } else {
    res.status(200).send(perros);
  }
};

module.exports = {
  dogsByName,
};

//GET | /dogs/name?="..."
//Esta ruta debe obtener todas aquellas razas de perros que coinciden con el
//nombre recibido por query. (No es necesario que sea una coincidencia exacta).
//Debe poder buscarlo independientemente de mayúsculas o minúsculas.
//Si no existe la raza, debe mostrar un mensaje adecuado.
//Debe buscar tanto los de la API como los de la base de datos.