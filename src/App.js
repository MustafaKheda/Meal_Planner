import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mealplanner from "./components/Mealplanner";
import Login from "./components/login/Login";
import MealWeekPlan from "./components/MealWeekPlan";
import MealSearch from "./components/MealSearch";
import MealCards from "./components/MealCards";
import PDFfile from "./components/PDFfile";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import VirtulList from "./VirtulList";
import { DataContext } from "./Store/DataContext";

function App() {
  // const type = "beers"; // users beers creditcard
  // const baseUrl = new URL(`https://random-data-api.com/api/v2/${type}`);
  // const params = new URLSearchParams();
  // params.set("size", 100);
  // // params.set("response_type", "json");
  // baseUrl.search = params;
  // const [api, setApi] = useState([]);
  // const [res, setRes] = useState(null);
  // const fetchInfo = async () => {
  //   return fetch(baseUrl)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       } else {
  //         throw Error("Error");
  //       }
  //     })
  //     .then((data) => setApi((api) => [...api, ...data]));
  // };
  // const axiosInfo = async () => {
  //   return await axios
  //     .get(baseUrl)
  //     .then((res) => setApi((api) => [...api, ...res.data]));
  // };

  // const fetchData = async () => {
  //   let i = 0;
  //   while (i < 20) {
  //     await axiosInfo();
  //     i++;
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // console.log(api);
  return (
    <div className="App">
      {/* <DataContext.Provider value={api}>
        <VirtulList />
      </DataContext.Provider> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/mealplanner" exact element={<Mealplanner />}>
          <Route path="mealsearch" element={<MealSearch />} />
          <Route path="mealview" element={<MealCards />} />
        </Route>
        <Route path="/product" exact element={<Product />} />
        <Route path="/pdf" exact element={<PDFfile />} />
        <Route path="/weekplan" exact element={<MealWeekPlan />} />
      </Routes>
    </div>
  );
}

export default App;
