import React from "react";
import { useState, useEffect } from "react";
//import { useAuth } from "../custom-hooks";
//import { response } from "express";
//import { process_params } from "express/lib/router";
// import { useHistory } from "react-router-dom";

export default function Cart(props) {
  const { cartItems, setCartItems } = props;

  const addItemToCart = (product) => {
    const targetProduct = cartItems.find((item) => {
      return item.product.id === product.id;
    });

    if (targetProduct) {
      setCartItems(
        cartItems.map((item) => {
          return item.product.id === product.id
            ? { ...targetProduct, qty: targetProduct.qty + 1 }
            : item;
        })
      );
    } else {
      setCartItems([...cartItems, { product, qty: 1 }]);
    }
  };

  //doesnt work as planned but sorta? it will lower the qty # & will disappear when you hit -1 but the itemIndex & everything dont make sense
  const deleteItemFromCart = (product) => {
    const targetProduct = cartItems.find((item) => {
      return item.product.id === product.id;
    });

    const itemIndex = cartItems.findIndex((item) => {
      return;
    });
    console.log({ itemIndex });

    if (targetProduct.qty === 0) {
      cartItems.splice(itemIndex, 1);
      setCartItems([...cartItems]);
    } else if (targetProduct) {
      setCartItems(
        cartItems.map((item) => {
          return item.product.id === product.id
            ? { ...targetProduct, qty: targetProduct.qty - 1 }
            : item;
        })
      );
    }
  };

  //we want the return to map out the CART DB to show what products have been added
  //set them up to a list & have a (-) button so they may delete or lower qty of item
  return (
    <div>
      <h1>Welcome to your cart!</h1>
      <div>{!cartItems.length && <div>No plants in cart yet!</div>}</div>
      <div>
        {cartItems &&
          cartItems.map(({ product, qty }) => {
            return (
              <ul>
                <li>
                  <h3>
                    {product.title} x {qty}
                  </h3>
                  <h4>${product.price}</h4>
                  <img
                    className="productPicture"
                    src={product.photoLinkHref}
                    alt={product.title}
                  />
                  <button onClick={() => addItemToCart(product)}>+</button>
                  <button onClick={() => deleteItemFromCart(product)}>-</button>
                </li>
              </ul>
            );
          })}
      </div>

      <h3>Total Price: $0</h3>
    </div>
  );
}
