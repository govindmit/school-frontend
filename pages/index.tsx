import { Inter } from "@next/font/google";
import LoginPage from "./loginPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
  );
}
