import edamanApi from "../components/apis/edamanApi";
import { Actiontypes } from "./actionType";
import { API_ID, API_key } from "../Constant";

export const removeMeal = () => {
  return {
    type: Actiontypes.REMOVE_MEAL,
  };
};
export const setDayMeal = (data) => {
  return {
    type: Actiontypes.DAY_MEAL,
    payload: data,
  };
};
export const fetchSearchMeal = (query, type) => {
  return async function (dispatch) {
    console.log(query);
    const response = await edamanApi.get(
      `/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_key}`
    );
    dispatch({ type: Actiontypes.FETCH_MEAL, payload: response?.data?.hits });
  };
  // return {
  //   type: Actiontypes.FETCH_MEAL,
  //   payload: query,
  // };
};

export const fetchCuisineMeal = (query) => {
  return async function (dispatch) {
    const response = await edamanApi.get(
      `/v2?type=public&&app_id=${API_ID}&app_key=${API_key}&cuisineType=${query}`
    );
    dispatch({ type: Actiontypes.FETCH_MEAL, payload: response?.data?.hits });
  };
};
export const fetchDishTypeMeal = (query) => {
  return async function (dispatch) {
    const response = await edamanApi.get(
      `/v2?type=public&&app_id=${API_ID}&app_key=${API_key}&dishType=${query}`
    );
    dispatch({ type: Actiontypes.FETCH_MEAL, payload: response?.data?.hits });
  };
};
export const setUser = (data) => {
  return {
    type: Actiontypes.SET_USER,
    payload: data,
  };
};
export const setCurrentUser = (id, username) => {
  return {
    type: Actiontypes.SET_CURRENT_USER,
    payload: {
      id,
      username,
    },
  };
};
export const setAllergy = (data) => {
  return {
    type: Actiontypes.SET_ALLEREGY,
    payload: data,
  };
};
export const unSetCurrentUser = () => {
  return {
    type: Actiontypes.UNSET_CURRENT_USER,
  };
};

export const deleteMeal = (id) => {
  return {
    type: Actiontypes.DELETE_MEAL,
    payload: id,
  };
};
export const resetMeal = (id) => {
  return {
    type: Actiontypes.RESET_MEAL,
    payload: id,
  };
};

// export const fetchFilterMeal = (query, allergies) => {
//   return async function (dispatch) {
//     console.log(query);
//     const response = await edamanApi.get(
//       `/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_key}&health=${Object.keys(
//         allergies
//       )
//         .filter((allergy) => allergies[allergy])
//         .join("&health=")}`
//     );
//     dispatch({ type: Actiontypes.FETCH_MEAL, payload: response?.data?.hits });
//   };
// };
