import React, { useState } from "react";
import { useAuth } from "../custom-hooks";
import { useHistory } from "react-router-dom";

export default function LoginOrRegister() {
  const history = useHistory();

  const { updateAuthStatus } = useAuth();

  const currentURL = window.location.href;
  const loginOrRegister = currentURL.slice(22);
  // console.log(loginOrRegister);

  const [form, setForm] = useState({ email: "", password: "" });

  function checkEmail(email) {
    const correctFormat = /\S+@\S+\.\S+/;
    return correctFormat.test(email); //returns true or false
  }

  async function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    //ensure that people are entering in valid emails
    if (checkEmail(form.email)) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${loginOrRegister}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        const { user, token } = await response.json();

        if (user) {
          localStorage.ft_token = token;
          updateAuthStatus();

          //redirect based on if user is an admin or not
          if (user.isAdmin === true) {
            console.log(
              `Success! Welcome admin ${user.email} with bearer token ${token}.`
            );
            history.push("./adminprofile");
          } else if (user.isAdmin === false) {
            console.log(
              `Success! Welcome ${user.email} with bearer token ${token}.`
            );
            history.push("./profile");
          }
        } else {
          if (user) {
            localStorage.ft_token = token;
            updateAuthStatus();
            console.log(
              `Success! Welcome ${user.email} with bearer token ${token}.`
            );
            history.push("/profile");
          } else {
            throw new Error(`error with user action, ${loginOrRegister}`);
          }
        }
      } catch (error) {
        window.alert(
          "Oops, something went wrong! Please ensure you've entered a valid username and/or password combination."
        );
        throw error;
      }
    } else {
      window.alert("Please enter a valid email address.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="userInfoInputs">
      <div className="emailUsernameInput">
        <label style={{ marginRight: 5 + "px" }}>
          {loginOrRegister === "register" && "Choose "} Email Username:
        </label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="passwordInput">
        <label style={{ marginRight: 5 + "px" }}>
          {loginOrRegister === "register" && "Choose "} Password:
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value={loginOrRegister === "register" ? "Register" : "Login"}
        className="loginRegButton"
      />
    </form>
  );
}
