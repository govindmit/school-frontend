import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type } from "os";
import MiniDrawer from "../sidebar";

export interface UserDataType {
  firstname: String;
  lastname: String;
  email: String;
  firstName: String;
  lastName: String;
}

export default function View() {
  const [user, setUser] = useState<UserDataType | any>("");
  const [stud, setStud] = useState<UserDataType | any>("");

  const router = useRouter();

  const student = (token: any) => {
    const { id } = router.query;
    fetch(`https://api-school.mangoitsol.com/api/getstudentbyuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res, "studenttttt");
        setStud(res ? res.data[0] : "");
      })
      .catch((err: any) => {
        console.log(err);
      });
    console.log(token, "tokennnnn");
  };

  useEffect(() => {
    const { id } = router.query;
    console.log(id, "idddddddddddddddd");

    fetch("https://api-school.mangoitsol.com/api/get_authorization_token")
      .then((response) => response.json())
      .then((res) => {
        student(res.token);
        fetch(`https://api-school.mangoitsol.com/api/getuserdetails/${id}`, {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => setUser(res?.data[0]))
          .catch((err: any) => {
            console.log(err);
          });
      })

      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  console.log(stud, "stud");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                <span className="name">{!user ? "load" : user.firstname}</span>{" "}
                &nbsp;
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
                      defaultValue={user.firstname}
                      // value={user.firstname}
                      variant="filled"
                      multiline
                    />
                    <TextField
                      label="Last Name"
                      id="filled-size-normal"
                      defaultValue={user.lastname}
                      variant="filled"
                      multiline
                    />
                    <TextField
                      label="Email Address"
                      id="filled-size-normal"
                      defaultValue={user.email}
                      variant="filled"
                      multiline
                    />
                    <TextField
                      label="Mobile Number"
                      id="filled-size-normal"
                      defaultValue={user.contact}
                      variant="filled"
                      multiline
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
                      defaultValue={stud?.firstName}
                      variant="filled"
                      multiline
                    />
                    <TextField
                      label="Last Name"
                      id="filled-size-normal"
                      defaultValue={stud?.lastName}
                      variant="filled"
                      multiline
                    />
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
