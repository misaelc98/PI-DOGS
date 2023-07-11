import axios from "axios";
const miApi = "http://localhost:3001";

export function getAllDogs() {
    return async function (dispatch) { 
      try{
        var dogs = await axios.get(`${miApi}/dogs`);
        return dispatch({
            type: "GET_ALL_DOGS",
            payload: dogs.data
        });
    } catch(error)
    {console.log(error.message)}
};
}

export function getTemperaments() {
  return async function (dispatch) {
      var temp = await axios.get(`${miApi}/temperament`)
      return dispatch({
          type: "GET_TEMPERAMENTS",
          payload: temp.data,
      });
    }  
};

export function FilterByTemperament(payload) {
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
};

export function getBreed(payload) {    //dogs by name
    return async function (dispatch) {
        try {
            var breed = await axios.get(`${miApi}/dogs?name=${payload}`)
            return dispatch ({
                type: "GET_BREED",
                payload: breed.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function OrderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            var detail = await axios.get("http://localhost:3001/dogs/"+id
        );
        return dispatch({
            type: "SHOW_DOG_DETAILS",
            payload: detail.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function postDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dog")
        return data;
    }
}