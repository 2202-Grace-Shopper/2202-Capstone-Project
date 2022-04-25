import React from "react";
import { Link } from "react-router-dom";

function Copyright() {
  return (
    <div>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" className="copyrightLink">
        <u>Plant-O-Licous</u>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
export default function Footer() {
  return (
    <aside className="footerText">
      {/* <div>This is our footer placeholder</div> */}
      <Copyright />
    </aside>
  );
}
