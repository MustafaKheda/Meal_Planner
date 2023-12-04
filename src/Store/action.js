import edamanApi from "../components/apis/edamanApi";
import { Actiontypes } from "./actionType";
import { API_ID, API_key } from "../Constant";
import axios from "axios";

export const removeMeal = () => {
  return {
    type: Actiontypes.REMOVE_MEAL,
  };
};
export const removeLinks = () => {
  return {
    type: Actiontypes.REMOVE_LINKS,
  };
};

export const setDayMeal = (data) => {
  return {
    type: Actiontypes.DAY_MEAL,
    payload: data,
  };
};

export const fetchSearchMeal = (query, type) => {
  console.log(query);
  return async function (dispatch) {
    const response = await edamanApi.get(
      `/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_key}`
    );
    const prevLink = {
      href: `https://api.edamam.com/api/recipes${response?.config?.url}`,
      title: "Prev Page",
      from: response?.data?.from,
      to: response?.data?.to,
    };
    console.log(response);
    // Object.keys(response.data._links);
    const nextLink =
      Object.keys(response?.data?._links).length > 0
        ? response?.data?._links?.next
        : null;
    console.log(Object.keys(response?.data?._links).length);
    dispatch({
      type: Actiontypes.FETCH_MEAL,
      payload: {
        hit: response?.data?.hits,
        next: nextLink,
        prevLink,
      },
    });
  };
  // return {
  //   type: Actiontypes.FETCH_MEAL,
  //   payload: query,
  // };
};

export const fetchCuisineMeal = (query) => {
  console.log(query);
  return async function (dispatch) {
    const response = await edamanApi.get(
      `/v2?type=public&&app_id=${API_ID}&app_key=${API_key}&cuisineType=${query}`
    );

    const prevLink = {
      href: `https://api.edamam.com/api/recipes${response?.config?.url}`,
      title: "Prev Page",
      from: response?.data?.from,
      to: response?.data?.to,
    };
    Object.keys(response.data._links);
    console.log(Object.keys(response.data._links.next).length);
    dispatch({
      type: Actiontypes.FETCH_MEAL,
      payload: {
        hit: response?.data?.hits,
        next: response?.data?._links?.next,
        prevLink,
      },
    });
  };
};
export const fetchDishTypeMeal = (query) => {
  console.log(query);
  return async function (dispatch) {
    const response = await edamanApi.get(
      `/v2?type=public&&app_id=${API_ID}&app_key=${API_key}&dishType=${query}`
    );
    const prevLink = {
      href: `https://api.edamam.com/api/recipes${response?.config?.url}`,
      title: "Prev Page",
      from: response?.data?.from,
      to: response?.data?.to,
    };
    // Object.keys(response.data._links);
    console.log(response?.data._links.next);
    // console.log(Object?.keys(response?.data._links.next).length);
    dispatch({
      type: Actiontypes.FETCH_MEAL,
      payload: {
        hit: response?.data?.hits,
        next: response?.data?._links?.next,
        prevLink,
      },
    });
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
export const nextPage = (link) => {
  const { href } = link;
  return async function (dispatch) {
    const response = await axios.get(href);
    const prevLink = {
      href: response?.config?.url,
      title: "Prev Page",
      from: response?.data?.from,
      to: response?.data?.to,
    };
    dispatch({
      type: Actiontypes.FETCH_NEXT_MEAL,
      payload: {
        hit: response?.data?.hits,
        next: response?.data?._links?.next,
        prevLink,
      },
    });
  };
};
export const prevPage = (link) => {
  const { href } = link;
  return async function (dispatch) {
    const response = await axios.get(href);
    console.log(response);
    dispatch({
      type: Actiontypes.FETCH_PREV_MEAL,
      payload: {
        hit: response?.data?.hits,
        next: response?.data?._links?.next,
      },
    });
  };
};

export const handleFetchMealByLink = (href) => {
  console.log(href);
  return async function (dispatch) {
    const response = await axios.get(href);
    console.log(response);
    dispatch({
      type: Actiontypes.FETCH_LINK_MEAL,
      payload: response?.data?.recipe,
    });
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
