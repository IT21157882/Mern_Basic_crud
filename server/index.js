const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/Users');
const UserModel = require('./models/Users');
const EmployeeModel = require('./models/Employee');

const app = express();
app.use(cors());
app.use(express.json());

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
                res.jsom("Password didn't match")
            }
        }else{
            res.json("User not registered")
        }
    })
});




app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
});




app.listen(3001, () => {
    console.log('Server is running..');
});
