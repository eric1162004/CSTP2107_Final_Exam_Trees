import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleFindFruitBtn = () => {
    router.push("/find");
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        <div className="row p-5">
          <div className="col-5">
            <h1 className="display-4 py-5">Turn Wasted Fruit Into Money</h1>
            <p className="text-muted">Let's take a bite out of waste</p>
            <button className={`btn btn-dark`} onClick={handleFindFruitBtn}>FIND FRUIT</button>
          </div>
          <div className="col-7">
            <Image
              src={stockImage}
              width="800"
              height="450"
              alt="image"
              layout="intrinsic"
            />
          </div>
        </div>
        <div className="row p-5 text-center">
          <div className="col">
            <i class="fas fa-recycle"></i>
            <p>Reduce Waste</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              exercitationem?
            </p>
          </div>
          <div className="col">
            <i class="fas fa-recycle"></i>
            <p>Reduce Waste</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              exercitationem?
            </p>
          </div>
          <div className="col">
            <i class="fas fa-recycle"></i>
            <p>Reduce Waste</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              exercitationem?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
