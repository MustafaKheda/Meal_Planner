import { combineReducers } from "redux";
import { Actiontypes } from "./actionType";

const initialState = {
  mealList: [],
  currentUser: {},
  dayMeal: [],
  user: [],
  alleregy: [],
  nextLink: null,
  prevLinks: [],
  product: null,
  currentPage: null,
  totalNumberOfPage: null,
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
  FETCH_NEXT_MEAL,
  REMOVE_LINKS,
  FETCH_PREV_MEAL,
  FETCH_LINK_MEAL,
  REMOVE_LINK_MEAL,
} = Actiontypes;
const mealReducer = (state = initialState, action) => {
  const { prevLinks } = state;
  switch (action.type) {
    case FETCH_MEAL:
      const { hit, next, prevLink, totalNumberOfPage, currentPage } =
        action.payload;
      return {
        ...state,
        mealList: hit,
        nextLink: next,
        prevLinks: [prevLink],
        totalNumberOfPage,
        currentPage,
      };
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
        prevLinks: [],
        nextLink: null,
        mealList: [],
        currentPage: null,
        totalNumberOfPage: null,
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
    case FETCH_NEXT_MEAL: {
      const { hit, next, prevLink } = action.payload;
      return {
        ...state,
        mealList: hit,
        nextLink: next,
        prevLinks: [...prevLinks, prevLink],
        currentPage: state.currentPage + 1,
      };
    }
    case FETCH_PREV_MEAL: {
      const { hit, next } = action.payload;
      const updatedPrevLinks = prevLinks.filter(
        (item, index) => index !== prevLinks.length - 1
      );
      return {
        ...state,
        mealList: hit,
        nextLink: next,
        prevLinks: updatedPrevLinks,
        currentPage: state.currentPage - 1,
      };
    }
    case REMOVE_LINKS: {
      return {
        ...state,
        nextLink: null,
        prevLinks: [],
      };
    }
    case FETCH_LINK_MEAL: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case REMOVE_LINK_MEAL: {
      return {
        ...state,
        product: null,
      };
    }

    default:
      return state;
  }
};

export const reducer = combineReducers({
  allMeal: mealReducer,
});
