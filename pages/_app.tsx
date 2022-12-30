// import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/navbar.css";
import "../styles/auth.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
