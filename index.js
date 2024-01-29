const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set("strictQuery", false);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    const newRecipe = {
      title: "Your New Recipe Title",
      level: "Easy Peasy",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      cuisine: "Your Cuisine",
      dishType: "main_course",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      duration: 30,
      creator: "Your Name",
    };

    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(`Recipe created with title: ${createdRecipe.title}`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
