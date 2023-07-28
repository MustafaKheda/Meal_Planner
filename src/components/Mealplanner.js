import React, { useEffect, useRef } from "react";
import MealSearch from "./MealSearch";
import MealCards from "./MealCards";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./meal.css";
function Mealplanner() {
  const mealCardsRef = useRef();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.allMeal?.currentUser);
  useEffect(() => {
    if (Object.keys(currentUser).length <= 0) {
      navigate("/");
    }
  }, [currentUser]);

  return Object.keys(currentUser).length > 0 ? (
    <div>
      <Header />
      <div className="Meal_Body">
        <MealSearch mealCardsRef={mealCardsRef} />
        <MealCards ref={mealCardsRef} />
      </div>
    </div>
  ) : null;
}

export default Mealplanner;
