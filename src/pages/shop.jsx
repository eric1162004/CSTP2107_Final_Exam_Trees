import { useState } from "react";

import styles from "../styles/Shop.module.scss";
import Link from "next/link";
import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Shop({ products }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const renderProducts = () => {
    return products.map((product) => (
      <div
        className={`${styles.productDiv} col-12 col-md-4 my-2`}
        key={product._id}
      >
        <Link key={product._id} href={`/product?_id=${product._id}`}>
          <div className="row">
            <div className="col text-center">
              <Image
                src={stockImage}
                width="160"
                height="80"
                alt="image"
                layout="intrinsic"
              />
            </div>
            <div className="col">
              <h6>{product.name}</h6>
              <span>{product.description}</span>
              <br />
              <span>${product.price}</span>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  const addProduct = async () => {
    let newProduct = {
      name,
      description,
      price,
    };

    await fetch("http://localhost:3000/api/product/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);
        setName("");
        setDescription("");
        setPrice("");
      })
      .catch((err) => {
        console.log("cant add product", err);
      });
  };

  return (
    <>
      <Navbar />

      {/* Tagline */}
      <h1 className="display-5 text-center my-5 py-5">Tagline describing your e-shop</h1>

      {/* Search Box  */}
      <div className={`${styles.searchBox}`}>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="searchBox"
            aria-label="searchBox"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>

      <hr />

      {/* Product list */}
      <div className={`mx-5 p-5`}>
        <h1>Products:</h1>

        {/* Products Div */}
        <div className={`row`}>
          {/* individual product */}
          {renderProducts()}
        </div>
      </div>

      <hr />
      {/* Create new product */}
      <div className={`mx-5 p-5`}>
        <h1>Add A New Product:</h1>
        <div className={`row`}>
          <div className={`col-12 col-md-8 my-2`}>
            {/* Product name */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" for="name">
                  Product Name
                </label>
              </div>
              <input
                className="form-control"
                placeholder="product name"
                type="text"
                id="name"
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
            </div>
            {/* Product description */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" for="description">
                  Product Description
                </label>
              </div>
              <input
                className="form-control"
                placeholder="product description"
                type="text"
                id="description"
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              />
            </div>
            {/* Product Price */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" for="price">
                  Price ($CAD)
                </label>
              </div>
              <input
                className="form-control"
                type="number"
                id="price"
                name="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              />
            </div>
            <button type="button" className="btn btn-dark" onClick={addProduct}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  let products = [];

  await fetch("http://localhost:3000/api/product/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(async (data) => {
      products = data;
    })
    .catch((err) => {
      console.log("cant fetch data", err);
    });

  return {
    props: {
      products,
    },
  };
}
