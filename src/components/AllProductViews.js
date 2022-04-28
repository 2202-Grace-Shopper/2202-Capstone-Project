import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../custom-hooks";
import jwt_decode from "jwt-decode";

//for search bar
//import { useLocation, useHistory } from "react-router-dom";

export default function AllProductViews(props) {
  const [products, setProducts] = useState([]);
  const { cartItems, setCartItems } = props;
  const { isLoggedIn, token, isAdminAC } = useAuth();

  if (token) {
    const userEmail = jwt_decode(token).email;
    // console.log(userEmail);
  }
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

  //This will run after everything else has run, guaranteeing that the console.log actually catches what happens to cartItems
  useEffect(() => {
    console.log("This is cart state", cartItems);
  }, [cartItems]);

  const addItemToCart = async (product) => {
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

  // function handleChange(e) {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // }
  //this will be use for add cart
  //handleSubmit

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/products`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(form),
  //     });
  //     const newProduct = await response.json();

  //     setProducts([...products, newProduct]);
  //     setForm({
  //       name: "",
  //       description: "",
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  const toTopButton = document.getElementById("toTopButton");
  window.onscroll = function () {
    scrollFunction();
  };

  async function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      toTopButton.style.display = "block";
    } else {
      toTopButton.style.display = "none";
    }
  }

  async function toTopFunction() {
    document.body.scrollTop = 0; //for Safari
    document.documentElement.scrollTop = 0; //for Chrome, Firefox, IE, Opera
  }

  return (
    <>
      {isAdminAC && (
        <Link to="/addnewproduct" className="linkToAddingProduct">
          Add New Product
        </Link>
        // <aside>
        //   <form className="newProductForm" onSubmit={handleSubmit}>
        //     <h3>Create New product</h3>
        //     <div className="post-card">
        //       <label>Name:</label>
        //       <input
        //         className="input"
        //         type="text"
        //         name="name"
        //         value={form.name}
        //         onChange={handleChange}
        //       />
        //     </div>
        //     <div className="productDescription">
        //       <label>Description:</label>
        //       <input
        //         className="input"
        //         type="text"
        //         name="description"
        //         value={form.description}
        //         onChange={handleChange}
        //       />
        //     </div>
        //     <input
        //       className="submitBtn"
        //       type="submit"
        //       value="Submit New Product"
        //     />
        //   </form>
        // </aside>
      )}
      <section className="allPlantsBlock">
        {products &&
          products.map((product) => {
            const { id, title, price, description, photoLinkHref } = product;

            return (
              // <div className="editProductLink" key={id} <= Lauren changed the class name to better reflect what it is, but I'm leaving this note here in case something breaks down the line based on the name of this component>
              // Lauren was thinking that you can get to a product's info page by clicking anywhere on the "eachPlantBlock component" except for the add to cart button. With testing this may prove possible, or we'll just put a dedicated button.
              <div className="eachPlantBlock" key={id}>
                <Link to={"/products/" + id}>
                  <img
                    src={photoLinkHref}
                    alt="The plant"
                    className="plantPicForSale"
                  ></img>

                  <h3 className="eachPlantTitle">{title}</h3>
                  <p>${price}</p>
                  <p>{description}</p>
                </Link>
                <button
                  onClick={() => addItemToCart(product)}
                  className="buttonAddToCartFromAllProducts"
                >
                  Add to Cart
                </button>

                {isAdminAC && (
                  <Link
                    to={`/editproduct/?title=${title}&price=${price}&description=${description}&photoLinkHref=${photoLinkHref}&id=${id}`}
                    className="linkToEditProduct"
                  >
                    Edit Product
                  </Link>
                )}
                {/* if you're the admin, you should be able to edit/delete a product using a button on the "single product info" page, not here. */}
              </div>
            );
          })}
      </section>
      <button onClick={toTopFunction} id="toTopButton" title="Go to Top">
        Top
      </button>
    </>
  );
}
