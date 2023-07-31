import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const miApi = "http://localhost:3001";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_BREED = "GET_BREED";
export const RESET_FILTERS = "RESET_FILTERS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SET_LOADING = "SET_LOADING";
export const SHOW_DETAILS = "SHOW_DETAILS";
export const SET_PAGE = "SET_PAGE";
export const COMBINED_FILTERS = "COMBINED_FILTERS";
export const SET_ORDER = "SET_ORDER";
export const SET_ERROR = "SET_ERROR";
export const CLOSE_ERROR = "CLOSE_ERROR";



export function getAllDogs() {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      var dogs = await axios.get(`${miApi}/dogs`);
      return dispatch({
        type: GET_ALL_DOGS,
        payload: dogs.data,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      var temp = await axios.get(`${miApi}/temperament`);
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: temp.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function combinedFilters(allFilters) {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      return dispatch({
        type: COMBINED_FILTERS,
        payload: allFilters,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function setOrder(order) {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      return dispatch({
        type: SET_ORDER,
        payload: order,
      });
    } catch (error) {
      console.log("Error setting Order", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

//SEARCH BY NAME

export function getBreed(payload) {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      var breed = await axios.get(`${miApi}/dogs?name=${payload}`);
      return dispatch({
        type: GET_BREED,
        payload: breed.data,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Dog not found!",
      });
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const resetFilters = () => {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      return dispatch({
        type: RESET_FILTERS,
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export function postDog(payload) {
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const data = await axios.post("http://localhost:3001/dog", payload);
      return data;
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data.error,
      });
      console.log(error.message);
    } finally {
      setTimeout(()=>dispatch( dispatch(setLoading(false)) ), 1200) ;
    }
  };
}

export function showDogDetails(id) {
  const endpoint = `${miApi}/dogs/${id}`;
  return async function (dispatch) {
    try {
      dispatch(setLoading(true));
      const dog = (await axios(endpoint)).data;
      dispatch({
        type: SHOW_DETAILS,
        payload: dog,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: "Dog not found!",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const cleanDetail = () => {
  return (dispatch) => {
    return dispatch({
      type: CLEAN_DETAIL,
      payload: [],
    });
  };
};

export const setLoading = (bool) => {
  return {
    type: SET_LOADING,
    payload: bool,
  };
};

export const closeError = () => {
  return {
    type: CLOSE_ERROR,
  };
};
