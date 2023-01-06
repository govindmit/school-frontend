import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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

export default function View() {
  const [activites, setactivites] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    const url = `https://api-school.mangoitsol.com/api/getactivitydetails/${id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNqMjU4NTA5N0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IlNodWJoYW0jMTIiLCJpYXQiOjE2Njk2MDk1MTR9.I06yy-Y3vlE784xUUg7__YH9Y1w_svjkGPKQC6SKSD4",
          },
        });
        const json = await response.json();
        //console.log(json.data);
        setactivites(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ backgroundColor: "whitesmoke", padding: "50px" }}
        >
          {/*bread cump */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack>
              <Stack spacing={2}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  <Link key="1" color="inherit" href="/">
                    Home
                  </Link>
                  <Link
                    key="2"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    Activites
                  </Link>
                </Breadcrumbs>
              </Stack>
              <Typography variant="h5" gutterBottom>
                Activites
              </Typography>
            </Stack>
            <Button variant="contained" size="small">
              Add Activity
            </Button>
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
                  <Item>
                    {" "}
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                      />
                      <CardContent></CardContent>
                    </Card>
                  </Item>
                </Grid>
                <Grid item xs={2} sm={4} md={8}>
                  <Item>
                    <Typography>VIEW ACTIVITES</Typography>
                    <form>
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
                                name="name"
                                placeholder="Activity Name..."
                                fullWidth
                              />
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
                            </Stack>
                          </Grid>
                          <Grid item xs={12}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="description">
                                Description <span className="err_str">*</span>
                              </InputLabel>
                              <TextareaAutosize minRows={6} />
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
                                name="name"
                                placeholder="Activity Name..."
                                fullWidth
                              />
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
                                name="enddate"
                                placeholder="enddate."
                              />
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
    </>
  );
}
