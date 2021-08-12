import styles from "../styles/Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { getCartItemCount } from "../utilities/shoppingCart";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [session, loading] = useSession();
  const [itemCount, setItemCount] = useState(0);
  const router = useRouter(); 

  useEffect(() => {
    setItemCount(getCartItemCount());
  });

  const handleCartBtnClick = () => {
    router.push("/cart");
  };

  return (
    <>
      <div className={styles.container}>
        <Link href="/">
          <h1 className={`${styles.logo}`}>LOGO</h1>
        </Link>
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

        {/* Cart Btn */}
        <button
          className={`btn btn-light ${styles.button} m-1 position-relative`}
          onClick={handleCartBtnClick}
        >
          <i className="fas fa-shopping-cart"></i> Your Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {itemCount}
          </span>
        </button>

        {(!session && (
          <>
            {/* Login Btn */}
            <button
              className={`btn btn-light ${styles.button}`}
              onClick={() => signIn()}
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </>
        )) || (
          <>
            {/* Logout Btn */}
            <button
              className={`btn btn-light ${styles.button}`}
              onClick={() => signOut()}
            >
              <i className="fas fa-sign-in-alt"></i> Logout
            </button>
          </>
        )}
      </div>
      {session && (
        <div className={styles.subContainer}>
          <small>
          <i className="fas fa-user"></i> Welcome, {session.user.name}
          </small>
        </div>
      )}
    </>
  );
}
