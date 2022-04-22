import React from "react";
//import React, { useState, useEffect } from "react";
//import { useAuth } from "../custom-hooks";

//import "./styles/Cart.css";
//import React, { useState, useEffect } from "react";

//the code below is a template!!!
/**
 * 1. figure out the component for the cart
 * 2. figure out how to connect it to the allproductviews and singproductview
 */
export default function Cart() {
  /*
  //comment out for now until i figure how it works
   const {orders, setOrders} = useState();
   const {token} =useAuth();
   const [total, setTotal] = useState();

   const fetchOrder = async () =>{
     try{
       if (token){
         const receiveOrder = await getCart();
         const allProducts = receiveOrder.products
         let priceArr = []
       }
     }
   }

   useEffect(()=>{
    

   }, [total]);

   return <h1>My Cart <h1>
   {incomingOrders ? incomingOrders.map ((product) => {
     return ()
   })}

  */
  return (
    <div style={{ margin: "10rem" }}>
      <h1 style={{ backgroundColor: "#B0E0E6" }}>My Cart</h1>
      <hr></hr>
      <div style={{ fontSize: "40x" }}>Your Cart is Currently Empty!</div>)
    </div>
  );
}
