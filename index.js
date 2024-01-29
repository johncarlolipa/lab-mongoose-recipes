const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");

const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose.set("strictQuery", false);


// Connect to the database
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

    // Insert multiple recipes into the database
    return Recipe.insertMany(data);
  })
  .then((insertedRecipes) => {

    insertedRecipes.forEach((recipe) => {
      console.log(`Recipe inserted: ${recipe.title}`);
    });

    // Update the 'Rigatoni alla Genovese' recipe duration to 100
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(`Recipe updated: ${updatedRecipe.title}`);

    // Remove the 'Carrot Cake' recipe from the database
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log(`Recipe removed: Carrot Cake`);

    // Close the database connection
    mongoose.connection.close(() => {
      console.log("Database connection closed.");
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });
