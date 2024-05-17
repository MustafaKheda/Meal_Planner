import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import { Image } from "mui-image";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Card, Snackbar } from "@mui/material";
import WeekMealDialog from "./WeekMealDialog";
import { setDayMeal } from "../Store/action";
import uuid from "react-uuid";

function Product() {
  const product = useSelector((store) => store.allMeal.product);

  const {
    image,
    label,
    source,
    calories,
    mealType,
    cuisineType,
    healthLabels,
    dishType,
    uri,
    images,
    url,
    totalNutrients,
  } = product;
  const dispatch = useDispatch();
  const allMeal = useSelector((store) => store.allMeal);
  const { userMeal, currentUser } = allMeal;

  const [openSnackBar, setBar] = useState({
    open: false,
    type: "error",
  });

  // useEffect(() => {
  //   dispatch(removeLinks());
  // }, []);

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
  const handleClose = () => {
    setBar(false);
  };
  const handleOpenForm = ({ e, label, uriID, images, image, url }) => {
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
      const filterDayWise = userMeal?.some(
        (meal) =>
          meal.userId === userData.userId &&
          meal.weekDay === userData.weekDay &&
          meal.mealType === userData.mealType &&
          meal.label === userData.label
      );
      if (filterDayWise) {
        return setBar({
          open: true,
          type: "success",
        });
      }
      dispatch(setDayMeal(userData));
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
  console.log(Object.keys(totalNutrients));
  const NutritionArray = [
    "ENERC_KCAL",
    "FAT",
    "SUGAR",
    "PROCNT",
    "FIBTG",
    "VITA_RAE",
    "VITC",
    "VITB12",
    "VITD",
  ];
  const NutritionalCard = ({ label, quantity, unit }) => {
    return (
      <Card
        sx={{
          minWidth: "110px",
          height: "80px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight={700}>{label}</Typography>
        <Typography>
          {Math.floor(quantity)} {unit}
        </Typography>
      </Card>
    );
  };
  return (
    <>
      <Header />
      <Box mt={10} px={5} mb={5}>
        <Grid container justifyContent={"space-between"} pt={3}>
          <Grid item container justifyContent={"center"} xs={12} md={6}>
            <Image src={image} width={550} fit="cover" />
          </Grid>
          <Grid item xs={12} md={6} pt={{ xs: 2, md: 0 }} px={{ md: 2 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              textTransform={"capitalize"}
            >
              {label}
            </Typography>
            <Typography
              variant="caption"
              color={"text.secondary"}
              fontStyle={"italic"}
            >
              Recipe by {source}
            </Typography>
            <Box mt={2}>
              <Divider />
              <Grid container mt={1} spacing={2}>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  flexDirection={"column"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"{center}"}
                >
                  <Typography variant="h5" fontWeight={500}>
                    {Math.round(calories)}
                  </Typography>
                  <Typography variant="subtitle1">Calories</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  flexDirection={"column"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    textTransform={"capitalize"}
                  >
                    {mealType[0]}
                  </Typography>
                  <Typography variant="subtitle1">Meal Type</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  flexDirection={"column"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    textTransform={"capitalize"}
                  >
                    {cuisineType}
                  </Typography>
                  <Typography variant="subtitle1">Cuisine Type</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container columnGap={2} rowGap={1} mt={3}>
                {healthLabels.map((label, index) => {
                  return (
                    index < 11 && (
                      <Grid item>
                        <Typography key={index}>{label}</Typography>
                      </Grid>
                    )
                  );
                })}
              </Grid>
            </Box>
            <Grid container pt={3} pb={1}>
              {dishType?.map((dish, index) => (
                <Grid item>
                  <Chip
                    label={
                      <Typography fontWeight={600} textTransform={"capitalize"}>
                        {dish}
                      </Typography>
                    }
                    variant="outlined"
                  ></Chip>
                </Grid>
              ))}
            </Grid>

            <Grid container pt={3} pb={1} columnSpacing={4} rowGap={1}>
              {NutritionArray.map((key) => (
                <Grid item xs={4} sm="auto">
                  <NutritionalCard
                    key={key}
                    label={totalNutrients[key].label}
                    quantity={totalNutrients[key].quantity}
                    unit={totalNutrients[key].unit}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid>
              <Button
                className="button_all"
                onClick={(e) =>
                  handleOpenForm({
                    e,
                    label,
                    uri,
                    images,
                    image,
                    url,
                  })
                }
              >
                Add to Planner
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <WeekMealDialog
        handleCloseForm={handleCloseForm}
        handleFormData={handleFormData}
        handleSubmit={handleSubmit}
        userData={userData}
        openForm={openForm}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackBar.open}
        onClose={handleClose}
        message={
          openSnackBar.type === "success"
            ? "This meal already selected for same day and same time"
            : openSnackBar.type === "error"
            ? "Please enter the meal type and week days"
            : "Error"
        }
      />
    </>
  );
}

export default Product;
