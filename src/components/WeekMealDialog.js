import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { mealTypes, weekdays } from "../Constant";

const WeekMealDialog = ({
  handleCloseForm,
  handleSubmit,
  handleFormData,
  userData,
  openForm,
}) => {
  return (
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
  );
};

export default WeekMealDialog;
