import { useState } from "react";
import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Detail({ tree }) {
  const router = useRouter();

  console.log(tree);

  const goToMap = (address) => {
    let href = `https://www.google.ca/maps/place/` + address;
    router.push(href);
  };

  return (
    <>
      <Navbar />
      {(tree.type && (
        <div className="row m-5 justify-content-center">
          <div className="col-6">
            <h2 className="text-center">
              <i className="fas fa-apple-alt"></i>
              {tree.type}
            </h2>
            <Image
              src={stockImage}
              width="150"
              height="150"
              alt="image"
              layout="responsive"
            />
            <div className={`py-2`}>
              <h3>Address</h3>
              <p>{tree.address}</p>
            </div>
            <div>
              <button
                className={`btn btn-dark`}
                onClick={() => goToMap(tree.address)}
              >
                Direction
              </button>
            </div>
            <div className={`py-2`}>
              <h3>Days</h3>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row">Mon</th>
                    <td>{tree.days[1] === "true" && tree.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Tue</th>
                    <td>{tree.days[2] === "true" && tree.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Wed</th>
                    <td>{tree.days[3] === "true" && tree.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Thur</th>
                    <td>{tree.days[4] === "true" && tree.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fri</th>
                    <td>{tree.days[5] === "true" && tree.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Sat</th>
                    <td>{tree.days[6] === "true" && tree.hours}</td>
                  </tr>
                  <tr>
                    <th scope="row">Sun</th>
                    <td>{tree.days[0] === "true" && tree.hours}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3>Contact</h3>
            <p>
              <i className="fas fa-phone"></i> {tree.phone}
            </p>
            <p>
              <i className="far fa-envelope"></i> {tree.email}
            </p>

            <h3>Open: </h3>
            <span>
              {tree.open ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-times-circle"></i>
              )}
            </span>
          </div>
        </div>
      )) || <h1 className="text-center p-5 m-5">No tree found.</h1>}
    </>
  );
}

export async function getServerSideProps({ query }) {
  // console.log(query);
  let tree = {};

  if (query._id) {
    await fetch("http://localhost:3000/api/tree/" + query._id, {
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
        tree = data[0];
      })
      .catch((err) => {
        console.log("cant fetch data", err);
      });
  }

  return {
    props: {
      tree,
    }, // will be passed to the page component as props
  };
}
