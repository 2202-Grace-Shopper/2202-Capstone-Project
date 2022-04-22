import React, { useState, useEffect } from "react";
import { useAuth } from "../custom-hooks";

//for search bar
//import { useLocation, useHistory } from "react-router-dom";

export default function AllProductViews() {
  const [products, setProducts] = useState([]);
  const { isLoggedIn, token } = useAuth();
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
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

  //addToCart feature
  //this will help us fetch the backend to list all the product
  //and store variable
  async function addToCart(id, quantity) {
    try {
      const response = await fetch(`http://localhost:4000/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id, quantity: quantity }),
        headers: {},
      });
      let data = await response.json();
      alert("Item Added to Cart ");
      console.log(data);
    } catch (error) {
      alert("Something Went Wrong");
      console.error(error);
    }
  }

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

  //this will be use for the add cart
  //handleChange

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  //this will be use for add cart
  //handleSubmit

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const newProduct = await response.json();

      setProducts([...products, newProduct]);
      setForm({
        name: "",
        description: "",
      });
    } catch (error) {
      throw error;
    }
  }

  /*****
   * 1. redo the return to keep it simple
   * 2. will work on css after
   * 3. having issues with product not showing up even after the curl!!
   * 4.  I need to get update data??
   */
  //return

  return (
    <section>
      {products &&
        products.map((product) => {
          const { id, name, price, description, photoLinkHref } = product;

          return (

            <div className="productCard" key={id}>

            <div className="editProductLink" key={id}>
              <img src={photoLinkHref} alt="The plant"></img>

              <h3>{name}</h3>
              <p>{price}</p>
              <p>{description}</p>
              <button onClick={(e) => addToCart(product.id, 1)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      {isLoggedIn && (
        <aside>
          <form className="newProductForm" onSubmit={handleSubmit}>
            <h3>Create New product</h3>
            <div className="post-card">
              <label>Name:</label>
              <input
                className="input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="productDescription">
              <label>Description:</label>
              <input
                className="input"
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <input
              className="submitBtn"
              type="submit"
              value="Submit New Product"
            />
          </form>
        </aside>
      )}
    </section>
  );
}
