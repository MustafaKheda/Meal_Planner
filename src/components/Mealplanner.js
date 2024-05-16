import React, { useEffect, useRef, useState } from "react";
import MealSearch from "./MealSearch";
import MealCards from "./MealCards";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./meal.css";
function Mealplanner() {
  const [state, setState] = useState({
    query: "",
    showSearch: false,
    open: false,
    progress: false,
    allergies: {
      "Dairy-Free": false,
      "Egg-Free": false,
      "Gluten-Free": false,
      "Peanut-Free": false,
    },
  });
  const { allergies } = state;

  const mealCardsRef = useRef();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.allMeal?.currentUser);
  const handleChange = (e) => {
    setState((prvState) => ({
      ...prvState,
      [e.target.name]: e.target.value,
    }));
  };
  // useEffect(() => {
  //   if (Object.keys(currentUser).length <= 0) {
  //     navigate("/");
  //   }
  // }, [currentUser]);

  const handleAllergies = (e) => {
    e.preventDefault();
    setState((prvState) => ({
      ...prvState,
      allergies: {
        ...allergies,
        [e.target.name]: e.target.checked,
      },
    }));
  };

  const handleOpenProgress = () => {
    setState((prvState) => ({
      ...prvState,
      progress: true,
    }));
  };
  const handleCloseProgress = () => {
    setState((prvState) => ({
      ...prvState,
      progress: false,
    }));
  };
  return (
    <div>
      <Header />
      <div className="Meal_Body">
        <MealSearch
          handleChange={handleChange}
          mealCardsRef={mealCardsRef}
          state={state}
          handleAllergies={handleAllergies}
          handleOpenProgress={handleOpenProgress}
          handleCloseProgress={handleCloseProgress}
        />
        <MealCards
          ref={mealCardsRef}
          state={state}
          handleOpenProgress={handleOpenProgress}
          handleCloseProgress={handleCloseProgress}
        />
      </div>
    </div>
  );
}

export default Mealplanner;
