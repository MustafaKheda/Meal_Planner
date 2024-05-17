import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import "./meal.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchMeal, removeMeal, setAllergy } from "../Store/action";
import { api_data } from "./apis/api";

function MealSearch({
  mealCardsRef,
  state,
  handleAllergies,
  handleChange,
  handleOpenProgress,
  handleCloseProgress,
}) {
  const { query, allergies } = state;
  const dispatch = useDispatch();
  const mealRef = useRef();
  const currentUser = useSelector((state) => state.allMeal?.currentUser);

  // useEffect(() => {
  //   if (query === "") dispatch(removeMeal());
  // }, [query]);

  const data = Object.keys(allergies).filter((allergy) => allergies[allergy]);
  useEffect(() => {
    dispatch(setAllergy(data));
  }, [allergies]);

  const handleSearch = (e) => {
    if (query === "") {
      return;
    }
    e.preventDefault();
    dispatch(removeMeal());

    handleOpenProgress();

    mealCardsRef?.current.scrollIntoView({ behavior: "smooth" });
    dispatch(fetchSearchMeal(query));

    let timerId = setTimeout(() => {
      handleCloseProgress();
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  };
  return (
    <div className={`meal_planner`}>
      <Grid
        container
        className="meal_search"
        flexDirection={"column"}
        alignItems={{
          xs: "center",
          sm: "center",
          md: "center",
          lg: "center",
        }}
        ml={{ xs: 0, sm: 20, md: 10, lg: 20 }}
      >
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <TextField
            sx={{
              minWidth: { xs: "100%", sm: "100%", md: 400, lg: 400 },
            }}
            // onKeyUp={handleSearch}
            fullWidth
            name="query"
            className="meal_search_bar"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    className="meal_search_icon"
                    onClick={handleSearch}
                  />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <FormControl fullWidth component="fieldset" ref={mealRef}>
            <FormLabel component="legend">Allergies</FormLabel>

            <FormGroup
              className="meal_select_alleries"
              aria-label="position"
              row
            >
              <FormControlLabel
                name="Gluten-Free"
                control={
                  <Checkbox
                    checked={allergies["Gluten-Free"]}
                    onChange={handleAllergies}
                  />
                }
                label="Gluten-Free"
                labelPlacement="end"
              />
              <FormControlLabel
                name="Egg-Free"
                control={
                  <Checkbox
                    checked={allergies["Egg-Free"]}
                    onChange={handleAllergies}
                  />
                }
                label="Egg-Free"
                labelPlacement="end"
              />
              <FormControlLabel
                name="Peanut-Free"
                control={
                  <Checkbox
                    checked={allergies["Peanut-Free"]}
                    onChange={handleAllergies}
                  />
                }
                label="Peanut-Free"
                labelPlacement="end"
              />
              <FormControlLabel
                name="Dairy-Free"
                control={
                  <Checkbox
                    checked={allergies["Dairy-Free"]}
                    onChange={handleAllergies}
                  />
                }
                label="Dairy-Free"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default MealSearch;
