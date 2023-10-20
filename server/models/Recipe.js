const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  strMealThumb: String,
  strInstructions: String,
  strMeal: String,
  idMeal: String,
});

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;
