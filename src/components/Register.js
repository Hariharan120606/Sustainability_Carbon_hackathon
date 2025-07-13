import React, { useState } from "react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { register } from "../features/userActions";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const msg = useSelector((state) => state.user.alertmsg);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
  if (isLoggedIn) {
    navigate("/login"); // or any other page
  }
}, [isLoggedIn, navigate]);

  const [ credentials, setCredentials ] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: props.role
    
  })

  const handleChange = (e)=>{
     setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log(JSON.stringify(credentials, null, 2));
    dispatch(register(credentials));
    setCredentials({ firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    role: props.role})


  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // full viewport height
          marginTop : "20px"
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            width: "60vw",
            padding: "15px",
            paddingTop: "10px",
            color: "white",
            marginBlockStart: "2px",
            marginLeft: "60px",
            marginTop: "0px"
          }}
        >
          <form class="row g-3 needs-validation" novalidate>
            <div class="col-md-6">
              <label for="validationCustom01" class="form-label">
                First name
              </label>
              <input
                type="text"
                class="form-control"
                id="fname"
                name="firstName"
                value={credentials.firstName}
                onChange={handleChange}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>
            <div class="col-md-6">
              <label for="validationCustom02" class="form-label">
                Last name
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom02"
                name="lastName"
                value={credentials.lastName}
                onChange={handleChange}
                required
              />
              <div class="valid-feedback">Looks good!</div>
            </div>

            <div class="col-md-6">
              <label for="validationCustomUsername" class="form-label">
                Username
              </label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend">
                  @
                </span>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                />
                <div class="invalid-feedback">Please choose a username.</div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="exampleFormControlInput1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name = "email" onChange={handleChange} value={credentials.email}/>
            </div>
            <div class="col-md-6">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <div class="col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck"
                  required
                />
                <label class="form-check-label" for="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="button" onClick={handleSubmit}>
                Submit form
              </button>
            </div>
            {msg && <h6 style={{ color: msg.includes("Success") ? "green" : "red" }}>{msg}</h6>}
          </form>
        </div>
      </div>
    </div>
  );
}
