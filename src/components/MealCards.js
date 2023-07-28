import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  MenuItem,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./meal.css";
import {
  Cake,
  Restaurant,
  Fastfood,
  LocalCafe,
  FastfoodOutlined,
  EmojiFoodBeverage,
} from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { cuisineCard, mealTypes, weekdays } from "../Constant";
import {
  fetchCuisineMeal,
  fetchDishTypeMeal,
  fetchSearchMeal,
  removeMeal,
  setDayMeal,
} from "../Store/action";
import { Link, useNavigate } from "react-router-dom";
import { all } from "axios";
import uuid from "react-uuid";

// const CuisineCard = ({ title, icon }) => {
//   return (
//     <Grid item xs={1} sm={1} md={1} lg={1}>
//       <Card className="cuisine_card">
//         <CardContent>
//           <div className="cuisine_card_icon">{icon}</div>
//           <Typography fontSize={12} variant="h6">
//             {title}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// };

const MealCards = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timerRef = React.useRef();
  const data = useSelector((state) => state.allMeal?.mealList);
  const userMeal = useSelector((state) => state.allMeal?.dayMeal);
  const currentUser = useSelector((state) => state.allMeal?.currentUser);
  const alleregy = useSelector((state) => state.allMeal?.alleregy);

  // useEffect(() => {
  //   if (Object.keys(currentUser).length <= 0) {
  //     navigate("/login");
  //   }
  // }, [currentUser]);
  //Use States
  const [apiData, setApiData] = useState([]);
  //state show the ingredient list in the dialog box
  const [ingredient, setIngredient] = useState({
    dishName: "",
    list: [],
  });
  const [openInList, setOpenInList] = useState(false);
  //
  const [openSnackBar, setBar] = useState({
    open: false,
    type: "error",
  });
  const [userData, setUserData] = useState({
    id: "",
    userId: "",
    label: "",
    weekDay: "",
    mealType: "",
    uriID: "",
    images: [],
    image: "",
  });
  const [openForm, setOpenForm] = useState(false);
  const [openProgress, setProgress] = useState("idle");
  const [dialogKey, setDialogKey] = useState(0);
  //
  const handleCloseForm = () => {
    setOpenForm(false);
    setUserData({
      id: "",
      userId: "",
      label: "",
      weekDay: "",
      mealType: "",
      uriID: "",
      images: [],
      image: "",
      url: "",
    });
  };
  const handleCloseInList = () => {
    setOpenInList(false);
    setBar(false);
  };

  const handleOpenInList = (e, label, ingredientList) => {
    e.preventDefault();
    setOpenInList(true);
    setIngredient({
      dishName: label,
      list: ingredientList,
    });
  };

  const handleOpenForm = (e, label, uriID, images, image, url) => {
    e.preventDefault();
    setOpenForm(true);
    setUserData({
      ...userData,
      id: uuid(),
      userId: currentUser.id,
      label: label,
      uriID: uriID,
      images: images,
      image: image,
      url: url,
    });
  };

  const handleFormData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  // Dialog box submit handle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.weekDay !== "" && userData.mealType !== "") {
      setOpenForm(false);
      // to check if the meal is already selected by user for same time and same day
      const filterDayWise = userMeal.filter(
        (meal) =>
          meal.userId === userData.userId &&
          meal.weekDay === userData.weekDay &&
          meal.mealType === userData.mealType &&
          meal.label === userData.label
      );
      if (filterDayWise.length <= 0) {
        dispatch(setDayMeal(userData));
      } else {
        setBar({
          open: true,
          type: "success",
        });
      }
      setUserData({
        id: "",
        userId: "",
        label: "",
        weekDay: "",
        mealType: "",
        uriID: "",
        images: [],
        image: "",
        url: "",
      });
    } else {
      setBar({
        open: true,
        type: "error",
      });
    }
  };

  useEffect(() => {
    setApiData(data);
    if (data === "") setApiData([]);
  }, [data]);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const handleSearchMeal = (query, type) => {
    dispatch(removeMeal());
    setProgress("progress");

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (type === "search") {
      dispatch(fetchSearchMeal(query));
    }
    if (type === "cuisine") {
      dispatch(fetchCuisineMeal(query));
    }
    if (type === "dishType") {
      dispatch(fetchDishTypeMeal(query));
    }
    timerRef.current = window.setTimeout(() => {
      setProgress("success");
    }, 2000);
  };

  const handlefilterData = () => {
    const filtered = apiData.filter(({ recipe }) =>
      alleregy?.every((alleregy) => recipe.healthLabels.includes(alleregy))
    );
    return filtered;
  };

  const handleTransition = (props) => <Slide direction="up" {...props} />;

  return (
    <div className="meal_cards">
      <Typography
        className="meal_card_header"
        textTransform={"uppercase"}
        fontWeight={"700"}
        variant="h5"
        component="div"
      >
        Category Type
        <Button className="button_all" onClick={() => navigate("/weekplan")}>
          View Weekly Meal Plan
        </Button>
      </Typography>
      <Grid container spacing={2} className="categories_card">
        {cuisineCard &&
          cuisineCard.map((item, index) => {
            const { title, query, type } = item;
            return (
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <Card
                  key={item.id}
                  className="cuisine_card"
                  onClick={() => handleSearchMeal(query, type)}
                >
                  <CardContent>
                    <div className="cuisine_card_icon">
                      {index % 2 == 0 ? <LocalCafe /> : <Fastfood />}
                    </div>
                    <Typography fontSize={12} variant="h6">
                      {title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <div className="foods_card" ref={ref}>
        {openProgress === "progress" ? (
          <Fade
            className="Circularbar"
            in={openProgress === "progress"}
            style={{
              transitionDelay: openProgress === "progress" ? "500ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress size={100} />
          </Fade>
        ) : (
          <Grid container spacing={2}>
            {handlefilterData()?.map(({ recipe }, index) => {
              const {
                label,
                ingredientLines,
                image,
                images,
                uri,
                mealType,
                dishType,
                totalTime,
                url,
              } = recipe;

              return (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Card className="food_card" key={index}>
                    <CardActionArea>
                      <CardMedia
                        className="card_image"
                        component="img"
                        image={images?.REGULAR?.url}
                        alt={label}
                      />
                      <CardContent className="card_content">
                        <Typography
                          gutterBottom
                          variant="body2"
                          fontWeight={"600"}
                          component="div"
                        >
                          {label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Kcal:{" "}
                          {Math.floor(
                            recipe.totalNutrients.ENERC_KCAL.quantity
                          ) / recipe.yield}{" "}
                          | {dishType}
                        </Typography>
                        <Typography
                          onClick={(e) =>
                            handleOpenInList(e, label, ingredientLines)
                          }
                          color="primary"
                        >
                          Ingredient list
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className="card_actions">
                      <Typography alignItems="normal">
                        <AccessTimeIcon fontSize="small" /> {totalTime} mins
                      </Typography>
                      <Button
                        className="button_all"
                        onClick={(e) =>
                          handleOpenForm(e, label, uri, images, image, url)
                        }
                      >
                        Add to Planner
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
      {/* // Ingredient list */}
      <Dialog
        key={dialogKey}
        open={openInList}
        // TransitionComponent={handleTransition}
        onClose={handleCloseInList}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="h5" fontWeight={600}>
            {ingredient.dishName}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {ingredient?.list.map((item) => (
              <Typography lineHeight={2} component="li">
                {item}
              </Typography>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInList} className="button_all">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Form Dialog Box */}
      <Dialog open={openForm} onClose={handleCloseForm} scroll="body">
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Please select the meal type and the day of the week.
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            select
            color="success"
            className="dialog_input"
            label="Select Meal Type"
            value={userData.mealType}
            name="mealType"
            onChange={handleFormData}
          >
            {mealTypes.map((type) => (
              <MenuItem value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            color="success"
            label="Select Week Day"
            className="dialog_input"
            value={userData.weekDay}
            name="weekDay"
            onChange={handleFormData}
          >
            {weekdays.map((day) => (
              <MenuItem value={day}>{day}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button className="button_all" onClick={handleSubmit}>
            Submit
          </Button>
          <Button className="button_all" onClick={handleCloseForm}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for validation of the dailog box */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar.open}
        onClose={handleCloseInList}
        message={
          openSnackBar.type === "success"
            ? "This meal already selected for same day and same time"
            : openSnackBar.type === "error"
            ? "Please enter the meal type and week days"
            : "Error"
        }
      />
    </div>
  );
});

export default MealCards;
