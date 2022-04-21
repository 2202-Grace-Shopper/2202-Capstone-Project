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

    try {
      const response = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          "Content-Type": "appication/json",
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
  };

  return <div>hello, i'm adding a new product</div>;
}
