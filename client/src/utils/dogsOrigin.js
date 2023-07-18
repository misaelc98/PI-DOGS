export function getAllDogs() {
    return async function (dispatch) {
      try {
        const dogs = await axios.get(`${miApi}/dogs`);
  
        dispatch({
          type: "GET_ALL_DOGS",
          payload: dogs.data,
        });
  
        // Filtrar perros según el origen seleccionado (si existe)
        if (state.origenPerros !== null) {
          dispatch(filterByOrigin(state.origenPerros));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  }