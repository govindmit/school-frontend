import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { api_url, auth_token, backend_url } from "./api/hello";
import { toast } from "react-toastify";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

const Item = styled(Paper)(({ theme }) => ({
  p: 10,
}));

type FormValues = {
  name: string;
  image: any;
  shortdescription: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
};

export default function EditActivity() {
  const router = useRouter();
  const [activites, setactivites] = useState<any>([]);
  const [name, setname] = useState("");
  const [name_err, setname_err] = useState(false);

  useEffect(() => {
    const url = `${api_url}getactivitydetails/19`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: auth_token,
          },
        });
        const json = await response.json();
        //console.log(json.data[0]);
        setactivites(json.data[0]);
        setname(activites.name);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  console.log(activites);

  const handlename = (e: any) => {
    setname(e.target.value);
    if (e.target.value === "") {
      setname_err(true);
    } else {
      setname_err(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    let inputdata = { name };

    if (inputdata.name === "") {
      setname_err(true);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{ marginTop: "80px" }}
      >
        <Stack style={{ padding: "20px" }}>
          <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link
                key="1"
                color="inherit"
                href="/"
                style={{ color: "red", textDecoration: "none" }}
              >
                Home
              </Link>
              <Link
                key="2"
                color="inherit"
                href="/material-ui/getting-started/installation/"
                style={{ color: "black", textDecoration: "none" }}
              >
                Edit Activites
              </Link>
            </Breadcrumbs>
          </Stack>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            EDIT ACTIVITES
          </Typography>
        </Stack>
        <form>
          <Container style={{ marginBottom: "30px" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={4} md={4}>
                  <Item style={{ textAlign: "center" }}>
                    <Avatar
                      style={{ marginLeft: "90px" }}
                      alt="Remy Sharp"
                      src=""
                      sx={{ width: 150, height: 150 }}
                    />
                    <Button
                      sx={{ border: "1.5px solid #1A70C5" }}
                      startIcon={<img src="/Vect.png" alt=""></img>}
                      style={{ marginBottom: "10px", marginTop: "10px" }}
                      color="primary"
                    >
                      <Typography>Upload Image</Typography>
                    </Button>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={8}>
                  <Item style={{ padding: "15px" }}>
                    <Typography>
                      <b>EDIT ACTIVITES</b>
                    </Typography>
                    <Stack style={{ marginTop: "20px" }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">
                              Activity Name <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              type="text"
                              id="name"
                              fullWidth
                              value={name}
                              onChange={handlename}
                            />
                            <Typography style={style}>
                              {name_err === true ? (
                                <span>Name Feild is Required **</span>
                              ) : (
                                ""
                              )}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="type">
                              Type <span className="err_str">*</span>
                            </InputLabel>
                            <FormControl>
                              <Select
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="Free">Free</MenuItem>
                                <MenuItem value="Paid">Paid</MenuItem>
                              </Select>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="shortdescription">
                              Short Description{" "}
                              <span className="err_str">*</span>
                            </InputLabel>
                            <TextareaAutosize minRows={4} />
                            <Typography style={style}></Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="description">
                              Description <span className="err_str">*</span>
                            </InputLabel>
                            <TextareaAutosize minRows={6} />
                          </Stack>
                          <Typography style={style}></Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Price">
                              Price <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              type="text"
                              id="name"
                              placeholder="price..."
                              fullWidth
                            />
                            <Typography style={style}></Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="startdate">
                              Start Date <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              fullWidth
                              type="date"
                              id="startdate"
                            />
                            <Typography style={style}></Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} lg={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="startdate">
                              End Date <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              fullWidth
                              type="date"
                              id="startdate"
                            />
                            <Typography style={style}></Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="status">
                              Status <span className="err_str">*</span>
                            </InputLabel>
                            <FormControl>
                              <Select
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Archive">Archive</MenuItem>
                                <MenuItem value="Draft">Draft</MenuItem>
                              </Select>
                            </FormControl>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                          >
                            <b>SAVE & UPDATE</b>
                          </Button>{" "}
                          <Button
                            type="submit"
                            variant="contained"
                            style={{
                              marginRight: "20px",
                              backgroundColor: "#F95A37",
                            }}
                          >
                            <b>CANCEL</b>
                          </Button>
                        </Grid>
                      </Grid>
                    </Stack>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </form>
      </Box>
    </Box>
  );
}
