import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mealplanner from "./components/Mealplanner";
import Login from "./components/login/Login";
import MealWeekPlan from "./components/MealWeekPlan";
import MealSearch from "./components/MealSearch";
import MealCards from "./components/MealCards";
import Product from "./components/Product";
import PDFfile from "./components/PDFfile";
import { Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Typography>Hello World</Typography>
      <Routes>
        <Route path="/mealplanner" exact element={<Mealplanner />}>
          {/* <Route path="/" exact element={<Login />} /> */}
          <Route path="mealsearch" element={<MealSearch />} />
          <Route path="mealview" element={<MealCards />} />
        </Route>
        <Route path="/product/:name" exact element={<Product />} />
        <Route path="/pdf" element={<PDFfile />} />
        <Route path="/weekplan" exact element={<MealWeekPlan />} />
      </Routes>
    </div>
  );
}

export default App;
