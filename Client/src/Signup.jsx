import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import ResponsiveAppBar from "./assets/ResponsiveAppBar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorAlert(true);
    } else {
      // Add additional validation logic here if needed

      axios
        .post("http://localhost:3001/register", {
          name,
          email,
          phone,
          password,
        })
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
                required // This field is required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required // This field is required
              />
            </div>
            <div className="form-group">
              <label>Phone No.</label>
              <input
                type="tel"
                className="form-control"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required // This field is required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required // This field is required
              />
            </div>
            <div className="form-group mt-3">
              <button className="btn btn-success">Register</button>
            </div>
          </form>
          <div className="form-group text-center mt-2">
            <p>
              You have an account, <Link to="/login">Login here</Link>.
            </p>
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
