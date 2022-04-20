import React, { useState, useEffect } from "react";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch("localhost4000", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const product = await response.json();
        setProduct(product);
      } catch (err) {
        console.error(err);
      }
    };

    getProduct();
  }, []);

  return (
    <div>
      {product.map(
        ({
          id,
          title,
          price,
          description,
          category,
          inStockQuantity,
          photoLinkHref,
        }) => {
          return (
            <section key={id}>
              <img>{photoLinkHref}</img>
              <h2>{title}</h2>
              <span>{price}</span>
              <aside>{inStockQuantity}</aside>
              <h5>{category}</h5>
              <p>{description}</p>
            </section>
          );
        }
      )}
    </div>
  );
}
