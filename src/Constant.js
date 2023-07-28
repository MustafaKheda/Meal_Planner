export const API_ID = "100223fc";
export const API_key = "1946243b6f4f9c6b1773e119ccaf977b";
export const priorityValue = [
  "Select Priority",
  "Urgent",
  "High",
  "Normal",
  "Low",
];
export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const mealTypes = ["BreakFast", "Lunch", "Dinner"];
export const statusValue = [
  "Select Status",
  "Not started",
  "Pending",
  "In progress",
  "Completed",
];
export const TableHeader = [
  "S.No.",
  "Title",
  "Discription",
  "Start Date",
  "Due Date",
  "Priority",
  "Status",
  "Actions",
];
export const filterKey = ["priority", "status"];
const recipes = [
  {
    id: 1,
    name: "Oatmeal with Fruits",
    ingredients: ["oats", "milk", "fruits"],
    instructions: "1. Cook oats in milk. 2. Add fruits and mix well.",
    dietaryPreferences: ["vegetarian", "gluten-free"],
    allergies: [],
  },
  {
    id: 2,
    name: "Quinoa Salad",
    ingredients: ["quinoa", "vegetables", "dressing"],
    instructions:
      "1. Cook quinoa. 2. Chop vegetables. 3. Mix quinoa, vegetables, and dressing.",
    dietaryPreferences: ["vegan", "gluten-free"],
    allergies: ["nuts"],
  },
  {
    id: 3,
    name: "Grilled Chicken with Roasted Vegetables",
    ingredients: ["chicken", "vegetables", "seasonings"],
    instructions:
      "1. Marinate chicken. 2. Grill chicken. 3. Roast vegetables. 4. Serve together.",
    dietaryPreferences: ["gluten-free"],
    allergies: ["dairy"],
  },
  // Add more recipes as needed
];
export const cuisineCard = [
  {
    id: 1,
    title: "Desserts",
    query: "Desserts",
    type: "dishType",
  },
  {
    id: 2,
    title: "Sandwiches",
    query: "Sandwiches",
    type: "dishType",
  },
  {
    id: 3,
    title: "Side Dish",
    query: "Side dish",
    type: "dishType",
  },
  {
    id: 4,
    title: "Starter",
    query: "Starter",
    type: "dishType",
  },
  {
    id: 5,
    title: "Pizza",
    query: "Pizza",
    type: "search",
  },
  {
    id: 6,
    title: "Main Course",
    query: "Main course",
    type: "dishType",
  },
  {
    id: 7,
    title: "Main Course",
    query: "Main course",
    type: "dishType",
  },
  {
    id: 8,
    title: "Indian",
    query: "Indian",
    type: "cuisine",
  },
  {
    id: 9,
    title: "Italian",
    query: "Italian",
    type: "cuisine",
  },
  {
    id: 10,
    title: "Chinese",
    query: "Chinese",
    type: "cuisine",
  },
];
