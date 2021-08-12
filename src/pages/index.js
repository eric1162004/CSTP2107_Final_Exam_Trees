import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleShopNowBtn = () => {
    router.push("/shop");
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        {/* Tagline */}
        <h1 className="display-5 text-center py-5">
          Tagline describing your e-shop
        </h1>

        {/* Feature Products */}
        <div className={`row my-3`}>
          <div className={`col-12 col-md-4 text-center`}>
            <Image
              src={stockImage}
              width="150"
              height="150"
              alt="image"
              layout="intrinsic"
            />
          </div>
          <div className={`col-12 col-md-4 text-center`}>
            <Image
              src={stockImage}
              width="150"
              height="150"
              alt="image"
              layout="intrinsic"
            />
          </div>
          <div className={`col-12 col-md-4 text-center`}>
            <Image
              src={stockImage}
              width="150"
              height="150"
              alt="image"
              layout="intrinsic"
            />
          </div>
        </div>

        {/* Shop Now Button */}
        <div className={`text-center`}>
          <button
            className={`btn btn-dark btn-lg my-5`}
            onClick={handleShopNowBtn}
          >
            Shop Now
          </button>
        </div>

        <hr />

        {/* Products Div */}
        <div className={`row ${styles.productsDiv} my-5 p-5 gx-5`}>
          <div className="col-12 col-md-4 my-2">
            <Image
              src={stockImage}
              width="150"
              height="150"
              alt="image"
              layout="responsive"
            />
            <p>PRODUCT NAME</p>
            <p>$300</p>
          </div>

          <div className="col">
            <div className="row text-center align-items-center">
              <div className="col-6">
                <Image
                  src={stockImage}
                  width="150"
                  height="150"
                  alt="image"
                  layout="intrinsic"
                />
                <p>PRODUCT NAME</p>
                <p>$300</p>
              </div>
              <div className="col-6">
                <Image
                  src={stockImage}
                  width="150"
                  height="150"
                  alt="image"
                  layout="intrinsic"
                />
                <p>PRODUCT NAME</p>
                <p>$300</p>
              </div>
              <div className="col-6">
                <Image
                  src={stockImage}
                  width="150"
                  height="150"
                  alt="image"
                  layout="intrinsic"
                />
                <p>PRODUCT NAME</p>
                <p>$300</p>
              </div>
              <div className="col-6">
                <Image
                  src={stockImage}
                  width="150"
                  height="150"
                  alt="image"
                  layout="intrinsic"
                />
                <p>PRODUCT NAME</p>
                <p>$300</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      {/* About Your Shop Div */}
      <div className={`text-center my-5 p-5`} id="aboutUs">
        <h2 className="display-5 ">About Your Shop</h2>
        <p className="lead">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa magni
          tempore amet fugiat veritatis saepe voluptatem temporibus error quos
          maxime obcaecati eveniet accusamus, doloremque provident aperiam eius
          ut debitis voluptatum.
        </p>
      </div>

      <Footer />
    </>
  );
}
