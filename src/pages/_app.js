import Head from "next/head";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Online Shop</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Font Awesome Icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        {/* Bootstrap JS */}
        {/* <script type="text/javascript" src="/js/bootstrap.bundle.js"></script> */}

        {/* Jquery - needed for modal */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
