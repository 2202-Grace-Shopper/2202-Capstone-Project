import React from "react";
import { useState, useEffect } from "react";
//import { useAuth } from "../custom-hooks";
//import { response } from "express";
//import { process_params } from "express/lib/router";
import { useHistory } from "react-router-dom";

//the code below is a template!!!
/**
 * 1. figure out the component for the cart
 * 2. figure out how to connect it to the allproductviews and singproductview
 *
 * Figure out the controller:
 * 1. get all cart items
 * 2. add product items to cart
 * 3. empty cart
 */
export default function Cart(props) {
  const [carts, setCarts] = useState([]);
  const [payload, setPayloader] = useState([]);
  const [hasError, setError] = useState([]);
  const history = useHistory();

  //fetchCart
  async function fetchCart(props) {
    const response = await fetchCart(
      `http://localhost:4000/api/cart`,
      response
        .json()
        .then((response) => {
          console.log(response.data.items);
          setCarts(response.data.items);
          setPayloader(response.data);
        })
        .catch((error) => {
          setError(error);
        })
    );
  }

  //emptycart
  async function emptyCart() {
    try {
      const response = await fetch(`http://localhost:4000/api/cart`, {
        method: "DELETE",
      });
      await response.json();
      fetchCart();
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <div style={{ margin: "10rem" }}>
      <h1 style={{ backgroundColor: "#B0E0E6" }}>My Cart</h1>
      <hr></hr>
      <div className="mycarttable"></div>
      <div style={{ fontSize: "40x" }}>Your Cart is Currently Empty!</div>)
    </div>
  );
}
