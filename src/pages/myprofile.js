import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

import Link from "next/link";
import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import Navbar from "../components/Navbar";

export default function MyProfile({ trees }) {
  const [stree, setTree] = useState(trees);
  const [session, loading] = useSession();

  useEffect(() => {
    resetTrees();
  });

  const filterTrees = (e) => {
    let userName = session?.user.email || "user";
    let searchWord = e.target.value;
    let newTrees = stree.filter(
      (t) => t.userName == userName && t.type.includes(searchWord)
    );
    setTree(newTrees);
  };

  const resetTrees = () => {
    let userName = session?.user.email || "user";
    let newTrees = trees.filter((t) => t.userName == userName);
    setTree(newTrees);
  };

  const renderTrees = () => {
    return stree.map((tree) => (
      <div
        className={`col-12 col-md-4 m-2 p-2 border border-secondary`}
        key={tree._id}
      >
        <div className="text-center">
          <h6>
            <i className="fas fa-apple-alt"></i> {tree.type}
          </h6>
          <Image
            src={stockImage}
            width="160"
            height="80"
            alt="image"
            layout="intrinsic"
          />
          <span>{tree.description}</span>
          <br />
          <span>
            Open:{" "}
            {tree.open ? (
              <i className="fas fa-check-circle"></i>
            ) : (
              <i className="fas fa-times-circle"></i>
            )}
          </span>
          <Link key={tree._id} href={`/detail?_id=${tree._id}`}>
            <button
              className={`btn btn-light px-2 mx-2 border border-secondary`}
            >
              Detail
            </button>
          </Link>
          <Link key={tree._id} href={`/edit?_id=${tree._id}`}>
            <button className={`btn btn-light px-2 border border-secondary`}>
              Edit
            </button>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />

      {/* Tagline */}
      <h1 className="display-5 text-center my-5">My Profile Find</h1>

      {/* Search Box  */}
      <div className={`row justify-content-center`}>
      <div className={`col-5`}>
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
            onChange={filterTrees}
            onFocus={resetTrees}
          />
        </div>
      </div>
      </div>

      <hr />

      {/* Tree list */}
      <div className={`mx-5 p-5`}>
        <h1>My Trees:</h1>

        {/* Tree Div */}
        <div className={`row`}>
          {/* individual tree */}
          {renderTrees()}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let trees = [];

  await fetch("http://localhost:3000/api/tree", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then(async (data) => {
      trees = data;
    })
    .catch((err) => {
      console.log("cant fetch data", err);
    });

  return {
    props: {
      trees,
    },
  };
}
