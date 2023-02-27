import { Inter } from "@next/font/google";
import LoginPage from "./loginPage";

const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
export default function Home() {
  return (
    <>
    <Script  src="https://amexmena.gateway.mastercard.com/static/checkout/checkout.min.js"
                data-error="errorCallback"
                data-cancel="cancelCallback"
                strategy="beforeInteractive"
               > </Script>
                
      <LoginPage />
    </>
  );
}
