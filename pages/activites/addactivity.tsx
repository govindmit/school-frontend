import {
  Box,
  BoxProps,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import MiniDrawer from "../sidebar";
import Link from "next/link";
import { PhotoCamera } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Addactivity() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //console.log(data);
    //console.log(data.image[0]);
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
    const end_point = "addactivity";
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
        //console.log("Success:", data);
        if (data.status === 201) {
          toast.success("Activity Added Successfully !");
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
                Add Activites
              </Link>
            </Breadcrumbs>
          </Stack>
          <Typography variant="h5" gutterBottom style={{ fontWeight: "bold" }}>
            ADD ACTIVITES
          </Typography>
        </Stack>
        <Container style={{ backgroundColor: "white", marginBottom: "30px" }}>
          <Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                style={{ marginBottom: "5PX" }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{ width: 200 }}
                >
                  <b>Upload</b>
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    {...register("image", {
                      required: true,
                    })}
                  />
                </Button>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <PhotoCamera />
                </IconButton>
              </Stack>
              <Typography style={style}>
                {errors.image && <span>Image Feild is Required **</span>}
              </Typography>
              <Stack style={{ marginTop: "15px" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">
                        Activity Name <span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="Activity Name..."
                        fullWidth
                        {...register("name", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.name && <span>Name Feild is Required **</span>}
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
                          defaultValue={"Free"}
                        >
                          <MenuItem value="Free">Free</MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                        </Select>
                        <Typography style={style}>
                          {errors.type && (
                            <span>Type Feild is Required **</span>
                          )}
                        </Typography>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="shortdescription">
                        Short Description <span className="err_str">*</span>
                      </InputLabel>
                      <TextareaAutosize
                        minRows={4}
                        {...register("shortdescription", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.shortdescription && (
                          <span>Short dscription Feild is Required **</span>
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
                      />
                      <Typography style={style}>
                        {errors.shortdescription && (
                          <span>Dscription Feild is Required **</span>
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="Price">
                        Price <span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="Price..."
                        fullWidth
                        {...register("price", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.price && (
                          <span> Price Feild is Required **</span>
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="enddate">
                        Start Date <span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        type="date"
                        id="enddate"
                        {...register("startDate", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.startDate && (
                          <span>Start date Feild is Required **</span>
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="enddate">
                        End Date <span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        fullWidth
                        type="date"
                        id="enddate"
                        {...register("endDate", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.endDate && (
                          <span>End date Feild is Required **</span>
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
                          defaultValue={"Active"}
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Archive">Archive</MenuItem>
                          <MenuItem value="Draft">Draft</MenuItem>
                        </Select>
                        <Typography style={style}>
                          {errors.status && (
                            <span>Status Feild is Required **</span>
                          )}
                        </Typography>
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: 200 }}
                    >
                      <b>Submit</b>
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </form>
          </Grid>
          <ToastContainer />
        </Container>
      </Box>
    </Box>
  );
}
