import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import {
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
import Link from "next/link";
import MiniDrawer from "../../sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { api_url, auth_token } from "../../api/hello";
import { ToastContainer, toast } from "react-toastify";

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

export default function View() {
  const router = useRouter();
  const { id } = router.query;
  const [activites, setactivites] = useState<activitesType | any>([]);
  const getactivity = async () => {
    await axios({
      method: "GET",
      url: `${api_url}getactivitydetails/${id}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        //console.log("Success:", data);
        setactivites(data.data.data[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    getactivity();
  }, []);
  //console.log(activites);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));

  const deleteActivity = async (id: any) => {
    //alert(id);
    await axios({
      method: "DELETE",
      url: `${api_url}deleteactivity/${id}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        //console.log("Success:", data);
        toast.success("Activity Deleted Successfully !");
        const redirect = () => {
          router.push("/activites/activitylist");
        };
        setTimeout(redirect, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ marginTop: "80px" }}
        >
          {/*bread cump */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: "20px" }}
          >
            <Stack>
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
                    style={{ color: "black", textDecoration: "none" }}
                    key="2"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    View Activites
                  </Link>
                </Breadcrumbs>
              </Stack>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                VIEW ACTIVITES
              </Typography>
            </Stack>
            <Grid>
              <Link
                style={{ color: "black", textDecoration: "none" }}
                key="2"
                color="inherit"
                href={`/activites/editactivity/${activites.id}`}
              >
                <Button
                  variant="outlined"
                  startIcon={<FiEdit3 />}
                  size="small"
                  style={{ color: "blue", borderColor: "blue" }}
                >
                  Edit
                </Button>
              </Link>
              <Button
                size="small"
                variant="outlined"
                style={{
                  color: "red",
                  borderColor: "red",
                  marginLeft: "10px",
                }}
                startIcon={<RiDeleteBinLine />}
                onClick={() => deleteActivity(activites.id)}
              >
                Delete
              </Button>
            </Grid>
          </Stack>
          {/*bread cump */}

          <Container
            component="main"
            style={{ backgroundColor: "white", padding: "20px" }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={2} sm={4} md={4}>
                  <Item style={{ textAlign: "center" }}>
                    <Avatar
                      style={{ marginLeft: "85px" }}
                      alt="Remy Sharp"
                      src={`https://api-school.mangoitsol.com/${activites.image}`}
                      sx={{ width: 150, height: 150 }}
                    />
                    <Typography
                      style={{ marginBottom: "10px", marginTop: "10px" }}
                    >
                      <p>
                        <b>{activites.name}</b>
                      </p>
                      <p>
                        <b>Created At : </b>
                      </p>
                    </Typography>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={8}>
                  <Item>
                    <Typography>
                      <b>VIEW ACTIVITES</b>
                    </Typography>
                    <form>
                      <Stack style={{ marginTop: "20px" }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="name">
                                Activity Name
                              </InputLabel>
                              <OutlinedInput
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Activity Name..."
                                fullWidth
                                value={activites.name}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="type">Type</InputLabel>
                              <FormControl>
                                <Select
                                  displayEmpty
                                  inputProps={{ "aria-label": "Without label" }}
                                  defaultValue={activites.type}
                                  readOnly
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
                              </InputLabel>
                              <TextareaAutosize
                                minRows={4}
                                value={activites.shortdescription}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="description">
                                Description
                              </InputLabel>
                              <TextareaAutosize
                                minRows={6}
                                value={activites.description}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="Price">Price</InputLabel>
                              <OutlinedInput
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Activity Name..."
                                fullWidth
                                value={activites.price}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="enddate">
                                Start Date
                              </InputLabel>
                              <OutlinedInput
                                fullWidth
                                type="date"
                                id="enddate"
                                name="enddate"
                                placeholder="enddate."
                                value={activites.startdate}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12} lg={3}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="startdate">
                                End Date
                              </InputLabel>
                              <OutlinedInput
                                fullWidth
                                type="date"
                                id="startdate"
                                value={activites.enddate}
                                readOnly
                              />
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={3}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="status">Status</InputLabel>
                              <FormControl>
                                <Select
                                  displayEmpty
                                  inputProps={{ "aria-label": "Without label" }}
                                  defaultValue={activites.status}
                                  readOnly
                                >
                                  <MenuItem value="Active">Active</MenuItem>
                                  <MenuItem value="Archive">Archive</MenuItem>
                                  <MenuItem value="Draft">Draft</MenuItem>
                                </Select>
                              </FormControl>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Stack>
                    </form>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
