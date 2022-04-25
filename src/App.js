//TO RESTART BACKEND SERVER: "sudo service postgresql restart"

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  LoginOrRegister,
  Title,
  Nav,
  Footer,
  Profile,
  AllProductViews,
  SingleProductView,
  // Cart,
  AdminProfile,
  Home,
} from "./components";

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
            <Route exact path="/products" component={AllProductViews} />
            <Route path="/products/:productId" component={SingleProductView} />

            {/* <Route path="/productdetail" component={ProductDetail} /> */}

            {/* <Route path="/cart" component={Cart} /> */}
            <Route path="/login" component={LoginOrRegister} />
            <Route path="/register" component={LoginOrRegister} />
            <Route path="/home" component={Home} />
          </>
        )}

        {/* routes for if you are logged in */}
        {isLoggedIn && (
          <>
            <Route exact path="/products" component={AllProductViews} />
            <Route path="/products/:productId" component={SingleProductView} />
            {/* <Route path="/cart" component={Cart} /> */}
            <Route path="/profile" component={Profile} />

            {/* admin-only routes - will be made unusable to other users */}
            <Route path="/adminprofile" component={AdminProfile} />
            {/* <Route path="/editproduct" component={EditProduct} /> */}
            {/* <Route path="/createproduct" component={CreateProduct} /> */}
            {/* <Route path="/allusers" component={AllUsers} /> */}
            <Route path="/home" component={Home} />
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
