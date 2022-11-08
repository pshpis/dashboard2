import '../styles/globals.css'
import '../styles/sidebar.css'
import '../styles/barcodes.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps}/>
  </>
}

export default MyApp
