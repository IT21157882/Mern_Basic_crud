import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./assets/ResponsiveAppbar";
import axios from "axios";
import "./App.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleAddToFavorites = (recipe) => {
    axios
      .post("http://localhost:3001/addFavorite", recipe)
      .then((response) => {
        // Handle successful save
        console.log("Recipe saved to favorites");
      })
      .catch((error) => {
        console.error("Error saving recipe to favorites:", error);
      });
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
  };


  // Function to fetch categories from the external API
  useEffect(() => {
    // Fetch categories from an external API
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Fetch recipes based on the selected category
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        )
        .then((response) => {
          setRecipes(response.data.meals);
          const initialStatus = {};
          response.data.meals.forEach((recipe) => {
            initialStatus[recipe.idMeal] = false;
          });
          setFavoriteStatus(initialStatus);
        })
        .catch((error) => {
          console.error("Error fetching recipes: ", error);
        });
    }
  }, [selectedCategory]);

  const toggleFavorite = (recipeId) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [recipeId]: !prevStatus[recipeId],
    }));
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="container mt-4">
        <h1 className="text-center">Recipe Categories</h1>
        <div className="row mt-4">
          <div className="col-12">
            <div className="d-flex flex-wrap ">
              {categories.map((category) => (
                <button
                  key={category.strCategory}
                  className="btn btn-outline-primary mx-2 my-2 rounded-pill"
                  onClick={() => setSelectedCategory(category.strCategory)}
                  
                >
                  {category.strCategory}
                </button>
              ))}
            </div>
          </div>
        </div>

        {recipes.length > 0 && (
          <div className="row mt-4 custom-card">
            {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="col-md-4">
                <div className="card mb-4">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="card-img-top"
                    onClick={() => openRecipeModal(recipe)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.strMeal}</h5>
                    <div
                      className="favorite-icon"
                      onClick={() => toggleFavorite(recipe.idMeal)}
                      
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill={favoriteStatus[recipe.idMeal] ? "red" : "pink"}
                        class="bi bi-heart"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAddToFavorites(recipe)}
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    </div>
                    <p className="card-text">{recipe.strInstructions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
         {/* Recipe Modal */}
         {selectedRecipe && (
          <div className="modal" style={selectedRecipe ? { display: "block" } : { display: "none" }}>
          <div className="modal-content">
            <span className="close" onClick={closeRecipeModal}>&times;</span>
            <h2>{selectedRecipe && selectedRecipe.strMeal}</h2>
            <img src={selectedRecipe && selectedRecipe.strMealThumb} alt={selectedRecipe && selectedRecipe.strMeal} />
            <p>{selectedRecipe && selectedRecipe.strInstructions}</p>
          </div>
        </div>
        )}
      </div>
    </>
  );
}

export default Home;
