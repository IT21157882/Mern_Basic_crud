import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState("Chicken"); // Default category

  useEffect(() => {
    // Fetch recipes when the component mounts or the category changes
    axios
      .get(`http://localhost:3000/recipes/${category}`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, [category]);

  return (
    <div>
      <h2>Recipes</h2>
      <label>Select a category: </label>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="Chicken">Chicken</option>
        <option value="Beef">Beef</option>
        console.log(e.target.value );
        {/* Add more category options here */}
      </select>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.idMeal}>{recipe.strMeal}</li>
        ))}
      </ul>
    </div>
  );
}
export default Recipes;
