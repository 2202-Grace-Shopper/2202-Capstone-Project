import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
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
    <section>
      <h2>Welcome to Plant-O-Licous</h2>
      <img
        src="https://purewows3.imgix.net/images/articles/2021_05/Best_Succulents_You_Can_Grow_Snake_Plant.jpg?auto=format,compress&cs=strip"
        alt="Snake Plant"
      />
      <Link to="/products">Check Out Our Current Stock</Link>
      <div>
        <h3>Featured Plants</h3>
      </div>
    </section>
  );
}
