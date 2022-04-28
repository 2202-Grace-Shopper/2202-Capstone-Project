import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
//import { response } from "express";
//import { process_params } from "express/lib/router";

//orders table will need a function to get orders with status is IN CART & connected w/ specific user
//every time a user logs in, we want to grab the order(IN CART) that is associated with the user
//we can keep the orderID on state on the APP
//so now we have orderID that can be attached to the cart
//on submit, we can post/patch the cart items to orders & products_in_order
//on submit will also need to create a new fresh order(IN CART) for the user

export default function Cart(props) {
  const { cartItems, setCartItems } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { token } = useAuth();
  let email;
  let cartItemsToRender = []; //indeterminate array length

  //checks if user is a guest or is logged in
  if (token) {
    email = jwt_decode(token).email;
  } else {
    email = "guest@mail.com";
  }

  //groups up all items in cart based on who's logged in
  //reminder that the cart will reset/"refresh" whenever the site does! test this funcationality by logging in, adding something to the cart, logging out, and then checking cart; it should become empty.
  if (cartItems) {
    // console.log("made it into the if statement for cart check");
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].userEmail === email) {
        cartItemsToRender[i] = cartItems[i];
      }
    }
  }

  //for console logs that need to get called after other functions and if-statements run
  useEffect(() => {
    // console.log("This is cart state", cartItems);
    console.log("Items trying to be rendered:", cartItemsToRender);
    // console.log("find the userEmail:", cartItems[0].userEmail);  //outputs "luckbringer@gmail.com", but if I keep it on, it yells at me for it being undefined
  }, [cartItems, cartItemsToRender]);

  //increases quantity in cart
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

    // console.log("Another!", cartItems);
  };

  //decreases quantity in cart
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

    // console.log("Removed one", cartItems);
  };

  //makes a new price total
  useEffect(() => {
    let itemPriceTotal = 0;

    cartItems.map((item) => {
      return (itemPriceTotal += item.product.price * item.qty);
    });

    setTotalPrice(itemPriceTotal);
  }, [cartItems]);

  //puts everything in the cart state into the products_in_order table attached to the specific order ID
  async function handleSubmit(e) {
    e.preventDefault();

    // const {productId:id,eachPrice:price,eachQuantity:qty} = cartItemsToRender[[...]]
    //two options:
    //  1) for every product in cartItemsToRender, make a fetch call to post a new row into the products_in_order table; push out that product when you finish a successful fetch so that the cart can be empty by the end of this handleSubmit function
    //  2) somehow, put all products in cartItemsToRender into fetch at once...?
    //either way, need to solve how to get OrderId. it could be created when a user is registered - maybe a new column in user table?? it needs to increase when "complete purchase" is selected and it needs to stay at the new value when the user logs back in later

    try {
      //This is to POST into products_in_order table
      //uses db function "addCartToProductsInOrderTable(4 things)" and api call "productsInOrderRouter.post("/:orderId"...)"
      const response = await fetch(
        `http://localhost:4000/api/products_in_order/:orderId
        `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(orderId, productId, eachPrice, eachQuantity),
        }
      );

      //This is to PATCH the current order(IN CART) that is attached to user & will set the status to be PENDING
      // const response2 = await fetch(
      //   `http://localhost:4000/api/orders
      //   `,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      //This will POST a new EMPTY order(IN CART) & attach to current user
      // const response3 = await fetch(
      //   `http://localhost:4000/api/orders
      //   `,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      const items = response.json();
      console.log(items);

      //if you made it all the way through, show pop-up message congratulating the user (and yourself!)
      window.alert(
        "Your order has been placed! Thank you for choosing Plant-O-Licious for all your plant needs. :)"
      );
      useHistory.push("/products");
    } catch (err) {
      throw err;
    }
  }

  return (
    <div>
      {email === "guest@mail.com" ? (
        <h1>Guest's Cart</h1>
      ) : (
        <h1>{email}'s Cart</h1>
      )}
      <div>{!cartItemsToRender.length && <div>No plant buddies yet!</div>}</div>
      <div>
        {cartItemsToRender &&
          cartItemsToRender.map(({ product, qty }) => {
            return (
              <ul key={product.id}>
                <li>
                  <h3>
                    {product.title} x {qty}
                  </h3>
                  <h4>${product.price}</h4>
                  {/* <img
                    className="productPicture"
                    src={product.photoLinkHref}
                    alt={product.title}
                  /> */}
                  <button onClick={() => addItemToCart(product)}>+</button>
                  <button onClick={() => deleteItemFromCart(product)}>-</button>
                </li>
              </ul>
            );
          })}
      </div>
      <h3>Total Price: ${totalPrice}</h3>
      <button onSubmit={(e) => handleSubmit(e)}>Complete Purchase</button>
    </div>
  );
}
