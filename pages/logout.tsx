import React from "react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { PreLoader } from "./commorcmp/loader";

function Logoutpage() {
  const router = useRouter();
  useEffect(() => {
    const login_token = localStorage.getItem("QIS_loginToken");
    if (login_token !== null) {
      localStorage.removeItem("Name");
      router.push("/");
    } else {
      router.push("/");
    }
  }, []);
  return (
    <>
      <PreLoader />
    </>
  );
}
export default Logoutpage;
