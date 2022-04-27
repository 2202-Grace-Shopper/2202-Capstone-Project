import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function ProductForm() {
  const history = useHistory();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    price: 0,
    description: "",
    category: "",
    inStockQuantity: 0,
    photoLinkHref: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      console.log({ data });

      history.push(`/products`);
    } catch (err) {
      console.log("Error happened here!");
      console.error(err);
    }
  };

  // return <div>hello, i'm adding a new product</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Plant title: </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description: </label>
        <textarea
          style={{ borderRadius: "5px" }}
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Stock Quantity: </label>
        <input
          type="number"
          name="inStockQuantity"
          value={form.inStockQuantity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Photo Link: </label>
        <input
          type="url"
          name="photoLinkHref"
          value={form.photoLinkHref}
          onChange={handleChange}
        />
      </div>
      <input type="submit" value="Add product" />
      <button name="clear" onClick={() => history.push(`/products`)}>
        Cancel
      </button>
    </form>
  );
}
