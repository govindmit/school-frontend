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
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
  SelectChangeEvent,
  InputLabel,
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
import usePagination from "./pagination";
import ConfirmBox from "./confirmbox";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return <Box sx={{}} {...other} />;
}

export default function ActivityList() {
  const [activites, setactivites] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [alldata, setalldata] = useState(0);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //get data
  const url = `${api_url}getactivity`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: auth_token,
        },
      });
      const json = await response.json();
      //console.log(json.data);
      setactivites(json.data);
      setsearchdata(json.data);
      setalldata(json.data.length);
    } catch (error) {
      //console.log("error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      setactivites(searchdata);
    } else {
      const filterres = searchdata.filter((item: any) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      const dtd = filterres;
      setactivites(dtd);
    }
  };

  //pagination
  // let [page, setPage] = useState(1);
  // const PER_PAGE = 5;
  // const count = Math.ceil(activites.length / PER_PAGE);
  // const DATA = usePagination(activites, PER_PAGE);
  // const handlePageChange = (e: any, p: any) => {
  //   setPage(p);
  //   DATA.jump(p);
  // };

  const [status, setstatus] = React.useState("");
  const handleSelectChange = (event: SelectChangeEvent) => {
    setstatus(event.target.value as string);
    if (event.target.value === "") {
      setactivites(searchdata);
    } else {
      const filterresult = searchdata.filter((item: any) => {
        return item.status.includes(event.target.value);
      });
      const dtdd = filterresult;
      setactivites(dtdd);
    }
  };

  //delete user
  const [deleteData, setDeleteData] = useState<any>({});
  function openDelete(data: any) {
    setOpen(true);
    setDeleteData(data);
  }
  async function deleteUser() {
    await axios({
      method: "DELETE",
      url: `${api_url}deleteactivity/${deleteData.id}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        console.log("Success:", data);
        toast.success("Activity Deleted Successfully !");
        setOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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
                    <Item style={{ marginRight: "10px" }}>Current({0})</Item>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={{ padding: "5px" }}
                >
                  <Stack>
                    <FormControl fullWidth style={{ width: "200px" }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        size="small"
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Archive">Archive</MenuItem>
                        <MenuItem value="Draft">Draft</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <FormControl>
                    <TextField
                      placeholder="Search..."
                      size="small"
                      value={searchquery}
                      type="search..."
                      onInput={(e) => handleSearch(e)}
                    />
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
                    {/* {DATA.currentData()} */}
                    {activites &&
                      activites.map((item: any, key: any) => {
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
                                <IconButton onClick={() => openDelete(item)}>
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
                {/* <Pagination
                  count={count}
                  page={page}
                  color="primary"
                  onChange={handlePageChange}
                /> */}
              </Stack>
            </Card>
          </Container>
          <ConfirmBox
            open={open}
            closeDialog={() => setOpen(false)}
            title={deleteData?.name}
            deleteFunction={deleteUser}
          />
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
