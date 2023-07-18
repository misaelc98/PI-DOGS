import axios from "axios";
import { useDispatch } from "react-redux";
const miApi = "http://localhost:3001";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_FILTER_TEMPERAMENTS = "GET_FILTER_TEMPERAMENTS";
export const GET_BREED = "GET_BREED";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const RESET_FILTERS = "RESET_FILTERS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const SET_LOADING = "SET_LOADING";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const SHOW_DETAILS = "SHOW_DETAILS";
export const SET_PAGE = "SET_PAGE";

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
    var temp = await axios.get(`${miApi}/temperament`);
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: temp.data,
    });
  };
}

export function filterByOrigin(origin) {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  };
}

export function FilterByTemperament(payload) {
  return {
    type: GET_FILTER_TEMPERAMENTS,
    payload,
  };
}

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
      console.log(error);
    }finally{
      dispatch(setLoading(false));
    }
  };
}

export function OrderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function OrderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
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
  return async function () {
    const data = await axios.post("http://localhost:3001/dog", payload);
    return data;
  };
}

export function showDogDetails(id) {
  const endpoint = `${miApi}/dogs/${id}`;
  return async function(dispatch) {
    try{
      dispatch(setLoading(true));
      axios(endpoint).then(({ data }) => {
      return dispatch({
        type: SHOW_DETAILS,
        payload: data,
      });
    });
  } catch (error) {
    console.log(error.message);
  } finally{
    dispatch(setLoading(false))
  }
}
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