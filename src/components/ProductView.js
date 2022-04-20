import React, { useState, useEffect } from "react";
import { useSingleProduct } from "../custom-hooks/useSingleProduct";
import "../imageUrls";

function ProductView() {
  const { product } = useSingleProduct();
  const { data } = useSingleProduct();

  const Thumbnail = ({ arr, image, index }) => {
    return (
      <div className="productThumbnail">
        {arr.map((imgsrc, i) => (
          <img
            key={i}
            height="50"
            src={imgsrc}
            onMouseOver={() => image(i)}
            className={index === i ? "productActive" : ""}
          />
        ))}
      </div>
    );
  };

  const Slideshow = ({ imgs }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      setIndex(0);
    }, []);

    return (
      <div className="productSlideshow">
        <img className="productImg" src={imgs[index]} />
        <Thumbnail arr={imgs} image={setIndex} index={index} />
      </div>
    );
  };

  let [count, setCount] = useState(0);
  if (count < 0) {
    count = 0;
  }

  // var min = Math.floor(0);
  // if (count < 0) {
  //   min;
  // }

  return (
    <div className="productViewContainer">
      <div className="productApp">
        {[data].map(() => (
          <div className="productApp" key={product.id}>
            <Slideshow
              imgs={[product.imageUrl, product.imageUrl, product.imageUrl]}
            />

            <div className="productViewText">
              <h1> {product.name} </h1>
              <p className="productViewp">{product.description}</p>
              <div className="productSizeDiv">
                <button className="sizeBox"> S </button>
                <button className="sizeBox"> M </button>
                <button className="sizeBox"> L </button>
                <button className="sizeBox"> XL </button>
              </div>

              <div className="productCartDiv">
                <button className="productViewCartBtn">Add to Bag</button>
                <button className="productContinueShoppingBtn">
                  <a href="http://localhost:3000/products"> Return Home</a>
                </button>
              </div>

              <div className="productDetailsDiv">
                <div className="specificationsDiv">
                  <h1 className="specH1"> Specs </h1>
                  <li> ** </li>
                  <li> ** </li>
                  <li> ** </li>
                  <li> *Product* </li>
                  <li> *productId* </li>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductView;
