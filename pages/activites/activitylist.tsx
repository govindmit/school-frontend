import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Breadcrumbs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MiniDrawer from "../sidebar";
import { BoxProps } from "@mui/system";
import { api_url, auth_token, base_url } from "../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return <Box sx={{}} {...other} />;
}

export default function ActivityList() {
  const [activites, setactivites] = useState([]);
  const [page, setPage] = React.useState(1);
  const [alldata, setalldata] = useState(0);
  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = async (id: any) => {
    //setOpen(true);
    alert(id);
    await axios({
      method: "DELETE",
      url: `${api_url}deleteactivity/${id}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        toast.success("Activity Deleted Successfully !");
      })
      .catch((error) => {});
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const url = `${api_url}getactivity`;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: auth_token,
          },
        });
        const json = await response.json();
        setactivites(json.data);
        setalldata(json.data.length);
      } catch (error) {}
    };
    fetchData();
  }, [page, activites]);
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
            style={{ padding: "15px" }}
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
                    key="2"
                    color="inherit"
                    href="/"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Activites
                  </Link>
                </Breadcrumbs>
              </Stack>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: "bold" }}
              >
                Activites
              </Typography>
            </Stack>
            <Link
              href="/activites/addactivity"
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" size="small" sx={{ width: 150 }}>
                <b>Add Activites</b>
              </Button>
            </Link>
          </Stack>
          {/*bread cump */}

          <Container>
            <Card style={{ padding: "10px" }}>
              <TableContainer sx={{ minWidth: 800 }}>
                {/*bread cump */}
                <Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Item style={{ color: "red", marginRight: "10px" }}>
                      ALL({alldata}){" "}
                    </Item>
                    <Item style={{ marginRight: "10px" }}> Upcomming(17) </Item>
                    <Item style={{ marginRight: "10px" }}>Past(2) </Item>
                    <Item style={{ marginRight: "10px" }}>Current(1) </Item>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ padding: "5px" }}
                >
                  <Stack>
                    <Stack spacing={2}></Stack>
                    <FormControl fullWidth sx={{ minWidth: 200 }}>
                      <Select id="demo-simple-select" size="small">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <TextField placeholder="Search..." size="small" />
                  </FormControl>
                </Stack>
                {/*bread cump */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>Activity Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {activites &&
                      activites.map((item, key) => {
                        const {
                          id,
                          name,
                          price,
                          status,
                          type,
                          startdate,
                          enddate,
                          description,
                          image,
                        } = item;
                        return (
                          <TableRow
                            key={key}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar src={`${base_url}${image}`} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{price}</TableCell>
                            <TableCell align="left">{status}</TableCell>
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">{startdate}</TableCell>
                            <TableCell align="left">{enddate}</TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={1}>
                                <IconButton>
                                  <Link
                                    href={`/activites/activitydetails/${id}`}
                                  >
                                    <BiShow />
                                  </Link>
                                </IconButton>
                                <IconButton>
                                  <Link href={`/activites/editactivity/${id}`}>
                                    <FiEdit />
                                  </Link>
                                </IconButton>
                                <IconButton onClick={() => handleClickOpen(id)}>
                                  <RiDeleteBin5Fill />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack style={{ padding: "10px" }}>
                <Pagination
                  count={10}
                  color="primary"
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </Card>
          </Container>
          <div>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {"Delete Activity?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleClose} autoFocus>
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
