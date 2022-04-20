import React from "react";
import ReactDom from "react-dom";
import "./styles/Signup.css";
import { useSignUp } from "../custom-hooks/useSignUp";

function Signup() {
  const { h1, error, handleSubmit, handleChange } = useSignUp();
  return (
    <div className="signup_container">
      {error && <div className="error_message">{JSON.stringify(error)}</div>}
      <form className="signup_form" onSubmit={handleSubmit}>
        <h1 className="signup_header">{h1}</h1>
        <input
          className="signup_form_input"
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        ></input>
        <input
          className="signup_form_input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <input
          className="signup_form_input"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        ></input>
        <input
          className="signup_form_input"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        ></input>
        <input
          className="signup_form_input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          className="signup_form_input"
          type="text"
          name="phoneNumber"
          placeholder="Mobile"
          onChange={handleChange}
        ></input>
        <button className="signup_form_input" type="submit" class="signUpBtn">
          Sign Up
        </button>
        <a className="member_link" href="http://localhost:3000/login">
          {" "}
          Already A Member? Login{" "}
        </a>
      </form>
    </div>
  );
}

export default Signup;
