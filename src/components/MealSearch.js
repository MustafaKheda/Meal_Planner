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

function MealSearch({ mealCardsRef }) {
  const dispatch = useDispatch();
  const mealRef = useRef();
  const currentUser = useSelector((state) => state.allMeal?.currentUser);

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [allergies, setAllergies] = useState({
    "Dairy-Free": false,
    "Egg-Free": false,
    "Gluten-Free": false,
    "Peanut-Free": false,
  });
  useEffect(() => {
    if (query == "") dispatch(removeMeal());
  }, [query]);

  const data = Object.keys(allergies).filter((allergy) => allergies[allergy]);
  useEffect(() => {
    dispatch(setAllergy(data));
  }, [allergies]);

  const handleSearch = (e) => {
    dispatch(removeMeal());
    mealCardsRef?.current.scrollIntoView({ behavior: "smooth" });
    e.preventDefault();
    dispatch(fetchSearchMeal(query));
  };

  const handleAllergies = (e) => {
    e.preventDefault();
    setAllergies({
      ...allergies,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className={`meal_planner`}>
      <Grid container className="meal_search" spacing={2}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            // onKeyUp={handleSearch}
            fullWidth
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
            onChange={(event) => setQuery(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
