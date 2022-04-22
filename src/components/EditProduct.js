import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function EditProduct() {
  const history = useHistory();
  const { token } = useAuth();
  let { product_id } = useParams();
  console.log({ product_id });

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/products/${product_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      console.log({ data });

      history.push(`/products`);
    } catch (err) {
      console.error(err);
    }
  }

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
        <label>Active: </label>
        <input
          type="checkbox"
          name="isActive"
          value={form.isActive}
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