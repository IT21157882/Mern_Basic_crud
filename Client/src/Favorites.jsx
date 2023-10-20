// Favorites.js (or your Favorites component)
import React, { useEffect, useState } from "react";
import axios from "axios";
import ResponsiveAppBar from "./assets/ResponsiveAppbar";

function Favorites() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteRecipe/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Fetch favorite recipes from the backend when the Favorites component mounts
    axios
      .get("http://localhost:3001/getFavorite")
      .then((response) => {
        setFavoriteRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving favorite recipes:", error);
      });
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div>
        <div className="container mt-4">
          <h1 className="text-center">Your Favorite Recipes</h1>
          <div className="row mt-4 custom-card">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe._id} className="col-md-2 mx-2">
                <div className="card mb-4">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.strMeal}</h5>
                    <div className="card-body">
                      <h5 className="card-title">{recipe.name}</h5>
                      <div
                        className="favorite-icon"
                        onClick={() => toggleFavorite(recipe.idMeal)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill={favoriteStatus[recipe.idMeal] ? "pink" : "red"}
                          class="bi bi-heart"
                          viewBox="0 0 16 16"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleDelete(recipe._id)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;
