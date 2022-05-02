import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";
import jwt_decode from "jwt-decode";

export default function SingleProduct(props) {
  const [product, setProduct] = useState();
  const { cartItems, setCartItems } = props;
  const history = useHistory();
  let { productId } = useParams();
  const { token, isAdminAC } = useAuth();

  const addItemToCart = async ([product]) => {
    const getToken = localStorage.getItem("ft_token");
    let userEmail;
    if (getToken) {
      userEmail = jwt_decode(getToken).email;
    } else {
      userEmail = "guest@mail.com";
    }
    const targetProduct = await cartItems.find((item) => {
      return item.product.id === product.id;
    });

    if (targetProduct) {
      const mapStuff = cartItems.map((item) => {
        return item.product.id === product.id
          ? { ...targetProduct, qty: targetProduct.qty + 1 }
          : item;
      });
      setCartItems(mapStuff);
    } else {
      setCartItems([...cartItems, { product, qty: 1, userEmail }]);
    }
  };

  async function handleDelete(productId) {
    let answer = false;

    answer = window.confirm(
      "Are you sure you want to delete this happy plant? This action cannot be undone."
    );

    if (answer) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${productId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();
        console.log({ data });

        history.push(`/products`);
      } catch (err) {
        throw err;
      }
    }
  }

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
                {/* <aside>In Stock Quantity: {inStockQuantity}</aside> */}
                <h5>{category}</h5>
                <p>{description}</p>
                <button
                  className="buttonAddToCartFromAllProducts"
                  onClick={() => addItemToCart(product)}
                >
                  Add to Cart
                </button>
                {isAdminAC && (
                  <>
                    <Link
                      to={`/editproduct/?title=${title}&price=${price}&description=${description}&photoLinkHref=${photoLinkHref}&inStockQuantity=${inStockQuantity}&id=${id}`}
                      className="buttonAddToCartFromAllProducts"
                    >
                      Edit Product
                    </Link>
                    <button
                      className="buttonAddToCartFromAllProducts"
                      onClick={() => handleDelete(id)}
                    >
                      Delete Product
                    </button>
                  </>
                )}
              </section>
            );
          }
        )}
    </section>
  );
}
