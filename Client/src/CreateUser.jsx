import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser", {name, email, age})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
        
    }
    return (
    
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Submit}>
            <h1 className='text-center'>Create User</h1> 
            <div className='form-group'>
                <label>Name</label>
                <input type='text' className='form-control' 
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='form-group'>
                <  label>Age</label>
                <input type='number' className='form-control' 
                onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-success'>Submit</button>
            </div>
        </form>

        
    </div> 
    </div>
    )}
export default CreateUser;