import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";
import jwt_decode from "jwt-decode";

//for search bar
//import { useLocation, useHistory } from "react-router-dom";

export default function AllProductViews(props) {
  const [products, setProducts] = useState([]);
  const { cartItems, setCartItems } = props;
  const { isLoggedIn, token } = useAuth();
  if (token) {
    const userEmail = jwt_decode(token).email;
    // console.log(userEmail);
  }
  /*
  //search box???
  const { search } = useLocation();
  const history = useHistory();
  console.log("search", search);
  const searchParams = new URLSearchParams(search);
  console.log("searchParams", searchParams);
  const searchTerm = searchParams.get("searchTerm") || "";
  console.log("searchTerm", searchTerm);
*/

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

  useEffect(() => {
    //create as async fetch function
    async function fetchProducts() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products
        `,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //unpacked the response stream
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        //giving me a syntaxerror:unexpected token <in JSON at position 0
        console.log(error);
      }
    }

    // call it
    fetchProducts();
  }, []);

  return (
    <section className="allPlantsBlock">
      {products &&
        products.map((product) => {
          const { id, title, price, description, photoLinkHref } = product;
          return (
            <div className="editProductLink" key={id}>
              <img src={photoLinkHref} alt={product.title}></img>

              <h3>{title}</h3>
              <p>{price}</p>
              <p>{description}</p>
              <button onClick={() => addItemToCart(product)}>
                Add to Cart
              </button>
            </div>
          );
        })}
    </section>
  );
}
