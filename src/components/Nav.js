import React from "react";
import { useAuth } from "../custom-hooks";
import { NavLink } from "react-router-dom";

const loggedInLinks = [
  { id: 1, to: "/home", name: "Home" },
  { id: 2, to: "/products", name: "Plants" },
  { id: 3, to: "/cart", name: "Cart" },
  { id: 4, to: "/myprofile", name: "Profile" },
];
const loggedOutLinks = [
  { id: 1, to: "/home", name: "Home" },
  { id: 2, to: "/products", name: "Plants" },
  { id: 3, to: "/cart", name: "Cart" },
  { id: 4, to: "/login", name: "Login" },
  { id: 5, to: "/register", name: "Register" },
];

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const navLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav>
      {navLinks.map(({ id, to, name }) => (
        <NavLink key={id} to={to} className="navLink">
          {name}
        </NavLink>
      ))}
      {isLoggedIn && (
        <i className="logout" onClick={logout}>
          Logout
        </i>
      )}
    </nav>
  );
}
