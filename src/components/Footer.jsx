import styles from "../styles/Footer.module.scss";
import Link from "next/link";
import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();

  if (router.pathname === "/") {
    return (
      <div className={styles.container}>
        <div className={`row`}>
          {/* left div */}
          <div className={`col-12 col-md-4 text-center`}> 
            <Image
              src={stockImage}
              width="100"
              height="100"
              alt="image"
              layout="intrinsic"
            />
            <p className={`fs-6 fw-light`}>
              <small>1717 Harrison St, San Francisco, CA 94103, USA</small>
            </p>
            <div>
              <i className="fab fa-facebook-square"></i>{" "}
              <i className="fab fa-instagram"></i> <i className="fab fa-whatsapp"></i>
            </div>
          </div>

          {/* right div */}
          <div className={`col-12 col-md-8`}>
            <p>Main Menu</p>
            <ul className={styles.horizontalLinks}>
              <Link href="/">
                <li>Home</li>
              </Link>
              <Link href="/#aboutUs">
                <li>About</li>
              </Link>
              <Link href="/shop">
                <li>Shop</li>
              </Link>
            </ul>

            <a href="#contactModal" rel="modal:open">
              <button className={`btn btn-dark my-3`}>
                <i className="bi bi-shop"></i>Contact us
              </button>
            </a>

            <div id="contactModal" className={`modal ${styles.modal}`}>
              <p>
                <i className="fas fa-envelope-open-text"></i>{" "}
                customer-service@onlineshop.com.
              </p>
              <p>
                <i className="fas fa-phone"></i> 778-999-0101
              </p>
              <p>
                <i className="fas fa-fax"></i> 778-999-0102
              </p>
            </div>
            
          </div>
        </div>
        <p className={`text-start `}>
          <i className="fas fa-copyright"></i> Your Company Name
        </p>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <ul className={styles.links}>
          <Link href="/">
            <li>Home</li>
          </Link>
          |
          <Link href="/#aboutUs">
            <li>About</li>
          </Link>
          |
          <Link href="/shop">
            <li>Shop</li>
          </Link>
        </ul>
        <p className={`text-center`}>
          <i className="fas fa-copyright"></i> Your Company Name
        </p>
      </div>
    );
  }
}
