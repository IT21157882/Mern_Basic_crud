const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const User = require('./models/Users');
const UserModel = require('./models/Users');
const EmployeeModel = require('./models/Employee');
const recipe = require('./models/Recipe');
const authMiddleware = require('./auth/authMiddleware');
const Recipe = require('./models/Recipe');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://kdanahgkd:kushan.1@cluster0.1qvcaed.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.get("/", (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age})
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
        .then(users => res.json(users))
        .catch(err => res.json(err))
});


app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

//Login & Register Part

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password ){
                res.json("Login successfull")
            }else{
                res.json("Password didn't match")
            }
        }else{
            res.json("User not registered")
        }
    })
});

app.get('/protected', authMiddleware.authenticateUser, (req, res) => {
    res.json({ msg: 'This is a protected route' });
  });



app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
});

  app.get('/recipes/:category', async (req, res) => {
    try {
        // console.log("called");
        const category = req.params.category;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        const response = await axios.get(url);
        const recipes = response.data.meals;
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Favorite Part
app.post('/addFavorite', (req, res) => {
    const recipeData = req.body;
    const recipe = new Recipe(recipeData);
  
    recipe.save()
      .then((savedRecipe) => {
        res.json(savedRecipe);
      })
      .catch((error) => {
        console.error('Error saving recipe to MongoDB:', error);
        res.status(500).json({ error: 'Error saving recipe to MongoDB' });
      });
  });
  
  // GET endpoint to retrieve favorite recipes
  app.get('/getFavorite', (req, res) => {
    Recipe.find({})
      .then((recipes) => {
        res.json(recipes);
      })
      .catch((error) => {
        console.error('Error retrieving favorite recipes:', error);
        res.status(500).json({ error: 'Error retrieving favorite recipes' });
      });
  });

  app.delete('/deleteRecipe/:id', (req, res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete({_id: id})
        .then(recipes => res.json(recipes))
        .catch(err => res.json(err))
});

const favorites = [];




  



app.listen(3001, () => {
    console.log('Server is running..');
});
