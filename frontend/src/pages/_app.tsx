import React from 'react';
import dynamic from "next/dynamic"
const Nav= dynamic(() => import( '../components/Nav'), {ssr: false})
import '../styles/globals.css';
import { CartProvider} from "../context/cart"
import Head from 'next/head';
import Footer from '../components/Footer';




function MyApp({ Component, pageProps } :any) {
  
  return (
    <>
    <Head>
    <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
    </Head>
  <CartProvider>
  <Nav {...pageProps}/>
  <Component {...pageProps} />
  <Footer/>
  </CartProvider>
  </>
  )
}

export default  MyApp
