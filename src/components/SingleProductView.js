import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SingleProduct(props) {
  const [product, setProduct] = useState();
  const { cartItems, setCartItems } = props;
  let { productId } = useParams();

  const addItemToCart = async ([product]) => {
    const targetProduct = await cartItems.find((item) => {
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
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${productId}`,
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
    <section
      className="allPlantsBlock"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {product &&
        product.map(
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
              <section className="eachPlantBlock" key={id}>
                <h2>{title}</h2>
                <span>Price: ${price}</span>
                <img
                  className="plantPicForSale"
                  src={photoLinkHref}
                  alt={product.title}
                />
                <aside>In Stock Quantity: {inStockQuantity}</aside>
                <h5>{category}</h5>
                <p>{description}</p>
                <button
                  className="buttonAddToCartFromAllProducts"
                  onClick={() => addItemToCart(product)}
                >
                  Add to Cart
                </button>
              </section>
            );
          }
        )}
    </section>
  );
}
