import { combineReducers } from "redux";
import { Actiontypes } from "./actionType";

const initialState = {
  mealList: [],
  currentUser: {},
  dayMeal: [],
  user: [],
  alleregy: [],
};

const {
  FETCH_MEAL,
  REMOVE_MEAL,
  DAY_MEAL,
  SET_USER,
  SET_CURRENT_USER,
  UNSET_CURRENT_USER,
  SET_ALLEREGY,
  DELETE_MEAL,
  RESET_MEAL,
} = Actiontypes;
const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEAL:
      return { ...state, mealList: action.payload };
    case REMOVE_MEAL:
      return { ...state, mealList: [] };
    case DAY_MEAL:
      return {
        ...state,
        dayMeal: [...state.dayMeal, action.payload],
      };
    case SET_USER:
      return {
        ...state,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username,
        },
        user: [...state.user, action.payload],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_ALLEREGY:
      return {
        ...state,
        alleregy: action.payload,
      };
    case UNSET_CURRENT_USER:
      return {
        ...state,
        currentUser: {},
      };
    case DELETE_MEAL:
      const filteredItem = state.dayMeal.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        dayMeal: filteredItem,
      };
    case RESET_MEAL:
      const filtered = state.dayMeal.filter(
        (item) => item.userId !== action.payload
      );
      return {
        ...state,
        dayMeal: filtered,
      };

    default:
      return state;
  }
};

export const reducer = combineReducers({
  allMeal: mealReducer,
});
