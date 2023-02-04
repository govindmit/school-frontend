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
  IconButton,
  OutlinedInput,
  Pagination,
  Tabs,
  Tab,
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
import ConfirmBox from "../commoncmp/confirmbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCustomer from "./addNewCustomer";
import EditCustomer from "./editcustomer";
import { useRouter } from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//pagination function
function usePagination(data: any, itemsPerPage: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);
  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }
  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }
  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }
  function jump(page: any) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }
  return { next, prev, jump, currentData, currentPage, maxPage };
}

//filter form values
type FormValues = {
  customerType: number;
  status: number;
  phoneNumber: number;
  contactName: string;
  sorting: number;
};

export default function CustomerList() {
  const [users, setUsers] = useState<any>([]);
  const [custtype, setcusttype] = useState<any>([]);
  const [All, setAll] = useState(0);
  const [active, setactive] = useState(0);
  const [inActive, setinActive] = useState(0);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [deleteConfirmBoxOpen, setdeleteConfirmBoxOpen] = React.useState(false);
  const [newCustOpen, setnewCustOpen] = React.useState(false);
  const [editCustOpen, seteditCustOpen] = React.useState(false);
  const [editid, seteditid] = useState<any>(0);
  const [value, setValue] = React.useState(0);
  const { register, handleSubmit } = useForm<FormValues>();

  // verify user login
  let logintoken: any;
  const router = useRouter();
  React.useEffect(() => {
    logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUser();
    getType();
  }, []);

  //get customers(users) list
  const getUser = async () => {
    const url = `${api_url}/getuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
          "x-access-token": logintoken,
        },
      });
      const res = await response.json();
      setUsers(res.data.filter((dt: any) => dt.customerId !== null));
      setsearchdata(res.data.filter((dt: any) => dt.customerId !== null));
      setAll(res.data.filter((dt: any) => dt.customerId !== null).length);
      const activeUser = res.data.filter(
        (dt: any) => dt.status === 1 && dt.customerId !== null
      ).length;
      const inactiveUser = res.data.filter(
        (dt: any) => dt.status === 0 && dt.customerId !== null
      ).length;
      setactive(activeUser);
      setinActive(inactiveUser);
    } catch (error) {
      console.log("error", error);
    }
  };

  //get customers(users) type
  const getType = async () => {
    const url = `${api_url}/getType`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth_token,
          "x-access-token": logintoken,
        },
      });
      const res = await response.json();
      setcusttype(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  //apply filter
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setUsers([]);
    const reqData = {
      status: data.status,
      customerType: data.customerType,
      contactName: data.contactName,
      number: data.phoneNumber,
      sorting: data.sorting,
    };
    await axios({
      method: "POST",
      url: `${api_url}/getUser`,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "x-access-token": logintoken,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.data.filter((dt: any) => dt.customerId !== null));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // apply searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    console.log(typeof e.target.value);
    if (e.target.value === "") {
      setUsers(searchdata);
    } else {
      const filterres = searchdata.filter((item: any) => {
        return (
          item.customerId
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.email1.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.contactName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.printUs.toLowerCase().includes(e.target.value.toLowerCase()) ||
          `${item.phone1}`.includes(e.target.value)
        );
      });
      const dtd = filterres;
      setUsers(dtd);
    }
  };

  // pagination;
  const [row_per_page, set_row_per_page] = useState(5);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  let [page, setPage] = React.useState(1);
  const PER_PAGE = row_per_page;
  const count = Math.ceil(users.length / PER_PAGE);
  const DATA = usePagination(users, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  //delete user
  const [deleteData, setDeleteData] = useState<any>({});
  function openDelete(data: any) {
    setdeleteConfirmBoxOpen(true);
    setDeleteData(data);
  }
  async function deleteUser() {
    let reqData = { isDeleted: 1 };
    await axios({
      method: "DELETE",
      url: `${api_url}/deleteuser/${deleteData.id}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "x-access-token": logintoken,
      },
    })
      .then((data) => {
        toast.success("User Deleted Successfully !");
        setdeleteConfirmBoxOpen(false);
        getUser();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  //open close popup boxes
  function handleNewCustomerOpen() {
    setnewCustOpen(true);
  }
  const closePoP = (data: any) => {
    getUser();
    setnewCustOpen(false);
  };

  //edit customer
  function handleEditCustomerOpen(id: any) {
    seteditCustOpen(true);
    seteditid(id);
  }
  const closeEditPoP = (data: any) => {
    seteditCustOpen(false);
    getUser();
  };

  //tab functionality
  function handleAll() {
    getUser();
  }
  function handleActive() {
    const act = users.filter((a: any) => a.status === 1);
    setUsers(act);
  }
  function handleInActive() {
    const Inact = users.filter((a: any) => a.status === 0);
    setUsers(Inact);
  }

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
              style={{ padding: "8px", marginBottom: "15px" }}
            >
              <Stack>
                <Stack spacing={3}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link
                      key="1"
                      color="inherit"
                      href="/admin/dashboard"
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
              <Button
                className="button-new"
                variant="contained"
                size="small"
                sx={{ width: 150 }}
                onClick={handleNewCustomerOpen}
              >
                New Customer
              </Button>
            </Stack>
            {/*bread cump */}
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <TableContainer>
                {/*bread cump */}
                <Stack
                  style={{ marginBottom: "10px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        className="filter-list"
                        label={`All (${All})`}
                        {...a11yProps(0)}
                        onClick={handleAll}
                      />
                      <Tab label={`ACTIVE (${active})`} {...a11yProps(1)} onClick={handleActive} />
                      <Tab label={`INACTIVE (${inActive})`} {...a11yProps(2)} onClick={handleInActive} />
                    </Tabs>
                  </Box>

                  <Stack
                    direction="row"
                    alignItems="center"
                    className="fimport-export-box"
                  >
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem {...bindTrigger(popupState)}>
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
                                              {...register("customerType")}
                                              defaultValue={0}
                                            >
                                              <MenuItem value={0}>All</MenuItem>
                                              {custtype &&
                                                custtype.map(
                                                  (data: any, key: any) => {
                                                    return (
                                                      <MenuItem
                                                        key={key}
                                                        value={data.id}
                                                      >
                                                        {data.name}
                                                      </MenuItem>
                                                    );
                                                  }
                                                )}
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
                                              {...register("status")}
                                              size="small"
                                              defaultValue={2}
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
                                          <InputLabel htmlFor="sorting">
                                            Sort
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <Select
                                              labelId="demo-simple-select-label"
                                              id="demo-simple-select"
                                              size="small"
                                              {...register("sorting")}
                                              defaultValue={0}
                                            >
                                              <MenuItem value={0}>
                                                Date, Newest First
                                              </MenuItem>
                                              <MenuItem value={1}>
                                                Date, Oldest First
                                              </MenuItem>

                                              <MenuItem value={2}>
                                                Name, Ascending Order
                                              </MenuItem>
                                              <MenuItem value={3}>
                                                Name, Descending Order
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
                                          <InputLabel htmlFor="number">
                                            Phone Number
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <OutlinedInput
                                              type="text"
                                              id="number"
                                              placeholder="Phone Number..."
                                              fullWidth
                                              size="small"
                                              {...register("phoneNumber")}
                                            />
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid item xs={12} lg={3}>
                                        <Stack spacing={1}>
                                          <InputLabel htmlFor="contactname">
                                            Contact Name
                                          </InputLabel>
                                          <FormControl fullWidth>
                                            <OutlinedInput
                                              type="text"
                                              id="contactname"
                                              placeholder="Contact Name..."
                                              fullWidth
                                              size="small"
                                              {...register("contactName")}
                                            />
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
                                          ></span>
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
                          <MenuItem {...bindTrigger(popupState)}>
                            Export
                            <KeyboardArrowDownIcon />
                          </MenuItem>
                          {/* <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              Logout
                            </MenuItem>
                          </Menu> */}
                        </Box>
                      )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem
                            {...bindTrigger(popupState)}
                            style={{ border: "none," }}
                          >
                            Import
                            <KeyboardArrowDownIcon />
                          </MenuItem>
                          {/* <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              Logout
                            </MenuItem>
                          </Menu> */}
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
                        <Typography width={100}>COST. TYPE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={100}>CONT. NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={100}>PRINT US</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>PHONE 1</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={100}>PHONE 2</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DATA.currentData() &&
                      DATA.currentData().map((dataitem: any, key: any) => {
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            key={key}
                            className="boder-bottom"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.customerId}
                            </TableCell>
                            <TableCell align="left">{dataitem.name}</TableCell>
                            <TableCell align="left">
                              <a href="">{dataitem.email1}</a>
                            </TableCell>
                            <TableCell align="left">
                              <a href="">{dataitem.email2}</a>
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.CustomerType !== null
                                ? dataitem.CustomerType
                                : "INDIVIDUAL"}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.contactName}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.status === 1 ? (
                                <span style={{ color: "#02C509" }}>ACTIVE</span>
                              ) : (
                                <span style={{ color: "#FF4026" }}>
                                  INACTIVE
                                </span>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.printUs}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.phone1}
                            </TableCell>
                            <TableCell align="left">
                              {dataitem.phone2}
                            </TableCell>
                            <TableCell align="left">
                              <Stack
                                className="action"
                                direction="row"
                                spacing={1}
                              >
                                <IconButton className="action-view">
                                  <Link
                                    href={`/customer/viewcustomer/${dataitem.id}`}
                                    style={{
                                      color: "#26CEB3",
                                    }}
                                  >
                                    <BiShow />
                                  </Link>
                                </IconButton>
                                <IconButton
                                  className="action-edit"
                                  onClick={() =>
                                    handleEditCustomerOpen(dataitem.id)
                                  }
                                >
                                  <FiEdit />
                                </IconButton>
                                <IconButton
                                  className="action-delete"
                                  style={{ color: "#F95A37" }}
                                  onClick={() => openDelete(dataitem)}
                                >
                                  <RiDeleteBin5Fill />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                {users == "" ? <h3>No Record found</h3> : ""}
                <Stack
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  direction="row"
                  alignItems="right"
                  justifyContent="space-between"
                >
                  <Pagination
                    count={count}
                    page={page}
                    color="primary"
                    onChange={handlePageChange}
                  />
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue={5}
                      onChange={handlerowchange}
                      size="small"
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </TableContainer>
            </Card>
          </div>
        </Box>
      </Box>
      {newCustOpen ? (
        <AddCustomer open={newCustOpen} closeDialog={closePoP} />
      ) : (
        ""
      )}
      {editCustOpen ? (
        <EditCustomer
          id={editid}
          open={editCustOpen}
          closeDialogedit={closeEditPoP}
        />
      ) : (
        ""
      )}
      <ConfirmBox
        open={deleteConfirmBoxOpen}
        closeDialog={() => setdeleteConfirmBoxOpen(false)}
        title={deleteData?.name}
        deleteFunction={deleteUser}
      />
      <ToastContainer />
    </>
  );
}
