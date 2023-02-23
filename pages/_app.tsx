// import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/auth.css";
import "../styles/sidebar.css";
import "../styles/invoice.css";
import "../styles/dashboard.css";
import "../styles/customer.css";
import "../styles/globals.css";
import "../styles/addinvoice.css";
import "../styles/globals.css";
import React, { useState } from "react";
import Footer from "./commoncmp/footer";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
