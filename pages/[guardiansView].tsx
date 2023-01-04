import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";

export default function View() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("https://api-school.mangoitsol.com/api/get_authorization_token")
      .then((response) => response.json())
      .then((res) =>
        fetch("https://api-school.mangoitsol.com/api/getuser", {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => setUser(res.data))
          .catch((err: any) => {
            console.log(err);
          })
      )
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div id="content">
        <div id="left">
          <div className="img">
            <Avatar
              alt="Remy Sharp"
              src="/image.png"
              sx={{ width: 204, height: 204 }}
            />
            &nbsp;
          </div>
          <div>
            <span className="name">Jhon sign</span> &nbsp;
            <span className="date">Created at: May 16, 2022</span>
          </div>
        </div>

        <div id="right">
          <div className="one">
            <h1 className="heading">GURADIAN INFO</h1>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "35ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  label="First Name"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
                <TextField
                  label="Last Name"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
                <TextField
                  label="Email Address"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
                <TextField
                  label="Mobile Number"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
                <TextField
                  label="Status"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
                <TextField
                  label="Address"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
              </div>
            </Box>
          </div>
          <div className="two">
            <h1 className="heading">STUDENT INFO</h1>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "35ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  label="First Name"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
                <TextField
                  label="Last Name"
                  id="filled-size-normal"
                  defaultValue="Normal"
                  variant="filled"
                />
              </div>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
