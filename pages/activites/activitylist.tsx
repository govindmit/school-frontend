import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  Button,
  Breadcrumbs,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
  SelectChangeEvent,
  Tabs,
  Tab,
  Menu,
  Grid,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiFilterAlt, BiShow } from "react-icons/bi";
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
import ConfirmBox from "./confirmbox";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

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
  ParentId: string;
};

export default function ActivityList() {
  const [activites, setactivites] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [alldata, setalldata] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState<any>([]);
  const [custtype, setcusttype] = useState<any>([]);
  const [tabFilterData, settabFilterData] = useState<any>([]);
  const [All, setAll] = useState(0);
  const [active, setactive] = useState(0);
  const [inActive, setinActive] = useState(0);
  const [deleteConfirmBoxOpen, setdeleteConfirmBoxOpen] = React.useState(false);
  const [newCustOpen, setnewCustOpen] = React.useState(false);
  const [editCustOpen, seteditCustOpen] = React.useState(false);
  const [editid, seteditid] = useState<any>(0);
  const [value, setValue] = React.useState(0);
  const [custType, setCustType] = useState<any>(0);
  const [custStatus, setcustStatus] = useState<any>(2);
  const [sort, setsort] = useState<any>(0);
  const [conctName, setconctName] = useState<any>("");
  const [phoneNum, setphoneNum] = useState<any>("");
  const [pId, setpId] = useState<any>(0);
  const [parentId, setparentId] = useState<any>("");
  const [checked, setChecked] = React.useState(false);
  const [OpenCSV, setOpenCSV] = React.useState(false);
  const { register, handleSubmit } = useForm<FormValues>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // verify user login
  let logintoken: any;
  const router = useRouter();
  React.useEffect(() => {
    logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
  }, []);


  //get ACTIVITY data
  const url = `${api_url}/getactivity`;
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

  const [row_per_page, set_row_per_page] = useState(5);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  //pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = row_per_page;
  const count = Math.ceil(activites.length / PER_PAGE);
  const DATA = usePagination(activites, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
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
                      Activity
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  ACTIVITY
                </Typography>
              </Stack>
              <Button
                className="button-new"
                variant="contained"
                size="small"
                sx={{ width: 150 }}
              //onClick={handleNewCustomerOpen}
              >
                <b>Add New Activity</b>
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
                      //value={value}
                      //onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        className="filter-list"
                        label={`All (10})`}
                        {...a11yProps(0)}
                      //onClick={handleAll}
                      />
                      <Tab label={`Upcomming(17)`} {...a11yProps(1)}
                      //onClick={handleActive}
                      />
                      <Tab label={`Past (10)`} {...a11yProps(2)}
                      //onClick={handleInActive} 
                      />
                      <Tab label={`Current (10)`} {...a11yProps(3)}
                      //onClick={handleInActive} 
                      />
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
                                <form
                                //onSubmit={handleSubmit(onSubmit)}
                                >
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
                                            // onChange={(e: any) =>
                                            //   setCustType(e.target.value)
                                            // }
                                            // value={custType}
                                            >
                                              {/* <MenuItem value={0}>All</MenuItem>
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
                                                )} */}
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
                                              size="small"
                                            // onChange={(e: any) =>
                                            //   setcustStatus(e.target.value)
                                            // }
                                            // value={custStatus}
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
                                        &nbsp;&nbsp;
                                        <Button
                                          size="small"
                                          variant="contained"
                                          color="primary"
                                          sx={{ width: 150 }}
                                        //onClick={ResetFilterValue}
                                        >
                                          <b>Reset Filter</b>
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
                          <MenuItem {...bindTrigger(popupState)}
                          //onClick={ExportCSV}
                          >
                            Export
                            {/* <KeyboardArrowDownIcon /> */}
                          </MenuItem>
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
                {/* {myload ? <Loader /> : */}
                <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                        //onChange={handleCheck}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>TYPE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>START DATE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={100}>END DATE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography width={150}>AMOUNT(if paid)</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {DATA.currentData()} */}
                    {DATA.currentData() &&
                      DATA.currentData().map((item: any, key: any) => {
                        const {
                          id,
                          name,
                          price,
                          type,
                          startdate,
                          status,
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
                            <TableCell align="left">
                              1
                            </TableCell >
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">{startdate}</TableCell>
                            <TableCell align="left">{enddate}</TableCell>
                            <TableCell align="left">{status}</TableCell>
                            <TableCell align="left">{price}</TableCell>
                            <TableCell align="left">
                              <Stack direction="row" spacing={1} className="action">
                                <IconButton className="action-view">
                                  <Link
                                    href={`/customer/viewcustomer/${id}`}
                                    style={{
                                      color: "#26CEB3",
                                    }}
                                  >
                                    <BiShow />
                                  </Link>
                                </IconButton>
                                <IconButton
                                  className="action-edit"
                                // onClick={() =>
                                //   handleEditCustomerOpen(dataitem.id)
                                // }
                                >
                                  <FiEdit />
                                </IconButton>
                                <IconButton
                                  className="action-delete"
                                  style={{ color: "#F95A37" }}
                                //onClick={() => openDelete(dataitem)}
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
                {/* } */}
                {/* {users == "" ? <h3>No Record found</h3> : ""} */}
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
      {/* {newCustOpen ? (
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
      /> */}
      <ToastContainer />
    </>
  );
}
