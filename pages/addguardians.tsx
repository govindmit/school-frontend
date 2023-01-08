import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { type } from "os";
import MiniDrawer from "./sidebar";
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

export default function ADDGuardians() {
  const [token, setToken] = useState<UserDataType | any>("");


  const router = useRouter();
  const BootstrapButton = styled(Button)({
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  });
  const { id } = router.query;


  useEffect(() => {
    const { id } = router.query;
    console.log(id, "idddddddddddddddd");

    fetch("https://api-school.mangoitsol.com/api/get_authorization_token")
      .then((response) => response.json())
      .then((res) => {

        setToken(res.token);
       
        
      
      })

      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  const handlechange = (e: any) => {
   
    console.log(e.target.name);
  };
  const handleCancel = () => {
    router.push("/guardians");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const requestedData = {
     
    };
    const studentData = {
    
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
                  <h1 className="heading">Add GURADIAN INFO</h1>
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
                              multiline
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </div>
                  </Box>
                </div>
                <div className="stuform">
                  <h1 className="heading">Add STUDENT INFO </h1>
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
                      Add
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
