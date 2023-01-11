import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
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
import { api_url, auth_token, backend_url, base_url } from "../../api/hello";
import { toast } from "react-toastify";
import { PhotoCamera } from "@mui/icons-material";

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
  const [activites, setactivites] = useState<FormValues | any>([]);
  const [image, setImage] = useState<FormValues | any>("");

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

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
        //console.log(json.data[0]);
        setactivites(json.data[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  //console.log(activites);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({});
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data, "hii");
    //console.log(data.image[0]);
    //return false;
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
      method: "PUT",
      url: `${api_url}${end_point}/${id}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        //console.log("Success:", data);
        if (data.status === 201) {
          toast.success("Activity Updated Successfully !");
          const redirect = () => {
            router.push("/activites/activitylist");
          };
          setTimeout(redirect, 5000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
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
                    {image ? (
                      <Avatar
                        style={{ marginLeft: "90px" }}
                        alt="Remy Sharp"
                        src={`${URL.createObjectURL(image)}`}
                        sx={{ width: 150, height: 150 }}
                      />
                    ) : (
                      <Avatar
                        style={{ marginLeft: "90px" }}
                        alt="Remy Sharp"
                        src={`${backend_url}${activites.image}`}
                        sx={{ width: 150, height: 150 }}
                      />
                    )}
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={
                        <img
                          src="/Vect.png"
                          alt=""
                          style={{ color: "white" }}
                        ></img>
                      }
                      style={{ marginBottom: "10px", marginTop: "10px" }}
                      sx={{ border: "1.5px solid #1A70C5" }}
                      color="primary"
                    >
                      <Typography>Upload Image</Typography>
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={uploadToClient}
                      />
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
                              {...register("name")}
                              value={activites.name}
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
                                {...register("type")}
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
                              {...register("shortdescription")}
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
                              {...register("description")}
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
                              {...register("price")}
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
                              {...register("startDate")}
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
                              {...register("endDate")}
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
                                {...register("status")}
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
                          <Link
                            style={{ color: "red", textDecoration: "none" }}
                            href="/activites/activitylist"
                          >
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
                          </Link>
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
