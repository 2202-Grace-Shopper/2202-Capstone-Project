//TO RESTART BACKEND SERVER: "sudo service postgresql restart"

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import { LoginOrRegister, Title, Nav } from "./components";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Title />

      <Nav />

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
            test tag
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
