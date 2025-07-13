import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { login } from "../features/userActions";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const msg = useSelector((state) => state.user.alertmsg);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const [credentials, setCredentials] = useState({
      login: "",
      password: ""
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(credentials));
    }
    const handleChange = (e)=>{
       setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
    if (isLoggedIn) {
      navigate("/login/about");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // full viewport height
        }}
      >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: "40vw",
          padding: "15px",
          paddingTop: "10px",
          color: "white",
          marginBlockStart: "2px",
          marginLeft : "60px",
          marginTop : "0px"
        }}
      >
        <form class="row g-3 needs-validation" novalidate>

          <div class="col-md-12">
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
                name = "login"
                value = {credentials.login}
                onChange={handleChange}
                required
              />
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-md-12">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              name = "password"
              value = {credentials.password}
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
            <button class="btn btn-primary" type="submit" onClick={handleSubmit}>
              Submit form
            </button>
          </div>
          {msg && <h6 style={{ color: "red" }}>{msg}</h6>}
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
