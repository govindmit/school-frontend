// import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/auth.css";
import "../styles/sidebar.css";
import "../styles/guardian.css";
import "../styles/dashboard.css";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
