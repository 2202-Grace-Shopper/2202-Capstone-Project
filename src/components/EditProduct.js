import React, { useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../custom-hooks";

export default function EditProduct() {
  const history = useHistory();
  const { token } = useAuth();
  const { search } = useLocation();

  const searchObject = new URLSearchParams(search);
  const title = searchObject.get("title");
  const price = searchObject.get("price");
  const description = searchObject.get("description");
  const photoLinkHref = searchObject.get("photoLinkHref");
  const id = searchObject.get("id");
  console.log({ id });

  const [form, setForm] = useState({
    title: title,
    price: price,
    description: description,
    photoLinkHref: photoLinkHref,
  });

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
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PATCH",
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
      <input type="submit" value="Edit product" />
      <button name="clear" onClick={() => history.push(`/products`)}>
        Cancel
      </button>
    </form>
  );
}
