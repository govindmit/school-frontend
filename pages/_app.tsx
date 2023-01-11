// import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/navbar.css";
import "../styles/auth.css";
import "../styles/view.css";
import "../styles/edit.css";
import "../styles/sidebar.css";
import "../styles/guardian.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
