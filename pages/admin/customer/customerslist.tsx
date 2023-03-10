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
  Modal,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import { api_url, auth_token } from "../../api/hello";
import { BiFilterAlt, BiShow } from "react-icons/bi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ConfirmBox from "../../commoncmp/confirmbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCustomer from "./addNewCustomer";
import EditCustomer from "./editcustomer";
import { useRouter } from "next/router";
import { CSVDownload } from "react-csv";
import Loader from "../../commoncmp/myload";
import commmonfunctions from "../../../commonFunctions/commmonfunctions";
import MainFooter from "../../commoncmp/mainfooter";
import Image from "next/image";
import { BsTelegram } from "react-icons/bs";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomerList() {
  const [users, setUsers] = useState<any>([]);
  const [UserId, setUserId] = useState(0);
  const [custtype, setcusttype] = useState<any>([]);
  const [tabFilterData, settabFilterData] = useState<any>([]);
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
  const [custType, setCustType] = useState<any>(0);
  const [custStatus, setcustStatus] = useState<any>(2);
  const [sort, setsort] = useState<any>(0);
  const [conctName, setconctName] = useState<any>("");
  const [phoneNum, setphoneNum] = useState<any>("");
  const [pId, setpId] = useState<any>(0);
  const [parentId, setparentId] = useState<any>("");
  const [checked, setChecked] = React.useState(false);
  const [OpenCSV, setOpenCSV] = React.useState(false);
  const [custpermit, setcustpermit] = useState<any>([]);
  const [roleid, setroleid] = useState(0);
  const [share, setShare] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUser();
    getType();
  }, []);

  // verify user login and previlegs
  let logintoken: any;
  React.useEffect(() => {
    commmonfunctions.VerifyLoginUser().then(res => {
      if (res.exp * 1000 < Date.now()) {
        localStorage.removeItem('QIS_loginToken');
        localStorage.removeItem('QIS_User');
        router.push("/");
      }
    });
    logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
    commmonfunctions.GivenPermition().then(res => {
      if (res.roleId == 1) {
        setroleid(res.roleId);
        //router.push("/userprofile");
      } else if (res.roleId > 1 && res.roleId !== 2) {
        commmonfunctions.ManageCustomers().then(res => {
          if (!res) {
            router.push("/userprofile");
          } else {
            setcustpermit(res);
          }
        })
      } else {
        router.push("/userprofile");
      }
    })
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
      setUsers(res.data.filter((dt: any) => dt.customerId !== null && dt.roleId === 2));
      settabFilterData(res.data.filter((dt: any) => dt.customerId !== null && dt.roleId === 2))
      setsearchdata(res.data.filter((dt: any) => dt.customerId !== null && dt.roleId === 2));
      setAll(res.data.filter((dt: any) => dt.customerId !== null && dt.roleId === 2).length);
      setparentId(res.data.filter((dt: any) => dt.GeneratedParentId !== null && dt.roleId === 2));
      const activeUser = res.data.filter(
        (dt: any) => dt.status === 1 && dt.customerId !== null && dt.roleId === 2
      ).length;
      const inactiveUser = res.data.filter(
        (dt: any) => dt.status === 0 && dt.customerId !== null && dt.roleId === 2
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
      status: custStatus,
      customerType: custType,
      contactName: conctName,
      number: phoneNum,
      sorting: sort,
      ParentId: pId,
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
          setUsers(res.data.data.filter((dt: any) => dt.customerId !== null && dt.roleId === 2));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //reset filter value
  function ResetFilterValue() {
    setCustType(0);
    setcustStatus(2);
    setsort(0);
    setconctName("");
    setphoneNum("");
    setpId(0);
    getUser();
  }

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

  //edit customer popup
  function handleEditCustomerOpen(id: any) {
    seteditCustOpen(true);
    seteditid(id);
  }
  const closeEditPoP = (data: any) => {
    seteditCustOpen(false);
    //getUser();
  };

  //tab functionality
  function handleAll() {
    getUser();
  }
  function handleActive() {
    const act = tabFilterData.filter((a: any) => a.status === 1);
    setUsers(act);
  }
  function handleInActive() {
    const Inact = tabFilterData.filter((a: any) => a.status === 0);
    setUsers(Inact);
  }

  //send email functionality
  function handleShare(id: any) {
    setUserId(id);
    setShare(true);
  }
  const handleEmailClose = () => setShare(false);
  // send email func
  const handleSend = async () => {
    await axios({
      method: "POST",
      url: `${api_url}/sendUserEmail`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        toast.success(" Mail Send Successfully !");
        setShare(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(" Internal Server Error !");
      });
  };

  //check uncheck functionality
  const [userinfo, setUserInfo] = useState<any>({
    id: [],
  });
  const handleChanges = (e: any) => {
    const { value, checked } = e.target;
    const { id } = userinfo;
    if (checked) {
      setUserInfo({
        id: [...id, value],
      });
    }
    else {
      setUserInfo({
        id: id.filter((e: any) => e !== value),
      });
    }
  };

  function handleCheck(e: any) {
    var isChecked = e.target.checked;
    setChecked(isChecked)
    // var item = e.target.value;
    // console.log(item);
  }

  // console.log(checked);
  // console.log(userinfo.id);

  // Export to CSV
  const [mydata, setmydata] = useState<any>("")
  const [myload, setmyload] = useState(false)
  function ExportCSV() {
    let datas: {
      name: string; email1: string; email2: string;
      phone1: number; phone2: number, CustomerType: string;
      contactName: string; printUs: string, status: string
    }[] = [];
    if (userinfo.id.length > 0) {
      const ids = userinfo.id.join(",");
      const getUserByMultipleids = async () => {
        setmyload(true);
        const url = `${api_url}/getuserbymultipleid/${ids}`;
        try {
          const response = await fetch(url, {
            method: "get",
            headers: {
              Authorization: auth_token,
              "x-access-token": logintoken,
            },
          });
          const res = await response.json();
          if (res.data) {
            setmyload(false);
            res.data.map((item: any, key: any) => {
              datas.push({
                name: item.name,
                email1: item.email1,
                email2: item.email2,
                phone1: item.phone1,
                phone2: item.phone2,
                CustomerType: item.CustomerType,
                contactName: item.contactName,
                printUs: item.printUs,
                status: item.status === 1 ? "Active" : "InActive"
              })
            })
            setmydata(datas);
            setOpenCSV(true);
            setTimeout(() => {
              setOpenCSV(false);
              setUserInfo({
                id: []
              })
            }, 1000);
          }
        } catch (error) {
          console.log("error", error);
        }
      };
      getUserByMultipleids();
    } else {
      toast.error("Please Select Atleast One Customer !", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email1" },
    { label: "Alternate Email", key: "email2" },
    { label: "Phone Number", key: "phone1" },
    { label: "Altername Number", key: "phone2" },
    { label: "Contact Name ", key: "contactName" },
    { label: "Print Us ", key: "printUs" },
    { label: "Customer Type ", key: "CustomerType" },
    { label: "status", key: "status" },
  ];


  return (
    <>
      {OpenCSV && mydata.length > 0 ? <CSVDownload data={mydata} headers={headers} /> : ""}
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
              {custpermit && custpermit.canAdd === true || roleid === 1 ? (<Button
                className="button-new"
                variant="contained"
                size="small"
                sx={{ width: 150 }}
                onClick={handleNewCustomerOpen}
              >
                <b>New Customer</b>
              </Button>) : ""}
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
                      <Tab
                        label={`ACTIVE (${active})`}
                        {...a11yProps(1)}
                        onClick={handleActive}
                      />
                      <Tab
                        label={`INACTIVE (${inActive})`}
                        {...a11yProps(2)}
                        onClick={handleInActive}
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
                            <Container
                              className="filter-box"
                              style={{ padding: "0" }}
                            >
                              <Grid>
                                <Typography variant="h5">
                                  <b>Filter</b>
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                  <Stack
                                    style={{ marginTop: "10px" }}
                                    className="form-filter"
                                  >
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
                                              onChange={(e: any) =>
                                                setCustType(e.target.value)
                                              }
                                              value={custType}
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
                                              size="small"
                                              onChange={(e: any) =>
                                                setcustStatus(e.target.value)
                                              }
                                              value={custStatus}
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
                                              value={sort}
                                              onChange={(e: any) =>
                                                setsort(e.target.value)
                                              }
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
                                              value={pId}
                                              onChange={(e: any) =>
                                                setpId(e.target.value)
                                              }
                                            >
                                              <MenuItem value={0}>All</MenuItem>
                                              {parentId &&
                                                parentId.map(
                                                  (datas: any, key: any) => {
                                                    return (
                                                      <MenuItem
                                                        key={key}
                                                        value={datas.id}
                                                      >
                                                        {
                                                          datas.GeneratedParentId
                                                        }
                                                      </MenuItem>
                                                    );
                                                  }
                                                )}
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
                                              value={phoneNum}
                                              onChange={(e: any) =>
                                                setphoneNum(e.target.value)
                                              }
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
                                              value={conctName}
                                              onChange={(e: any) =>
                                                setconctName(e.target.value)
                                              }
                                            />
                                          </FormControl>
                                        </Stack>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        style={{
                                          marginBottom: "10px",
                                          marginTop: "15px",
                                        }}
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
                                          onClick={ResetFilterValue}
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
                          <MenuItem
                            {...bindTrigger(popupState)}
                            onClick={ExportCSV}
                          >
                            Export
                            <KeyboardArrowDownIcon />
                          </MenuItem>
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
                {myload ? <Loader /> :
                  <Table style={{ marginTop: "20px" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox onChange={handleCheck} />
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
                          <Typography width={100}>CUST. TYPE</Typography>
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
                                <Checkbox
                                  onChange={handleChanges} value={dataitem.id}
                                  //checked={checked}
                                  id={`check` + key}
                                />
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
                                {dataitem.phone2 === 0 ? "" : dataitem.phone2}
                              </TableCell>
                              <TableCell align="left">
                                <Stack
                                  className="action"
                                  direction="row"
                                  spacing={1}
                                >
                                  {custpermit && custpermit.canView === true || roleid === 1 ? (
                                    <IconButton className="action-view">
                                      <Link
                                        href={`/admin/customer/viewcustomer/${dataitem.id}`}
                                        style={{
                                          color: "#26CEB3",
                                        }}
                                      >
                                        <BiShow />
                                      </Link>
                                    </IconButton>) : ""}
                                  {custpermit && custpermit.canEdit === true || roleid === 1 ? (<IconButton
                                    className="action-edit"
                                    onClick={() =>
                                      handleEditCustomerOpen(dataitem.id)
                                    }
                                  >
                                    <FiEdit />
                                  </IconButton>)
                                    : ""}
                                  {custpermit && custpermit.canEdit === true || roleid === 1 ? (
                                    <Button className="idiv">
                                      <Image
                                        onClick={() => handleShare(dataitem.id)}
                                        src="/share.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={35}
                                      />
                                    </Button>) : ""}
                                  {custpermit && custpermit.canDelete === true || roleid === 1 ? (<IconButton
                                    className="action-delete"
                                    style={{ color: "#F95A37" }}
                                    onClick={() => openDelete(dataitem)}
                                  >
                                    <RiDeleteBin5Fill />
                                  </IconButton>) : ""}

                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>}
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
          <MainFooter />
        </Box>
      </Box>
      {
        newCustOpen ? (
          <AddCustomer open={newCustOpen} closeDialog={closePoP} />
        ) : (
          ""
        )
      }
      {
        editCustOpen ? (
          <EditCustomer
            id={editid}
            open={editCustOpen}
            closeDialogedit={closeEditPoP}
          />
        ) : (
          ""
        )
      }
      <ConfirmBox
        open={deleteConfirmBoxOpen}
        closeDialog={() => setdeleteConfirmBoxOpen(false)}
        title={deleteData?.name}
        deleteFunction={deleteUser}
      />
      <Modal
        open={share}
        onClose={handleEmailClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="ISBOX popup send">
          <div className="Isend">
            <div>
              <h3 className="ehead">Send Document</h3>
            </div>
            <div className="Isend">
              <h3 className="eshead">
                How would you like to deliver this document to the
                customer?
              </h3>
            </div>
          </div>
          <div className="sendEmailBox">
            <div>
              <Box>
                <BsTelegram
                  onClick={handleSend}
                  className="telegram"
                ></BsTelegram>
              </Box>
            </div>
            <div>
              <h3>Email</h3>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </>
  );
}
