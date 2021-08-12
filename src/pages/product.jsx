import { useState, useEffect } from "react";
import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  saveToShoppingCart,
  getProductQuantity,
} from "../utilities/shoppingCart";

export default function Product({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setQuantity(getProductQuantity(product._id));
  }, []);

  const addToCart = () => {
    product.quantity = quantity;
    saveToShoppingCart(product);
    setCount(count + 1);
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <Navbar />
      {(product.name && (
        <div className="row m-5">
          <div className="col">
            <Image
              src={stockImage}
              width="150"
              height="150"
              alt="image"
              layout="responsive"
            />
          </div>
          <div className="col">
            <h2>{product.name}</h2>
            <hr />
            <h2>${product.price}</h2>
            <hr />
            <div>
              <span>{product.description}</span>
            </div>

            <div className={`my-5`}>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="1"
                min="0"
                max="100"
                value={quantity}
                onChange={onQuantityChange}
              />
              pcs
            </div>

            <button className={`btn btn-dark`} onClick={addToCart}>
              Add To Cart
            </button>
          </div>
        </div>
      )) || <h1 className="text-center p-5 m-5">No product found.</h1>}
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query }) {
  // console.log(query);
  let product = {};

  if (query._id) {
    await fetch("http://localhost:3000/api/product/" + query._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);
        product = data[0];
      })
      .catch((err) => {
        console.log("cant fetch data", err);
      });
  }

  return {
    props: {
      product,
    }, // will be passed to the page component as props
  };
}
