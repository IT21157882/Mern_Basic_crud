import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import ResponsiveAppBar from "./assets/ResponsiveAppBar";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorAlert(true);
    } else {
      axios
        .post("http://localhost:3001/register", { name, email, password })
        .then((result) => {
          console.log(result);
          window.location.href = "/login";
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center">Sign Up</h1>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success">Register</button>
            </div>
          </form>
          <h3 className="text-center">you Already Have Account</h3>
          <div className="form-group">
            <Link to="/Login/" className="btn btn-success">
              Login
            </Link>
          </div>
        </div>
      </div>

      <Modal show={errorAlert} onHide={() => setErrorAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Password Mismatch</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password and Confirm Password do not match.</Modal.Body>
      </Modal>
    </>
  );
}

export default Signup;
