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
import MiniDrawer from "../../sidebar";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { api_url, auth_token, backend_url } from "../../api/hello";
import { toast } from "react-toastify";

type activitesType = {
  name: string;
  description: string;
  price: number;
  image: string;
  status: string;
  startdate: string;
  enddate: string;
  type: string;
  shortdescription: string;
};

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};
enum typeEnum {
  Free = "Free",
  Paid = "Paid",
}
enum statusEnum {
  Active = "Active",
  Archive = "Archive",
  Draft = "Draft",
}
type FormValues = {
  name: string;
  type: typeEnum;
  image: any;
  shortdescription: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  status: statusEnum;
};

const Item = styled(Paper)(({ theme }) => ({
  p: 10,
}));

export default function EditActivity() {
  const router = useRouter();
  const { id } = router.query;
  const [activites, setactivites] = useState<activitesType | any>([]);
  const [name, setnameu] = useState<string>("");

  useEffect(() => {
    const url = `${api_url}getactivitydetails/${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: auth_token,
          },
        });
        const json = await response.json();
        setactivites(json.data[0]);
        setnameu(json.data[0].name);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const reqData = {
      name: data.name,
      type: data.type,
      description: data.description,
      shortdescription: data.shortdescription,
      image: data.image[0],
      startdate: data.startDate,
      enddate: data.endDate,
      status: data.status,
      price: data.price,
    };
    const end_point = "editactivity";
    await axios({
      method: "POST",
      url: api_url + end_point,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        if (data.status === 201) {
          toast.success("Activity Updated Successfully !");
          const redirect = () => {
            router.push("/activites/activitylist");
          };
          setTimeout(redirect, 5000);
        }
      })
      .catch((error) => {
        toast.error("Activity Allready Registred !");
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      src={`${backend_url}${activites.image}`}
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
                              {...register("name", {
                                required: true,
                              })}
                              onChange={(e) => setnameu(e.target.value)}
                            />
                            <Typography style={style}>
                              {errors.name && (
                                <span>Name Feild is Required **</span>
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
                                value={activites.type}
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
                            <TextareaAutosize
                              minRows={4}
                              {...register("shortdescription", {
                                required: true,
                              })}
                              value={activites.shortdescription}
                            />
                            <Typography style={style}>
                              {errors.shortdescription && (
                                <span>
                                  Short dscription Feild is Required **
                                </span>
                              )}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="description">
                              Description <span className="err_str">*</span>
                            </InputLabel>
                            <TextareaAutosize
                              minRows={6}
                              {...register("description", {
                                required: true,
                              })}
                              value={activites.description}
                            />
                          </Stack>
                          <Typography style={style}>
                            {errors.shortdescription && (
                              <span>Dscription Feild is Required **</span>
                            )}
                          </Typography>
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
                              {...register("price", {
                                required: true,
                              })}
                              value={activites.price}
                            />
                            <Typography style={style}>
                              {errors.price && <span> Price Required **</span>}
                            </Typography>
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
                              {...register("startDate", {
                                required: true,
                              })}
                              value={activites.startdate}
                            />
                            <Typography style={style}>
                              {errors.startDate && (
                                <span>Start date Required **</span>
                              )}
                            </Typography>
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
                              {...register("endDate", {
                                required: true,
                              })}
                              value={activites.enddate}
                            />
                            <Typography style={style}>
                              {errors.endDate && (
                                <span>End date Required **</span>
                              )}
                            </Typography>
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
                                value={activites.status}
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
