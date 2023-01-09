import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { type } from "os";
import MiniDrawer from "../sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextareaAutosize,
  styled,
} from "@mui/material";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";
import { useRouter } from "next/router";

export interface UserDataType {
  firstname: String;
  lastname: String;
  email: String;
  firstName: String;
  lastName: String;
  body: String;
}

export default function EditGuardians() {
  const [user, setUser] = useState<UserDataType | any>(null);
  const [stud, setStud] = useState<UserDataType | any>("");
  const [token, setToken] = useState<UserDataType | any>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    lastname: "",
    studentF: "",
    studentL: "",
  });
  const router = useRouter();
  const BootstrapButton = styled(Button)({
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  });
  const { id } = router.query;
  const student = (token: any) => {
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
        setToken(res.token);
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
  const handlechange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  const handleCancel = () => {
    router.push("/guardians");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const requestedData = {
      firstName: formData.name ? formData.name : user.firstname,
      lastName: formData.lastname ? formData.lastname : user.lastname,
      email: formData.email ? formData.email : user.email,
      contact: formData.contact ? formData.contact : user.contact,
      status: user.status,
      role: user.role,
    };
    const studentData = {
      firstName: formData.studentF ? formData.studentF : stud.firstName,
      lastName: formData.studentL ? formData.studentL : stud.lastName,
      user_id: id,
    };
    await axios({
      method: "PUT",
      url: `https://api-school.mangoitsol.com/api/edituser/${id}`,
      data: requestedData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        if (result) {
          axios({
            method: "PUT",
            url: `https://api-school.mangoitsol.com/api/updatestudent/${stud.id}`,
            data: studentData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((results) => {
              console.log(results, "Studentresultttt");
            })
            .catch((err) => {
              router.push("/guardians");
              console.log(err, "errrorr");
            });
        }
      })
      .catch((err) => {
        console.log(err, "errrorr");
      });

    // console.log(user, "userrrrrrrrr");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div id="editContent">
            <div id="left">
              <div className="img">
                <Avatar
                  alt="Remy Sharp"
                  src="/image.png"
                  sx={{ width: 204, height: 204 }}
                />
                &nbsp;
              </div>
              <div className="upload">
                <Button
                  sx={{ border: "1.5px solid #1A70C5" }}
                  variant="outlined"
                  startIcon={
                    <Image
                      src="/Vect.png"
                      alt=""
                      width={14}
                      height={10}
                    ></Image>
                  }
                >
                  Upload Image
                </Button>
              </div>
            </div>

            <form>
              <div id="right">
                <div className="editform">
                  <h1 className="heading">EDIT GURADIAN INFO</h1>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "35ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">
                              First Name <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => handlechange(e)}
                              id="name"
                              type="name"
                              name="name"
                              defaultValue={user?.firstname}
                              // value={user.firstname}
                              placeholder="Activity Name..."
                              fullWidth
                              multiline
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="price">
                              Last Name <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => handlechange(e)}
                              fullWidth
                              id="price"
                              type="price"
                              name="lastname"
                              placeholder="Price..."
                              defaultValue={user?.lastname}
                              multiline
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="type">
                              Email <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => handlechange(e)}
                              fullWidth
                              id="type"
                              type="type"
                              name="email"
                              placeholder="Type.."
                              defaultValue={user?.email}
                              multiline
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="status">
                              Contact <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => handlechange(e)}
                              fullWidth
                              id="status"
                              name="contact"
                              placeholder="Status..."
                              defaultValue={user?.contact}
                              multiline
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </div>
                  </Box>
                </div>
                <div className="stuform">
                  <h1 className="heading">EDIT STUDENT INFO </h1>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { m: 1, width: "35ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="status">
                              First Name <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => handlechange(e)}
                              fullWidth
                              id="status"
                              name="studentF"
                              placeholder="Status..."
                              defaultValue={stud?.firstName}
                              multiline
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="status">
                              Last Name <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              onChange={(e) => handlechange(e)}
                              fullWidth
                              id="status"
                              name="studentL"
                              placeholder="Status..."
                              defaultValue={stud?.lastName}
                              multiline
                            />
                          </Stack>
                        </Grid>
                      </Grid>

                      {/* <div>
                      
                      </div> */}
                    </div>
                    {/* <Button onClick={handleSubmit} type="button">
                      cancel
                    </Button> */}
                  </Box>
                </div>
                <div className="butto">
                  <div className="btn">
                    <Button
                      className="edit"
                      onClick={handleSubmit}
                      type="button"
                    >
                      save and update
                    </Button>
                  </div>
                  <div className="btns">
                    <BootstrapButton onClick={handleCancel} type="button">
                      cancel
                    </BootstrapButton>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
}
