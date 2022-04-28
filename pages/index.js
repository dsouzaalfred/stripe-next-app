import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "../styles/Home.module.css";

import { initiateCheckout } from "../lib/payment";

import products from "../products.json";

const defaultCart = {
  products: {},
};
export default function Home() {
  const [cart, updateCart] = useState(defaultCart);
  const [cartItems, updateCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = (id) => {
    const tempCart = { ...cart };
    if (tempCart.products[id]) {
      tempCart.products[id].quantity = tempCart.products[id].quantity + 1;
    } else {
      tempCart.products[id] = {
        id,
        quantity: 1,
      };
    }
    updateCart(tempCart);
  };

  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  };

  useEffect(() => {
    if (cart) {
      console.log({ cart });
      const cartItems = Object.keys(cart?.products).map((key) => {
        const product = products.find(({ id }) => `${id}` === `${key}`);
        return {
          ...cart.products[key],
          pricePerItem: product.price,
        };
      });
      updateCartItems(cartItems);

      const subTotal = cartItems.reduce(
        (accumulator, { pricePerItem, quantity }) => {
          return accumulator + pricePerItem * quantity;
        },
        0
      );
      setTotalCost(subTotal);

      const totalItems = cartItems.reduce((accumulator, { quantity }) => {
        return accumulator + quantity;
      }, 0);
      setTotalItems(totalItems);
    }
  }, [cart]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Stripe NextJs Test App</title>
        <meta name="description" content="Stripe NextJs Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Stripe NextJs Test App</h1>

        <h2>Cart:</h2>
        <p>
          Items: {totalItems} || Total: £{totalCost}
        </p>
        <button className={styles.button} onClick={checkout}>
          Checkout
        </button>

        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.card} key={product.id}>
              <Image src={product.image} width={100} height={130} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: £{product.price}</p>
              <button
                className={styles.button}
                onClick={() => {
                  addToCart(product.id);
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>Stripe NextJS</footer>
    </div>
  );
}
