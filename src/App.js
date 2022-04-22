//TO RESTART BACKEND SERVER: "sudo service postgresql restart"

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
HEAD;
import { LoginOrRegister, Title, Nav, Footer } from "./components";
import { LoginOrRegister, Title, Nav, Profile } from "./components";

import { LoginOrRegister, AllProductViews, Cart } from "./components";
/*
//mV
import { LoginOrRegister, AllProductViews } from "./components";
*/

import { LoginOrRegister, Title, Nav, Footer } from "./components";
import { LoginOrRegister, Title, Nav, Profile } from "./components";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      {/* <Title /> */}
      {/* <Nav /> */}
      <Title />

      <Nav />

      <Switch>
        {/* routes for if you're not logged in */}
        {!isLoggedIn && (
          <>
            <Route path="/AllProductViews" component={AllProductViews} />
            {/* <Route path="/products" component={Products} /> */}
            {/* <Route path="/productdetail" component={ProductDetail} /> */}

            <Route path="/Cart" component={Cart} />

            {/* <Route path="/cart" component={Cart} /> */}

            <Route path="/login" component={LoginOrRegister} />
            <Route path="/register" component={LoginOrRegister} />
          </>
        )}

        {/* routes for if you are logged in */}
        {isLoggedIn && (
          <>
            {/* <Route path="/products" component={Products} /> */}
            {/* <Route path="/productdetail" component={ProductDetail} /> */}
            {/* <Route path="/cart" component={Cart} /> */}
            <Route path="/profile" component={Profile} />
          </>
        )}

        {/* admin-only routes ---> add isAdmin when "useAdmin" or whatever custom-hook is built! */}
        {isLoggedIn && (
          <>
            {/* <Route path="/editproduct" component={EditProduct} /> */}
            {/* <Route path="/createproduct" component={CreateProduct} /> */}
            {/* <Route path="/allusers" component={AllUsers} /> */}
          </>
        )}

        {/* catches errors */}
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
