import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./Users";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Recipes from "./recipes";
import Favorites from "./Favorites";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
