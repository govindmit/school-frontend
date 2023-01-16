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
}
type FormValues = {
  status: custStatusEnum;
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
    const url = `${api_url}getuser`;
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
                    <Item style={{ color: "red", marginRight: "15px" }}>
                      ALL ({All})
                    </Item>
                    <Item style={{ marginRight: "15px" }}>Drafts (17) </Item>
                    <Item style={{ marginRight: "15px" }}>Outstanding (2)</Item>
                    <Item style={{ marginRight: "10px" }}>Past Due (1)</Item>
                    <Item style={{ marginRight: "10px" }}>Paid (1)</Item>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ padding: "5px" }}
                  >
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <Typography
                            style={{
                              color: "#1A70C5",
                              fontWeight: "500",
                              cursor: "pointer",
                              marginRight: "30px",
                            }}
                            {...bindTrigger(popupState)}
                          >
                            <BiFilterAlt /> Filter{" "}
                          </Typography>
                          <Menu {...bindMenu(popupState)}>
                            <Container>
                              <Grid>
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
                                            >
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
                                            Date Type
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
                                      <Grid item xs={12} md={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="Price">
                                            Short
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
                                      <Grid item xs={12} md={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="enddate">
                                            Open Ballance
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
                                            Credit Balance
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
                                            Chasing Candence
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
                                            Owner
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
                                            Parent Customer
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
                                            Customer Status
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              defaultValue={"All"}
                                              {...register("status")}
                                              size="small"
                                            >
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
                        </React.Fragment>
                      )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          <Typography
                            style={{
                              color: "#1A70C5",
                              fontWeight: "500",
                              cursor: "pointer",
                              marginRight: "30px",
                            }}
                            {...bindTrigger(popupState)}
                          >
                            Export
                            <KeyboardArrowDownIcon />
                          </Typography>

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
                        </React.Fragment>
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
                        <Typography>EMAIL ADD.</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>CON. NUM.</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PARENT ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACC. NO.</Typography>
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
                              {dataitem.status === 1 ? "ACTIVE" : "IACTIVE"}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.contact}
                            </TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={1}>
                                <IconButton>
                                  <Link href={`/activites/activitydetails/1`}>
                                    <BiShow />
                                  </Link>
                                </IconButton>
                                <IconButton>
                                  <Link href={`/activites/editactivity/1`}>
                                    <FiEdit />
                                  </Link>
                                </IconButton>
                                <IconButton>
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
