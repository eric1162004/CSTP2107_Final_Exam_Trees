import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function Edit({ tree }) {
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [days, setDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [hours, setHours] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    setType(tree.type);
    setAddress(tree.address);
    setDays(tree.days);
    setHours(tree.hours);
    setPhone(tree.phone);
    setEmail(tree.email);
    setOpen(tree.open);
  }, []);

  const onDaysChange = (e) => {
    let newDays = days;
    let selectDay = e.target.id;
    let isChecked = e.target.checked;
    switch (selectDay) {
      case "sun":
        newDays[0] = isChecked;
        break;
      case "mon":
        newDays[1] = isChecked;
        break;
      case "tue":
        newDays[2] = isChecked;
        break;
      case "wed":
        newDays[3] = isChecked;
        break;
      case "thur":
        newDays[4] = isChecked;
        break;
      case "fri":
        newDays[5] = isChecked;
        break;
      case "sat":
        newDays[6] = isChecked;
        break;
    }
    setDays(newDays);
  };

  const addTree = async () => {
    let userName = session?.user.email || "user";
    // For some reason does not work!
    console.log(userName);

    if ((type == "", address == "", phone == "", email == "")) {
      setError("Missing Required Fields..");
      return;
    }

    let newTree = {
      userName,
      _id: tree._id,
      type,
      address,
      days,
      hours,
      phone,
      email,
      open,
    };

    await fetch("http://localhost:3000/api/tree/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTree),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);
        // redirect to detail page
        router.push("/detail?_id=" + tree._id);
      })
      .catch((err) => {
        console.log("cant add product", err);
      });
  };

  return (
    <>
      <Navbar />

      {/* Create new product */}
      <div className={`mx-5 p-5 text-center`}>
        <h1>Edit Your Fruit:</h1>
        <div className={`row justify-content-center`}>
          <div className={`col-12 col-md-6 my-3`}>
            {/* tree Address */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" forhtml="address">
                  Address
                </label>
              </div>
              <input
                className="form-control"
                placeholder="123 address road"
                type="text"
                id="address"
                name="address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
              />
            </div>
            {/* tree type */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" forhtml="type">
                  Fruit Type
                </label>
              </div>
              <input
                className="form-control"
                placeholder="Apple"
                type="text"
                id="type"
                name="type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                value={type}
              />
            </div>
            {/* days */}
            Day:{" "}
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                onChange={onDaysChange}
                id="mon"
              />
              <label className="form-check-label" forhtml="mon">
                Mon
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="tue"
                onChange={onDaysChange}
              />
              <label className="form-check-label" forhtml="tue">
                tue
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="wed"
                onChange={onDaysChange}
              />
              <label className="form-check-label" forhtml="wed">
                Wed
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="thur"
                onChange={onDaysChange}
              />
              <label className="form-check-label" forhtml="thur">
                Thur
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="fri"
                onChange={onDaysChange}
              />
              <label className="form-check-label" forhtml="fri">
                Fri
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="sat"
                onChange={onDaysChange}
              />
              <label className="form-check-label" forhtml="sat">
                Sat
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="sun"
                onChange={onDaysChange}
              />
              <label className="form-check-label" forhtml="sun">
                Sun
              </label>
            </div>
            {/* tree hours */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" forhtml="hours">
                  Hours
                </label>
              </div>
              <input
                className="form-control"
                placeholder="0700-1300"
                type="text"
                id="hours"
                name="hours"
                onChange={(e) => {
                  setHours(e.target.value);
                }}
                value={hours}
              />
            </div>
            {/* tree phone */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" forhtml="phone">
                  Phone
                </label>
              </div>
              <input
                className="form-control"
                placeholder="(123)-000-1122"
                type="phone"
                id="phone"
                name="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
            </div>
            {/* tree email */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" forhtml="email">
                  Email
                </label>
              </div>
              <input
                className="form-control"
                placeholder="abc@abc.com"
                type="email"
                id="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            {/* Open toggle */}
            <div className="form-check form-check-inline">
              <label className="form-check-label" forhtml="open">
                Open
              </label>
              <input
                className="form-check-input"
                onChange={(e) => setOpen(e.target.checked)}
                type="checkbox"
                id="open"
              />
            </div>
            {error && <p className={"text-danger"}>{error}</p>}
            {session && <></>}
            <div>
              <button
                type="button"
                className="btn btn-dark m-3"
                onClick={addTree}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
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
