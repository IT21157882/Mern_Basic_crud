const mongoose = require("mongoose"); // Import your authMiddleware module

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
module.exports = EmployeeModel;
