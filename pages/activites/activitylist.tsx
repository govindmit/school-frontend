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
import MiniDrawer from "../sidebar";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import AddActivity from "./addActivity";
import EditActivity from "./editActivity";
import ConfirmBox from "../commoncmp/confirmbox";

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
};

export default function ActivityList() {
  const [activites, setactivites] = useState<any>([]);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [All, setAll] = useState(0);
  const [Upcommig, setUpcommig] = useState(0);
  const [Past, setPast] = useState(0);
  const [Current, setCurrent] = useState(0);
  const [newActivityOpen, setnewActivityOpen] = React.useState(false);
  const [editActivityOpen, seteditActivityOpen] = React.useState(false);
  const [tabFilterData, settabFilterData] = useState<any>([]);
  const [deleteConfirmBoxOpen, setdeleteConfirmBoxOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [editid, seteditid] = useState<any>(0);
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


  //get activites
  const url = `${api_url}/getActivity`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: auth_token,
        },
      });
      const json = await response.json();
      setactivites(json.data);
      setsearchdata(json.data);
      setAll(json.data.length);
    } catch (error) {
      console.log("error", error);
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

  //pagination
  const [row_per_page, set_row_per_page] = useState(5);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
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
    setdeleteConfirmBoxOpen(true);
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
        setdeleteConfirmBoxOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // add activity from popup 
  function handleNewActivityFormOpen() {
    setnewActivityOpen(true);
  }
  const closePoP = (data: any) => {
    setnewActivityOpen(false);
  };

  //edit activity popup
  function handleEditActivityOpen(id: any) {
    seteditActivityOpen(true);
    seteditid(id);
  }
  const closeEditPoP = (data: any) => {
    seteditActivityOpen(false);
  };

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
                onClick={handleNewActivityFormOpen}
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
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        className="filter-list"
                        label={`All (${All})`}
                        {...a11yProps(0)}
                      // onClick={handleAll}
                      />
                      <Tab
                        label={`Upcomming ()`}
                        {...a11yProps(1)}
                      //onClick={handleActive}
                      />
                      <Tab
                        label={`Past ()`}
                        {...a11yProps(2)}
                      //onClick={handleInActive}
                      />
                      <Tab
                        label={`Current ()`}
                        {...a11yProps(3)}
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
                          startDate,
                          status,
                          endDate,
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
                            <TableCell align="left">{type === 1 ? "Paid" : "Free"}</TableCell>
                            <TableCell align="left">{startDate}</TableCell>
                            <TableCell align="left">{endDate}</TableCell>
                            <TableCell align="left">{status === 1 ? "Active" : "Draft"}</TableCell>
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
                                  onClick={() =>
                                    handleEditActivityOpen(item.id)
                                  }
                                >
                                  <FiEdit />
                                </IconButton>
                                <IconButton
                                  className="action-delete"
                                  style={{ color: "#F95A37" }}
                                  onClick={() => openDelete(item)}
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
                {activites == "" ? <h3>No Record found</h3> : ""}
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
      {newActivityOpen ? (
        <AddActivity open={newActivityOpen} closeDialog={closePoP} />
      ) : (
        ""
      )}

      {editActivityOpen ? (
        <EditActivity
          id={editid}
          open={editActivityOpen}
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
