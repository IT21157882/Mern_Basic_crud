import React from "react";
import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateUser() {

    const { id } = useParams();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [age, setAge] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)
    })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updateUser/`+id, {name, email, age})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
    <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={Update}>
            <h1 className='text-center'>update User</h1> 
            <div className='form-group'>
                <label>Name</label>
                <input type='text' className='form-control' 
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input type='email' className='form-control' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Age</label>
                <input type='number' className='form-control' 
                value={age}
                onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div className='form-group'>
                <button className='btn btn-success'>Update</button>
            </div>
        </form>

        
    </div> 
    </div>

    
    )}
export default UpdateUser;