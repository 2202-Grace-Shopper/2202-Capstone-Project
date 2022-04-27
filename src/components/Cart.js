import React from "react";
import { useState, useEffect } from "react";
//import { useAuth } from "../custom-hooks";
//import { response } from "express";
//import { process_params } from "express/lib/router";
// import { useHistory } from "react-router-dom";

export default function Cart(props) {
  const { cartItems, setCartItems } = props;
  const [totalPrice, setTotalPrice] = useState(0);

  //orders table will need a function to get orders with status is IN CART & connected w/ specific user
  //every time a user logs in, we want to grab the order(IN CART) that is associated with the user
  //we can keep the orderID on state on the APP
  //so now we have orderID that can be attached to the cart
  //on submit, we can post/patch the cart items to orders & products_in_order
  //on submit will also need to create a new fresh order(IN CART) for the user

  useEffect(() => {
    async function fetchOrder() {
      try {
        const resonse = await fetch(
          `http://localhost:4000/api/orders
        `,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        throw err;
      }
    }
  });

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

  const deleteItemFromCart = (product) => {
    const targetProduct = cartItems.find((item) => {
      return item.product.id === product.id;
    });

    if (targetProduct) {
      targetProduct.qty -= 1;
      setCartItems([...cartItems]);

      if (targetProduct.qty === 0) {
        setCartItems(cartItems.filter((item) => item.qty !== 0));
      }
    }
  };

  useEffect(() => {
    let itemPriceTotal = 0;

    cartItems.map((item) => {
      return (itemPriceTotal += item.product.price * item.qty);
    });

    setTotalPrice(itemPriceTotal);
  }, [cartItems]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //This is to POST into products in order
      const response = await fetch(
        `http://localhost:4000/api/products_in_order
        `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      //This is to PATCH the current order(IN CART) that is attached to user & will set the status to be PENDING
      const response2 = await fetch(
        `http://localhost:4000/api/orders
        `,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //This will POST a new EMPTY order & attach to current user
      const response3 = await fetch(
        `http://localhost:4000/api/orders
        `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      throw err;
    }
  }

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

      <h3>Total Price: ${totalPrice}</h3>

      <button onSubmit={(e) => handleSubmit(e)}>Purchase</button>
    </div>
  );
}
