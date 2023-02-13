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
import commmonfunctions from "./commonFunctions/commmonfunctions";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  React.useEffect(() => {
    const logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
    commmonfunctions.VerifyLoginUser().then(res => {
      if (res.exp * 1000 < Date.now()) {
        localStorage.removeItem('QIS_loginToken');
        localStorage.removeItem('QIS_User');
        router.push("/");
      }
    });
  }, []);

  return <Component {...pageProps} />;
}
