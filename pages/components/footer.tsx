import { Typography } from "@mui/material";
import React from "react";
import { RiTwitterLine } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";
import { SlSocialFacebook } from "react-icons/sl";

export default function Footer() {
  return (
    <footer>
      <Typography>
        © 2022 Educorp. All Rights Reserved{" "}
        <a
          href="http://www.polymer-project.org/"
          target="_blank"
          style={{
            marginLeft: "15px",
            padding: "8px",
            border: "1px solid gray",
            borderRadius: "50%",
          }}
        >
          <SlSocialFacebook />
        </a>{" "}
        <a
          href="http://www.polymer-project.org/"
          target="_blank"
          style={{
            marginLeft: "15px",
            padding: "8px",
            border: "1px solid gray",
            borderRadius: "50%",
          }}
        >
          <RiTwitterLine />
        </a>
        <a
          href="http://www.polymer-project.org/"
          target="_blank"
          style={{
            marginLeft: "15px",
            padding: "8px",
            border: "1px solid gray",
            borderRadius: "50%",
          }}
        >
          <RxInstagramLogo />
        </a>
      </Typography>
    </footer>
  );
}
