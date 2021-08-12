import { useEffect, useState } from "react";
import styles from "../styles/Cart.module.scss";
import Image from "next/image";
import stockImage from "/public/stockImage.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getSessionCart, saveToShoppingCart } from "../utilities/shoppingCart";
import { useSession } from "next-auth/client";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const [session, loading] = useSession();

  useEffect(() => {
    const cartFromSession = getSessionCart();
    setCart(cartFromSession);
    calculateSummary();
  }, []);

  const updateShoppingCart = (productID, quantity) => {
    let newProducts = [...cart];
    let product = newProducts.find((p) => p._id == productID);
    product.quantity = quantity;
    setCart(newProducts);
    saveToShoppingCart(product);
    calculateSummary();
  };

  const calculateSummary = () => {
    let fetchCart = getSessionCart();
    let newSubTotal = fetchCart.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0
    );
    let newTax =
      fetchCart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0) * 0.12;
    setSubTotal(parseFloat(newSubTotal).toFixed(2));
    setTax(parseFloat(newTax).toFixed(2));
    setTotal(parseFloat(newSubTotal + newTax).toFixed(2));
  };

  return (
    <>
      <Navbar />

      <div className={`${styles.container}`}>
        {/* Page title */}
        <div className={`py-3 my-3`}>
          <h2>
            <i className="fas fa-shopping-cart"></i> Shoppin Cart
          </h2>
          <hr />
        </div>

        <div className="row">
          {/* Shopping Cart */}
          <div className="col-12 col-md-8">
            <h2>Shopping Cart</h2>
            <hr />
            {/* Cart Items */}
            {cart.map((product) => (
              <div className="row" key={product._id}>
                <div className="col-3 text-center">
                  <Image
                    src={stockImage}
                    width="150"
                    height="150"
                    alt="image"
                    layout="intrinsic"
                  />
                </div>
                <div className="col-6">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                </div>
                <div className="col-3">
                  <input
                    className={`${styles.itemCountInput}`}
                    type="number"
                    name="itemCount"
                    id="itemCount"
                    min="0"
                    max="100"
                    value={product.quantity}
                    onChange={(e) =>
                      updateShoppingCart(product._id, e.target.value)
                    }
                  />
                  pcs
                </div>
              </div>
            ))}

            <hr />

            {session && (
              <>
                {/* Checkout and Cancel Btns */}
                <a href="#confirmPurchaseModal" rel="modal:open">
                  <button className="btn btn-dark m-2">Checkout</button>
                </a>
                <button className="btn btn-light">Cancel</button>

                {/* Confirm Purchase Modal */}
                <div
                  id="confirmPurchaseModal"
                  className={`modal ${styles.modal}`}
                >
                  <p>
                    <i className="fas fa-check-circle"></i> Thank you for
                    purchase.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Shopping Summary  */}
          <div className="col">
            <h2>Summary</h2>
            <hr />
            <div className="d-flex justify-content-between">
              <span>SUBTOTAL</span>
              <span>${subTotal}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>SHIPPING</span>
              <span>FREE</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>TAXES</span>
              <span>${tax}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fs-4">
              <span>TOTAL ($CAD)</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
