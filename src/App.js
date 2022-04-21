//TO RESTART BACKEND SERVER: "sudo service postgresql restart"
//Note from Lauren: I created this file because I used it in this manner for my Fitness Tracker and my Strangers' Things projects. However, I don't know how it compares to the src/components/App.js file that came with this forked code. Currently both this file and that file are doing the "export default App" thing, which is probably not gonna work.

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { LoginOrRegister } from "./components";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      {/* <Title /> */}

      {/* <Nav /> */}

      <Switch>
        {/* routes for if you're not logged in */}
        {!isLoggedIn && (
          <>
            {/* <Route path="/products" component={Products} /> */}

            {/* <Route path="/productdetail" component={ProductDetail} /> */}

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

            {/* <Route path="/myprofile" component={MyProfile} /> */}

            {/* admin-only routes */}
            {/* <Route path="/editproduct" component={EditProduct} /> */}

            {/* <Route path="/createproduct" component={CreateProduct} /> */}

            {/* <Route path="/allusers" component={AllUsers} /> */}
          </>
        )}

        {/* catches errors */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
