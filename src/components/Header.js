import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unSetCurrentUser } from "../Store/action";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(unSetCurrentUser());
    navigate("/");
  };
  return (
    <AppBar className="bar">
      <Toolbar className="nav_bar">
        <Typography variant="h6" noWrap>
          Meal Planner
        </Typography>
        <Typography className="nav_bar_button_group" component={"div"}>
          <Button
            className="nav_bar_button"
            onClick={() => {
              navigate("/mealplanner");
            }}
          >
            Search Meal
          </Button>
          <Button
            className="nav_bar_button"
            onClick={() => {
              navigate("/weekplan");
            }}
          >
            Weekly Plan
          </Button>
          <Button className="nav_bar_button" onClick={handleLogOut}>
            Log out
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
