const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  copyAllDogs: [],
  details: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
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

    case "GET_TEMPERAMENTS":
      const filteredTemp = action.payload.filter((temp) => temp.name !== "");
      return {
        ...state,
        temperaments: filteredTemp,
      };

    case "GET_FILTER_TEMPERAMENTS":
      const allDogs = state.allDogs;
      let filteredDogs = [];
      if (action.payload === "Todos") {
        filteredDogs = allDogs;
      } else {
        for (let i = 0; i < allDogs.length; i++) {
          let found = allDogs[i].temperaments.find((t) => t === action.payload);
          if (found) {
            filteredDogs.push(allDogs[i]);
          }
        }
      }
      return {
        ...state,
        dogs: filteredDogs,
      };

    case "FILTER_BY_ORIGIN":
      if (action.payload === "All") {
        return {
          ...state,
          dogs: state.allDogs,
        };
      } else {
        if (action.payload === "BD") {
          return {
            ...state,
            dogs: state.allDogs.filter((dog) => isNaN(dog.id) === true),
          };
        } else {
          return {
            ...state,
            dogs: state.allDogs.filter((dog) => isNaN(dog.id) === false),
          };
        }
      }

    case "RESET_FILTERS":
      return initialState;

    case "CLEAN_DETAIL":
      return {
        ...state,
        details: [],
        loading: false,
      };

    case "GET_BREED":
      return {
        ...state,
        dogs: action.payload,
      };

    case "ORDER_BY_NAME":
      const sortedName =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };

    case "FILTER_BY_ORIGIN":
      return {
        ...state,
        origenPerros: action.payload,
      };

    case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "min_weight"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weightMin) > parseInt(b.weightMin)) {
                return 1;
              }
              if (parseInt(b.weightMin) > parseInt(a.weightMin)) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weightMax) > parseInt(b.weightMax)) {
                return -1;
              }
              if (parseInt(b.weightMax) > parseInt(a.weightMax)) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };

    case "SHOW_DETAILS":
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
