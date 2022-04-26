//TO RESTART BACKEND SERVER: "sudo service postgresql restart"

import React, { useState } from "react";
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
  // const { products } = data; //this is supposed to be a list of our products I think
  // const { cartItems, setCartItems } = useState([]);

  // async function addItemToCart(product) {
  //   const selectedProduct = cartItems.find((item) => {
  //     //"return item so long as item ID equals product ID"
  //     return item.id === product.id;
  //   });

  //   if (selectedProduct) {
  //     setCartItems(
  //       cartItems.map((item) => {
  //         return item.id === product.id
  //           ? { ...selectedProduct, qty: selectedProduct.qty + 1 } //qty comes from product object's stuff
  //           : item;
  //       })
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, qty: 1 }]);
  //   }
  // }
  //Next Elle passed cartItems and addItemToCart into "Basket"/cart as props, then passed addItemToCart and products into "Main" as props
  //Elle's "Main" was a file inside of components folder; passed product info into products component; added that info to "add to cart" button on each product to create onClick functionality

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
