import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"


function Login(){

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", {email, password})
        .then(result => {console.log(result)
            if(result.data === "Login successfull"){
                navigate('/create')    
            }
                    
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center'>Login </h1> 
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control' 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' className='form-control' 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-success'>Register</button>
                </div>
                </form>    
                          
        </div>
        </div>
    );
}

export default Login;


