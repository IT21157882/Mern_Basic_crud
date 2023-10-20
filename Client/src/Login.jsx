import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "./assets/ResponsiveAppBar";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [alertVisible, setAlertVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Login successfull") {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate("/home");
          }, 3000);
        } else {
          setErrorAlert(true);
          setTimeout(() => {
            setErrorAlert(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-25 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center display-5">Login</h1>
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
            <div className="form-group text-center">
              <button className="btn btn-success text-center mt-3">
                Login
              </button>
            </div>
          </form>
          <div className="form-group text-center mt-2">
            <p>
              You haven't account, <Link to="/Signup/">Sign up here</Link>.
            </p>
          </div>
        </div>
      </div>
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have successfully logged in!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={errorAlert} onHide={() => setErrorAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Fail</Modal.Title>
        </Modal.Header>
        <Modal.Body>If you do not have an account, please register.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setErrorAlert(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
