import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import products from "../products.json";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Stripe NextJs Test App</title>
        <meta name="description" content="Stripe NextJs Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Stripe NextJs Test App</h1>

        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.card} key={product.id}>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>Stripe NextJS</footer>
    </div>
  );
}
