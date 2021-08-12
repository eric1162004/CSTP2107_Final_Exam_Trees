import styles from "../styles/Navbar.module.scss";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Navbar() {
  const [session, loading] = useSession();

  return (
    <>
      <div className={styles.container}>
        <Link href="/">
          <h1 className={`${styles.logo}`}>moqups</h1>
        </Link>
        <ul className={styles.links}>
          <Link href="/sell">
            <li>Sell</li>
          </Link>
          <Link href="/find">
            <li>Find</li>
          </Link>
        </ul>

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
          <Link href={`/myprofile`}>
            <a>
              <small className={`text-decoration-underline`}>
                <i className="fas fa-user"></i> Welcome, {session.user.name}
              </small>
            </a>
          </Link>
        </div>
      )}
    </>
  );
}
