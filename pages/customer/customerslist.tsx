import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  BoxProps,
  FormControl,
  TextField,
  Menu,
  MenuItem,
  Grid,
  InputLabel,
  Container,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../sidebar";
import { api_url, auth_token } from "../api/hello";
import { BiFilterAlt, BiShow } from "react-icons/bi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return <Box sx={{}} {...other} />;
}

enum custStatusEnum {
  Active = "1",
  InActive = "0",
  All = "2",
}

enum custTypeenum {
  All = "0",
  Impetus = "1",
  Infosys = "2",
  Wiprow = "2",
}

type FormValues = {
  status: custStatusEnum;
  customerType: custTypeenum;
};

export default function CustomerList() {
  const [users, setUsers] = useState([]);
  const [All, setAll] = useState(0);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    getUser();
  }, []);

  //get customers list
  const getUser = async () => {
    const url = `${api_url}/getuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setUsers(res.data);
      setsearchdata(res.data);
      setAll(res.data.length);
    } catch (error) {
      console.log("error", error);
    }
  };

  //apply filter
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    setUsers([]);
    const reqData = {
      status: data.status,
    };
    await axios({
      method: "POST",
      url: `${api_url}getuser`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setUsers(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      setUsers(searchdata);
    } else {
      const filterres = searchdata.filter((item: any) => {
        return item.firstname
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      const dtd = filterres;
      setUsers(dtd);
    }
  };

  // pagination

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <div className="guardianBar">
            {/*bread cump */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ padding: "8px" }}
            >
              <Stack>
                <Stack spacing={3}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link
                      key="1"
                      color="inherit"
                      href="/"
                      style={{ color: "#1A70C5", textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      key="2"
                      color="inherit"
                      href="/"
                      style={{ color: "#7D86A5", textDecoration: "none" }}
                    >
                      Customers
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  CUSTOMERS
                </Typography>
              </Stack>
              <Link
                href="/activites/addactivity"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" size="small" sx={{ width: 150 }}>
                  <b>New Customer</b>
                </Button>
              </Link>
            </Stack>
            {/*bread cump */}
            <Card style={{ margin: "10px", padding: "15px" }}>
              <TableContainer>
                {/*bread cump */}
                <Stack
                  style={{ marginBottom: "10px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Item
                      style={{
                        color: "red",
                        marginRight: "15px",
                        fontSize: "15px",
                      }}
                    >
                      ALL ({All})
                    </Item>
                    <Item style={{ marginRight: "15px", fontSize: "15px" }}>
                      ACTIVE (17){" "}
                    </Item>
                    <Item style={{ marginRight: "15px", fontSize: "15px" }}>
                      INACTIVE (2){" "}
                    </Item>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    style={{ padding: "5px" }}
                  >
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem
                            style={{
                              color: "#1A70C5",
                              fontWeight: "500",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            {...bindTrigger(popupState)}
                          >
                            <BiFilterAlt />
                            &nbsp; Filter
                          </MenuItem>
                          <Menu {...bindMenu(popupState)}>
                            <Container>
                              <Grid style={{ width: "1030px" }}>
                                <Typography variant="h5">
                                  <b>Filter</b>
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                  <Stack style={{ marginTop: "10px" }}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} md={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="name">
                                            Customer Type
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              size="small"
                                              defaultValue={0}
                                              {...register("customerType")}
                                            >
                                              <MenuItem value={0}>All</MenuItem>
                                              <MenuItem value={1}>
                                                Impetus
                                              </MenuItem>
                                              <MenuItem value={2}>
                                                Infosys
                                              </MenuItem>
                                              <MenuItem value={3}>
                                                Wiprow
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="enddate">
                                            Customer Status
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              defaultValue={2}
                                              {...register("status")}
                                              size="small"
                                            >
                                              <MenuItem value={2}>All</MenuItem>
                                              <MenuItem value={1}>
                                                Active
                                              </MenuItem>
                                              <MenuItem value={0}>
                                                InActive
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="name">
                                            Short
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              size="small"
                                            >
                                              <MenuItem value={10}>
                                                Date Oldest First
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Date Oldest Last
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Name Oldest First
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Name Oldest Last
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="Price">
                                            Parent Id
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              //onChange={handleChange}
                                              size="small"
                                            >
                                              <MenuItem value={10}>
                                                Pant0001
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Pant0002
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Pant0003
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} md={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="enddate">
                                            Phone NUmber
                                            <span className="err_str">*</span>
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              //onChange={handleChange}
                                              size="small"
                                            >
                                              <MenuItem value={10}>
                                                Ten
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Twenty
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Thirty
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="enddate">
                                            Contact Name
                                            <span className="err_str">*</span>
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              //onChange={handleChange}
                                              size="small"
                                            >
                                              <MenuItem value={10}>
                                                Ten
                                              </MenuItem>
                                              <MenuItem value={20}>
                                                Twenty
                                              </MenuItem>
                                              <MenuItem value={30}>
                                                Thirty
                                              </MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        style={{ marginBottom: "10px" }}
                                      >
                                        <Button
                                          size="small"
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          sx={{ width: 150 }}
                                          onClick={popupState.close}
                                        >
                                          <b>Apply Filter</b>
                                          <span
                                            style={{
                                              fontSize: "2px",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            {/* {spinner === true ? (
                                            <CircularProgress color="inherit" />
                                          ) : (
                                            ""
                                          )} */}
                                          </span>
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </Stack>
                                </form>
                              </Grid>
                            </Container>
                          </Menu>
                        </Box>
                      )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem
                            style={{
                              color: "#1A70C5",
                              fontWeight: "500",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            {...bindTrigger(popupState)}
                          >
                            Export
                            <KeyboardArrowDownIcon />
                          </MenuItem>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              Logout
                            </MenuItem>
                          </Menu>
                        </Box>
                      )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem
                            style={{
                              color: "#1A70C5",
                              fontWeight: "500",
                              cursor: "pointer",
                              marginRight: "5px",
                            }}
                            {...bindTrigger(popupState)}
                          >
                            Import
                            <KeyboardArrowDownIcon />
                          </MenuItem>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              Logout
                            </MenuItem>
                          </Menu>
                        </Box>
                      )}
                    </PopupState>
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
                </Stack>
                {/*bread cump */}
                <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Typography>ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>EMAIL 1</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>EMAIL 2</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>COST. TYPE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>CONT. NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PRINT US</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PHONE 1</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PHONE 2</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users.map((dataitem: any, key) => {
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            key={key}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell align="left">{dataitem.id}</TableCell>
                            <TableCell align="left">
                              {dataitem.firstname + dataitem.lastname}
                            </TableCell>
                            <TableCell align="left">{dataitem.email}</TableCell>
                            <TableCell align="left">
                              {dataitem.status === 1 ? (
                                <span style={{ color: "#02C509" }}>ACTIVE</span>
                              ) : (
                                <span style={{ color: "#FF4026" }}>
                                  IACTIVE
                                </span>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.contact}
                            </TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={1}>
                                <IconButton>
                                  <Link
                                    href={`/activites/activitydetails/1`}
                                    style={{
                                      color: "#26CEB3",
                                    }}
                                  >
                                    <BiShow />
                                  </Link>
                                </IconButton>
                                <IconButton>
                                  <Link
                                    href={`/activites/editactivity/1`}
                                    style={{
                                      color: "#DFBF19",
                                    }}
                                  >
                                    <FiEdit />
                                  </Link>
                                </IconButton>
                                <IconButton style={{ color: "#F95A37" }}>
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
            </Card>
          </div>
        </Box>
      </Box>
    </>
  );
}
