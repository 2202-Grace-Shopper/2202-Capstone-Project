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
  const { isLoggedIn, isAdminAC } = useAuth();

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
            <Route path="/home" component={Home} />

            {/* admin-only routes - will be made unusable to other users */}
            {isAdminAC && (
              <>
                <Route path="/adminprofile" component={AdminProfile} />
                {/* <Route path="/editproduct" component={EditProduct} /> */}
                {/* <Route path="/addnewproduct" component={AddNewProduct} /> */}
              </>
            )}
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
