//TO RESTART BACKEND SERVER: "sudo service postgresql restart"

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
<<<<<<< HEAD
HEAD;
import { LoginOrRegister, Title, Nav, Footer } from "./components";
import { LoginOrRegister, Title, Nav, Profile } from "./components";

import { LoginOrRegister, AllProductViews, Cart } from "./components";
=======
import {
  LoginOrRegister,
  Title,
  Nav,
  Footer,
  Profile,
  AllProductViews,
  Cart,
} from "./components";
>>>>>>> c8924d0b4a3f357cee32f1e4c09bc30b1d045705
/*
//mV
import { LoginOrRegister, AllProductViews } from "./components";
*/

<<<<<<< HEAD
import { LoginOrRegister, Title, Nav, Footer } from "./components";
import { LoginOrRegister, Title, Nav, Profile } from "./components";

=======
>>>>>>> c8924d0b4a3f357cee32f1e4c09bc30b1d045705
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
