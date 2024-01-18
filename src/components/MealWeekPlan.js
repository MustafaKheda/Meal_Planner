import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { useRef, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import "./meal.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { unSetCurrentUser, deleteMeal, resetMeal } from "../Store/action";
import { useNavigate } from "react-router-dom";
import PDFfile from "./PDFfile";
import Header from "./Header";
import jsPDF from "jspdf";

function MealWeekPlan() {
  const weekMealRef = useRef(null);
  const pdfRef = useRef(null);
  const dayMeal = useSelector((state) => state?.allMeal?.dayMeal);
  const currentUser = useSelector((state) => state.allMeal.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(currentUser).length <= 0) {
      navigate("/");
    }
  }, [currentUser]);
  const [weekDates, setWeekDates] = useState([]);
  console.log(pdfRef);
  const value = false;
  useEffect(() => {
    const getCurrentWeekDates = () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      const dayOfWeek = today.getDay();

      // Calculate the start of the week (Monday)
      startOfWeek.setDate(
        today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
      );

      // Create an array of objects with each day of the week and its corresponding date
      const weekArray = Array.from({ length: 6 }, (_, index) => {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + index);
        return {
          weekDay: currentDay.toLocaleDateString("en-US", { weekday: "long" }),
          date: currentDay.toISOString().split("T")[0],
        };
      });

      return weekArray;
    };

    const weekArray = getCurrentWeekDates();
    setWeekDates(weekArray);
  }, []);
  //HookS
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  function mergeObjects(arr) {
    const mergedObj = {};
    arr.forEach((item) => {
      const {
        id,
        userId,
        weekDay,
        label,
        mealType,
        uriID,
        images,
        image,
        url,
      } = item;
      const key = userId + "_" + weekDay;

      if (!mergedObj[key]) {
        mergedObj[key] = { userId, weekDay, meals: [] };
      }

      mergedObj[key].meals.push({
        id,
        label,
        mealType,
        uriID,
        images,
        image,
        url,
      });
    });

    const mergedArr = Object.values(mergedObj).map((obj) => {
      const { userId, weekDay, meals } = obj;
      return { userId, weekDay, meals };
    });
    const daysOfWeekOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Sort the mergedArr based on the order of daysOfWeek
    mergedArr.sort((a, b) => {
      return (
        daysOfWeekOrder.indexOf(a.weekDay) - daysOfWeekOrder.indexOf(b.weekDay)
      );
    });
    return mergedArr;
  }
  const handleGeneratePdf = () => {
    console.log(pdfRef);
    const doc = new jsPDF("l", "px", "a4");

    doc.html(pdfRef.current, {
      html2canvas: {
        scale: 0.45, // Adjust the scaling factor as needed
      },
      async callback(doc) {
        await doc.save(
          `Meal Plan-${currentUser.username}-${
            new Date().toISOString().split("T")[0]
          }`
        );
      },
    });
  };
  const currentUserData = dayMeal.filter(
    (arr) => arr.userId === currentUser.id
  );
  const mergedArray = mergeObjects(currentUserData);
  // function count the number of item in the array for particular meal type
  const countNumberOfMeal = (meals, MealType) => {
    const mealCount = meals?.filter(
      (mealItem) => mealItem.mealType === MealType
    ).length;
    const numberOfMeal =
      mealCount > 1 ? `${mealCount}  Meals` : `${mealCount}  Meal`;
    return numberOfMeal;
  };

  //Function to show the meal item in list
  const showMeal = (meal, type) => {
    const { meals, weekDay } = meal;
    return meals.map(({ id, label, mealType, image, url }) => {
      return mealType === type ? (
        <div className="week_card_meal">
          <div className="week_card_icon">
            <ClearIcon onClick={() => dispatch(deleteMeal(id))} />
          </div>
          <img className="week_image" src={image} />
          <Typography className="week_card_label">{label}</Typography>
          <Button href={url} target="_blank">
            View Full recipe
          </Button>
          {/* <Typography className="week_card_label"></Typography> */}
        </div>
      ) : null;
    });
  };
  const handleFetchWeekDay = (weekDay) => {
    const day = weekDates.find((weekDate) => weekDate?.weekDay === weekDay);
    return (
      <>
        <Typography fontWeight={600} variant="h5">
          {day.weekDay}
        </Typography>
        <Typography color={"text.secondary"} variant="subtitle1">
          {day.date}
        </Typography>
      </>
    );
  };
  return Object.keys(currentUser).length > 0 ? (
    <>
      <Header />
      <div className="week_meal_container">
        <Grid container className="week_header_container">
          <Grid item className="week_header_heading">
            <Typography variant="h6" fontWeight={700} my={1}>
              Weekly Meal Plan For : {currentUser.username}
            </Typography>
          </Grid>
          <Grid item className="week_header_button_group">
            <Button
              className="button_all"
              onClick={() => dispatch(resetMeal(currentUser.id))}
            >
              Reset Weekly Plan
            </Button>
            <Button className="button_all" onClick={handleGeneratePdf} endIcon>
              Download
              <DownloadIcon />
            </Button>
          </Grid>
        </Grid>
        <div ref={weekMealRef}>
          {mergedArray?.map((meal) => {
            const { meals } = meal;
            const BreakFast = "BreakFast";
            const Lunch = "Lunch";
            const Dinner = "Dinner";
            return (
              <Paper className="week_paper">
                <Grid
                  container
                  className="week_container"
                  key={meal.id}
                  gridColumn={4}
                >
                  {/* Grid For Day Type */}
                  <Grid item xs={2} sm={2} md={2} lg={2}>
                    <Card className="week_header">
                      <CardHeader
                        title={
                          weekDates.length > 0 &&
                          handleFetchWeekDay(meal.weekDay)
                        }
                        className="week_card_header"
                      ></CardHeader>
                    </Card>
                  </Grid>
                  {/* Grid Meal Type */}
                  <Grid item xs={10} sm={10} md={10} lg={10}>
                    <Card className="week_card">
                      <Grid container spacing={2}>
                        <Grid
                          item
                          className="week_card_grid"
                          xs={6}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <CardContent className="week_meal_type">
                            <Typography fontWeight={700} variant="h6">
                              Breakfast
                            </Typography>
                            <Divider />
                            <Typography
                              variant="subtitle2"
                              fontWeight={540}
                              color={"gray"}
                            >
                              {countNumberOfMeal(meals, BreakFast)}
                            </Typography>
                            {showMeal(meal, BreakFast)}
                          </CardContent>
                        </Grid>
                        <Grid
                          item
                          className="week_card_grid"
                          xs={6}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <CardContent className="week_meal_type">
                            <Typography fontWeight={700} variant="h6">
                              Lunch
                            </Typography>
                            <Divider />
                            <Typography
                              variant="subtitle2"
                              fontWeight={540}
                              color={"gray"}
                            >
                              {countNumberOfMeal(meals, Lunch)}
                            </Typography>
                            {showMeal(meal, Lunch)}
                          </CardContent>
                        </Grid>
                        <Grid
                          item
                          className="week_card_grid"
                          xs={6}
                          sm={6}
                          md={4}
                          lg={4}
                        >
                          <CardContent className="week_meal_type">
                            <Typography fontWeight={700} variant="h6">
                              Dinner
                            </Typography>
                            <Divider />
                            <Typography
                              variant="subtitle2"
                              fontWeight={540}
                              color={"gray"}
                            >
                              {countNumberOfMeal(meals, Dinner)}
                            </Typography>
                            {showMeal(meal, Dinner)}
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </div>
        <div style={{ visibility: "hidden", overflow: "hidden", height: 0 }}>
          {
            <PDFfile
              ref={pdfRef}
              mealsData={dayMeal}
              currentUser={currentUser}
            />
          }
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            The weekly plan is saved as a PDF
          </Alert>
        </Snackbar>
      </div>
    </>
  ) : null;
}

export default MealWeekPlan;
