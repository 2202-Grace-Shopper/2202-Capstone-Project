import React from "react";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <div>
      {"Copyright © "}
      <Link color="inherit" to="/home">
        Plant-O-Licous
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
export default function Footer() {
  return (
    <>
      <div>This is our footer placeholder</div>
      <Copyright />
    </>
  );
}
