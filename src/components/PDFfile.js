import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

const testFile = forwardRef(({ mealsData }, ref) => {
  const dayMeal = useSelector((state) => state?.allMeal?.dayMeal);
  const currentUser = useSelector((state) => state.allMeal.currentUser);

  const sortedMeal = () => {
    const sortMeal = dayMeal.filter((meal) => meal.userId === currentUser?.id);
    const daysOfWeekOrder = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    sortMeal.sort((a, b) => {
      return (
        daysOfWeekOrder.indexOf(a.weekDay) - daysOfWeekOrder.indexOf(b.weekDay)
      );
    });
    return sortMeal;
  };
  return (
    <div ref={ref}>
      <Typography variant="h5" textAlign={"center"} p={3}>
        Meal Plan For {currentUser.username}
      </Typography>
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table sx={{ width: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Week Day</TableCell>
              <TableCell>Meal Type</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMeal().map((meal, index) => {
              const { weekDay, mealType, label, url } = meal;
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{weekDay}</TableCell>
                  <TableCell>{mealType}</TableCell>
                  <TableCell>{label}</TableCell>
                  <TableCell>{url}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default testFile;
