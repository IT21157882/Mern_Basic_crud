import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css' 
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Signup from './Signup'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Users/>} ></Route>
          <Route path='/create' element={<CreateUser/>} ></Route>
          <Route path='/update/:id' element={<UpdateUser/>} ></Route>
          <Route path='/signup' element={<Signup/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          </Routes>
      </BrowserRouter>  

    </div>
  )
}

export default App
