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
  IconButton,
} from "@mui/material";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";
import { useRouter } from "next/router";
import { api_url, base_url } from "../api/hello";
import { PhotoCamera } from "@mui/icons-material";
import { dirname } from "path";

export interface UserDataType {
  firstname: String;
  lastname: String;
  email: String;
  firstName: String;
  lastName: String;
  body: String;
  image: any;
}

export default function EditGuardians() {
  const [user, setUser] = useState<UserDataType | any>(null);
  const [stud, setStud] = useState<UserDataType | any>("");
  const [token, setToken] = useState<UserDataType | any>("");
  const [image, setImage] = useState<UserDataType | any>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    lastname: "",
    studentF: "",
    studentL: "",
  });
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();
  const BootstrapButton = styled(Button)({
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  });
  const { id } = router.query;
  const student = (token: any) => {
    fetch(`${api_url}getstudentbyuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setStud(res ? res.data[0] : "");
      })
      .catch((err: any) => {});
  };

  useEffect(() => {
    const { id } = router.query;

    fetch("https://api-school.mangoitsol.com/api/get_authorization_token")
      .then((response) => response.json())
      .then((res) => {
        student(res.token);
        setToken(res.token);
        fetch(`${api_url}getuserdetails/${id}`, {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => {
            setUser(res?.data[0]);
          })
          .catch((err: any) => {});
      })

      .catch((err: any) => {});
  }, []);
  const handlechange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCancel = () => {
    router.push("/guardians");
  };
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    var firstName = formData.name ? formData.name : user.firstname;
    var lastName = formData.lastname ? formData.lastname : user.lastname;
    var email = formData.email ? formData.email : user.email;
    var contact = formData.contact ? formData.contact : user.contact;
    var status = user.status;
    var role = user.role;

    var imageData = new FormData();

    imageData.append("firstName", firstName);
    imageData.append("lastName", lastName);
    imageData.append("email", email);
    imageData.append("contact", contact);
    imageData.append("status", status);
    imageData.append("role_id", role);
    imageData.append("image", image);

    const studentData = {
      firstName: formData.studentF ? formData.studentF : stud?.firstName,
      lastName: formData.studentL ? formData.studentL : stud?.lastName,
      user_id: id,
    };
    await axios({
      method: "PUT",
      url: `${api_url}edituser/${id}`,
      data: imageData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((result) => {
        if (result) {
          router.push("/guardians");

          axios({
            method: "PUT",
            url: `${api_url}updatestudent/${stud.id}`,
            data: studentData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((results) => {
              router.push("/guardians");
            })
            .catch((err) => {
              // router.push("/guardians");
            });
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div id="editContent">
            <div id="left">
              <div className="img">
                {image ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={`${URL.createObjectURL(image)}`}
                    sx={{ width: 204, height: 204 }}
                  />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    src={`${base_url}${user?.image}`}
                    sx={{ width: 204, height: 204 }}
                  />
                )}
                &nbsp;
              </div>
              <div className="upload">
                <Button variant="contained" component="label">
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={uploadToClient}
                  />
                  <PhotoCamera />
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                ></IconButton>
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
