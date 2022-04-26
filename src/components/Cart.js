import React from "react";
import { useState, useEffect } from "react";
//import { useAuth } from "../custom-hooks";
//import { response } from "express";
//import { process_params } from "express/lib/router";
// import { useHistory } from "react-router-dom";

export default function Cart(props) {
  const { cartItems, setCartItems } = props;

  //we want the return to map out the CART DB to show what products have been added
  //set them up to a list & have a (-) button so they may delete or lower qty of item
  return (
    <div>
      <h1>Welcome to your cart!</h1>
      <ul>AREA FOR CART LIST :D</ul>
      <h3>Total Price: $0</h3>
    </div>
  );
}
