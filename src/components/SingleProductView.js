import React, { useState, useEffect } from "react";

export default function SingleProduct() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/products/:productId",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
              <h2>{title}</h2>
              <span>{price}</span>
              <img class="productPicture" src={photoLinkHref} alt="" />
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
