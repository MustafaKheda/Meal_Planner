import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import WebWorker from "./WebWorker";
import Worker from "./Worker";

const testFile = forwardRef(({ mealsData,currentUser }, ref) => {

  const [sortedMeals,setSortedMeals] = useState([]);
  // const dayMeal = useSelector((state) => state?.allMeal?.dayMeal);
  // const currentUser = useSelector((state) => state.allMeal.currentUser);
  
 
    
  useEffect(() => {
    // Create a new web worker
    const worker = new WebWorker(Worker)// Replace YourWorker with the actual name of your web worker file

    // Function to sort meals and set the state
    const sortAndSetMeals = () => {
      worker.postMessage({ mealsData });

      // Set up the event listener for the worker's response
      worker.onmessage = (e) => {
        setSortedMeals(e.data);
      };
    };

    // Call the sorting function
    sortAndSetMeals();

    // Cleanup: Terminate the web worker when the component unmounts
    return () => {
      worker.terminate();
    };
  }, []);
  
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
            {sortedMeals.map((meal, index) => {
         
              const { weekDay, mealType, label, url } = meal;
              return (
                <TableRow key={meal?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{weekDay}</TableCell>
                  <TableCell>{mealType}</TableCell>
                  <TableCell>{label}</TableCell>
                  <TableCell color="blue">{url}</TableCell>
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
