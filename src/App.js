import { Route, Routes} from "react-router-dom";
import "./App.css";
import Mealplanner from "./components/Mealplanner";
import Login from "./components/login/Login";
import MealWeekPlan from "./components/MealWeekPlan";
import MealSearch from "./components/MealSearch";
import MealCards from "./components/MealCards";
import PDFfile from "./components/PDFfile";
import { useDispatch } from "react-redux";
import { unSetCurrentUser } from "./Store/action";
function App() {
 
  return (
    <div className="App">
       <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/mealplanner" exact element={<Mealplanner />}>
          <Route path="mealsearch" element={<MealSearch />} />
          <Route path="mealview" element={<MealCards />} />
        </Route>
        <Route path="/pdf" exact element={<PDFfile />} />
        <Route path="/weekplan" exact element={<MealWeekPlan />} />
      </Routes>
    </div>
  );
}

export default App;
