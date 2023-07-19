import {
  GET_ALL_DOGS,
  FILTER_BY_ORIGIN,
  GET_TEMPERAMENTS,
  GET_BREED,
  ORDER_BY_WEIGHT,
  RESET_FILTERS,
  CLEAN_DETAIL,
  SET_LOADING,
  SET_PAGE,
  COMBINED_FILTERS,
  SET_ORDER,
  SHOW_DETAILS
} from "./actions";

const initialState = {
  dogs: [],

  temperaments: [],

  allDogs: [],

  details: [],

  loading: true,

  orderChosen: "",

  filtersChosen: {
    temperamentChosen: "",
    originChosen: "",
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOGS:
      action.payload.forEach((element) => {
        if (!element.temperaments) {
          element.temperaments = "no-temperaments";
        }
      });
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_TEMPERAMENTS:
      const filteredTemp = action.payload.filter((temp) => temp.name !== "");
      return {
        ...state,
        temperaments: filteredTemp,
      };

    //LOGICA DEL COMBINADO DE FILTRO ORIGEN Y TEMPERAMENTOS
    case COMBINED_FILTERS:
      let filtered = [...state.allDogs];
      if (
        action.payload.originChosen !== "All" &&
        action.payload.originChosen !== ""
      ) {
        if (action.payload.originChosen === "API") {
          filtered = filtered.filter((dog) => isNaN(dog.id) === false);
        } else {
          filtered = filtered.filter((dog) => isNaN(dog.id) === true);
        }
      }

      if (
        action.payload.temperamentChosen !== "All" &&
        action.payload.temperamentChosen !== ""
      ) {
        filtered = filtered.filter((dog) =>
          dog.temperaments.includes(action.payload.temperamentChosen)
        );
      }

      return {
        ...state,
        filtersChosen: action.payload,
        dogs: filtered,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_PAGE:
      return { ...state, currentPage: action.payload };

    case RESET_FILTERS:
      return initialState;

    case CLEAN_DETAIL:
      return {
        ...state,
        details: [],
        loading: false,
      };

    case GET_BREED:
      return {
        ...state,
        dogs: action.payload,
      };

    case SET_ORDER:
      if (action.payload === "A-Z") {
        return {
          ...state,
          orderChosen: action.payload,
          dogs: [...state.dogs].sort((a, b) => a.name.localeCompare(b.name)),
        };
      } else if (action.payload === "Z-A") {
        return {
          ...state,
          orderChosen: action.payload,
          dogs: [...state.dogs].sort((a, b) => b.name.localeCompare(a.name)),
        };
      } else if (action.payload === "Max") {
        return {
          ...state,
          orderChosen: action.payload,
          dogs: [...state.dogs].sort((a, b) => a.weightMax - b.weightMax),
        };
      } else if (action.payload === "Min") {
        return {
          ...state,
          orderChosen: action.payload,
          dogs: [...state.dogs].sort((a, b) => b.weightMin - a.weightMin),
        };
      }
      return {
        ...state,
        orderChosen: action.payload,
        dogs: state.dogs,
      };

    case SHOW_DETAILS:
      let myDetails = action.payload;
      if (myDetails.temperaments.length === 0) {
        //   //agregamos "no-temperaments" a arreglos sin elementos dentro
        myDetails.temperaments = "no-temperaments";
      }
      console.log(myDetails);
      return {
        ...state,
        details: myDetails,
      };

    default:
      return state;
  }
};

export default rootReducer;
