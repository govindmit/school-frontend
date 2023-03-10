import {
  Card,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Grid,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Table,
  InputLabel,
  OutlinedInput,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { api_url, auth_token } from "../api/api";
import MainFooter from "../commoncmp/mainfooter";
import moment from "moment";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, SubmitHandler } from "react-hook-form";
import commmonfunctions from "../../commonFunctions/commmonfunctions";
import { AddLogs } from "../../helper/activityLogs";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type FormValues = {
  name: string;
  status: number;
  phone: number;
  customertype: number;
  email1: string;
  email2: string;
  number: number;
  contactName: string;
  printUs: string;
  parentId: number;
  userRole: String;
  agegroup: number;
  attentionto: number;
  alternatenumber: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalcode: number;
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
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

export default function ViewCustomer() {
  const [value, setValue] = React.useState(0);
  const [userDet, setUserDet] = useState<any>([]);
  const [creditdata, setCredituserData] = useState<any>([]);
  const [invoiceData, setGetinvoice] = useState<any>([]);
  const [editCustOpen, seteditCustOpen] = React.useState(false);
  const [editid, seteditid] = useState<any>(0);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [creditball, setcreditball] = React.useState(0);
  const [totalinv, settotalinv] = React.useState(2);
  const [btnahow, setbtnahow] = React.useState(false);
  const [spinner, setshowspinner] = React.useState(false);
  const [useraddr, setuseraddr] = React.useState<any>([]);
  const [customerId, setCustomerId] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [purchasedActivity, setPurchasedActivity] = React.useState<any>([]);
  const [dueAmount, setDueAmount] = React.useState([]);
  const [userUniqueId, setUserUniqId] = React.useState<any>();

  const router = useRouter();

  const handleClickOpen = () => {
    reset();
    // getUserDet();
    setOpen(true);
  };
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const verifyLoginUser = async () => {
    let login_token: any;
    commmonfunctions.VerifyLoginUser().then(res => {
      if (res.exp * 1000 < Date.now()) {
        localStorage.removeItem('QIS_loginToken');
        router.push("/");
      }
    });
    login_token = localStorage.getItem("QIS_loginToken");
    if (login_token === undefined || login_token === null) {
      router.push("/");
    }
    commmonfunctions.GivenPermition().then(res => {
      if (res.roleId !== 2) {
        router.push("/");
      }
    });

    const decoded: any = jwt_decode(login_token);
    setCustomerId(decoded?.id);
    fetchBallance(decoded?.id);
    getUserDet(decoded?.id);
    getActivityPurchasedlist(decoded?.id);
    getCreditData(decoded?.id);
    getUserInvoice(decoded?.id);
  };

  const getActivityPurchasedlist = async (id: any) => {
    try {
      const response = await fetch(`${api_url}/getactivitybyuserid/${id}`, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setPurchasedActivity(res?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUserDet = async (id: any) => {
    try {
      const response = await fetch(`${api_url}/getuserdetails/${id}`, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setUserDet(res.data[0]);
      const addr = JSON.parse(res.data[0]?.address);
      setuseraddr(addr);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCreditData = async (id: any) => {
    const response = await fetch(`${api_url}/creditballanceByUser/${id}`, {
      method: "GET",
      headers: {
        Authorization: auth_token,
      },
    });
    const res = await response.json();
    setCredituserData(res?.data);
  };

  const getUserInvoice = async (id: any) => {
    const response = await fetch(`${api_url}/getPendingInvoices/${id}`, {
      method: "POST",
      headers: {
        Authorization: auth_token,
      },
    });
    const res = await response.json();
    setGetinvoice(res);

  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // submit data
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setshowspinner(true);
    setBtnDisabled(true);
    const address = {
      add1: data.address1,
      add2: data.address2,
      city: data.city,
      state: data.state,
      postalcode: data.postalcode,
    };

    const reqData = {
      name: data.name,
      phone1: data.phone,
      useraddress: address,
    };
    await axios({
      method: "PUT",
      url: `${api_url}/edituser/${customerId}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          setshowspinner(false);
          setBtnDisabled(false);
          AddLogs(userUniqueId,`Customer Detail Updated id - (${(customerId)})`);
          toast.success("Customer Detail Updated Successfully !");
          reset();
          setTimeout(() => {
            handleClose();
            getUserDet(customerId);
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error("Somthing went wrong !");
        reset();
        setshowspinner(false);
        setBtnDisabled(false);
      });
  };

  //get credit ballance
  const fetchBallance = async (id: any) => {
    const apiurl = `${api_url}/creditballance/${id}`;
    try {
      const response = await fetch(apiurl, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const json = await response.json();
      setcreditball(json.creditBal);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  useEffect(() => {

    commmonfunctions.VerifyLoginUser().then(res => {
      setUserUniqId(res?.id)
    });

    verifyLoginUser();
  }, [customerId]);

  //edit customer
  function handleEditCustomerOpen(id: any) {
    handleClickOpen();
    seteditid(id);
  }

  const handleInvoiceListView = () => {
    router.push("/user/invoices/invoiceslist");
  }

  const handleCreditNotesList = () => {
    router.push("/user/creditinvoices/creditinvoicelist");
  }

  const handleActivityList = () => {
    router.push("/user/salesinvoices/salesinvoicelist");
  }

  //handle view less
  function handleViewLess() {
    settotalinv(2);
    setbtnahow(false);
  }


  let invoiceDue = invoiceData && invoiceData.reduce(
    (sum: any, item: any) => sum + item?.amount,
    0
  )

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
              style={{ padding: "8px", marginBottom: "25px" }}
            >
              <Stack>
                <Stack spacing={3}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link
                      key="1"
                      color="inherit"
                      href="/customer/customerslist"
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
                      Dashboard
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  DASHBOARD
                </Typography>
              </Stack>
            </Stack>
            {/*bread cump */}
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {" "}
                <Card
                  sx={{ minWidth: 275 }}
                  className="box-shadow"
                  style={{ borderRadius: "5px" }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      style={{ padding: "8px" }}
                    >
                      <Stack>
                        <Typography
                          variant="h3"
                          gutterBottom
                          style={{ fontWeight: "bold", color: "#333333" }}
                        >
                          Profile
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          style={{ color: "#1A70C5", cursor: "pointer" }}
                          onClick={() => handleEditCustomerOpen(customerId)}
                        >
                          <b>EDIT</b>
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack style={{ padding: "8px" }}>
                      <Box sx={{ display: "flex" }}>
                        <div id="profileImage">
                          <span id="fullName">
                            {" "}
                            {userDet &&
                              userDet.name &&
                              userDet.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <CardContent sx={{ flex: 1 }} className="text-grey">
                          <Typography component="h4" variant="h4">
                            {userDet && userDet.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            CUST-000{userDet?.id}
                          </Typography>
                          <Typography variant="subtitle1">
                            {userDet.email1}
                          </Typography>
                          <Typography variant="subtitle1">
                            {userDet.phone1}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Stack>
                    <Stack style={{ padding: "8px" }} className="text-grey">
                      <Typography>Address:</Typography>
                      <span>
                        {useraddr && useraddr?.add1 === ""
                          ? ""
                          : useraddr && useraddr?.add1 + ", "}
                        {useraddr && useraddr?.city === ""
                          ? ""
                          : useraddr && useraddr?.city + ", "}

                        {useraddr && useraddr?.state === ""
                          ? ""
                          : useraddr && useraddr?.state + ", "}

                        {useraddr && useraddr?.postalcode === ""
                          ? ""
                          : useraddr && useraddr?.postalcode}
                      </span>
                    </Stack>
                    <Stack style={{ padding: "8px" }}>
                      <Typography>
                        Created :{" "}
                        {userDet?.createdAt === null
                          ? ""
                          : moment(userDet?.createdAt, "YYYY-MM-DD").format("MMM DD, YYYY")}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
                <Grid item xs={12} md={12} style={{ marginTop: "2px" }}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ padding: "8px" }}
                      >
                        <Stack>
                          <Typography
                            variant="h5"
                            gutterBottom
                            style={{
                              fontWeight: "bold",
                              color: "#333333",
                            }}
                          >
                            Account Summery
                          </Typography>
                        </Stack>
                      </Stack>
                      <Table style={{ marginTop: "1px" }}>
                        <TableBody>
                          <TableRow hover tabIndex={-1}>
                            <TableCell align="left">Invoice Due: ${invoiceDue && invoiceDue}</TableCell>
                            <TableCell align="left">
                              Credit Balance: ${creditball && creditball}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Grid>
                <br />
                <Grid item xs={12} md={12}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ padding: "8px" }}
                      >
                        <Stack>
                          <Typography
                            variant="h5"
                            gutterBottom
                            style={{
                              fontWeight: "bold",
                              color: "#333333",
                            }}
                          >
                            Invoice
                          </Typography>
                        </Stack>
                        <Stack>
                          {btnahow === false ? (
                            <Typography
                              style={{ color: "#1A70C5", cursor: "pointer" }}
                              onClick={handleInvoiceListView}
                            >
                              <b>VIEW ALL</b>
                            </Typography>
                          ) : (
                            <Typography
                              style={{ color: "#1A70C5", cursor: "pointer" }}
                            // onClick={handleViewLess}
                            >
                              <b>VIEW LESS</b>
                            </Typography>
                          )}
                        </Stack>
                      </Stack>
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <p className="pendingcss">PENDING INVOICES</p>
                        </Box>
                        <TabPanel value={value} index={0}>
                          <Table style={{ marginTop: "1px" }}>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography>INVOICES</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>DATE</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>STATUS</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>BALANCE</Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            {invoiceData?.length > 0 ? (
                              invoiceData.slice(0, totalinv)
                                .map((item: any) => (
                                  item.status === "pending" ?
                                    <TableBody>
                                      <TableRow hover tabIndex={-1}>
                                        <TableCell align="left">
                                          {item.invoiceId}
                                        </TableCell>
                                        <TableCell align="left">
                                          {item?.invoiceDate}
                                          {/* {moment(item?.invoiceDate).format("MMM DD,YYYY")} */}
                                        </TableCell>
                                        <TableCell align="left">
                                          {item.status === "pending"
                                            ? "PENDING"
                                            : item.status}
                                        </TableCell>
                                        <TableCell align="left">
                                          $ {item.amount}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                    : ""
                                ))
                            ) : (
                              <h3>No record found</h3>
                            )}
                          </Table>
                        </TabPanel>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ padding: "8px" }}
                      >
                        <Stack>
                          <Typography
                            variant="h5"
                            gutterBottom
                            style={{
                              fontWeight: "bold",
                              color: "#333333",
                            }}
                          >
                            Open Credit Notes
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography
                            style={{ color: "#1A70C5", cursor: "pointer" }}
                            onClick={handleCreditNotesList}
                          >
                            <b>VIEW ALL</b>
                          </Typography>
                        </Stack>
                      </Stack>
                      <Table style={{ marginTop: "20px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>CREDIT NOTE</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>DATE</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>STATUS</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>TOTAL</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>BALANCE</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {creditdata?.length > 0 ? (
                            creditdata.slice(0, totalinv).map((item: any) => (
                              <TableRow hover tabIndex={-1}>
                                <TableCell align="left">
                                  INV-{item?.id}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(item?.createdAt).format(
                                    "MMM DD,YYYY"
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {item?.status === 1
                                    ? "APPROVED"
                                    : item?.status === 2
                                      ? "UNAPRROVED"
                                      : item?.status === 3
                                        ? "REJECTED"
                                        : item?.statuS}
                                </TableCell>
                                <TableCell align="left">
                                  $ {item?.amount}
                                </TableCell>
                                <TableCell align="left">
                                  $ {item?.amount}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <h3>No record found</h3>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ padding: "8px" }}
                      >
                        <Stack>
                          <Typography
                            variant="h5"
                            gutterBottom
                            style={{
                              fontWeight: "bold",
                              color: "#333333",
                            }}
                          >
                            Current Activity
                          </Typography>
                        </Stack>
                        <Stack>
                          <Typography
                            style={{ color: "#1A70C5", cursor: "pointer" }}
                            onClick={handleActivityList}
                          >
                            <b>VIEW ALL</b>
                          </Typography>
                        </Stack>
                      </Stack>
                      <Table style={{ marginTop: "20px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>ACTIVITY NAME</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>DATE</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>TYPE</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>AMOUNT</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {purchasedActivity?.length > 0 ? (
                            purchasedActivity?.slice(0, totalinv).map((item: any) => (
                              <TableRow hover tabIndex={-1}>
                                <TableCell align="left">
                                  {item?.activity_name}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(item?.createDate).format(
                                    "MMM DD,YYYY"
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  {item?.sales_status === 0 ? "PAID" : ""}
                                </TableCell>
                                <TableCell align="left">
                                  $ {item?.activity_price}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <h3>No record found</h3>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              >
                Edit Details
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Grid>
                  <Stack>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Name <span className="err_str"></span>
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            defaultValue={userDet?.name}
                            placeholder="Customer Name..."
                            fullWidth
                            size="small"
                            {...register("name", {
                              validate: (value: any) => {
                                return !!value.trim();
                              },
                            })}
                          />
                          {errors.name?.type === "validate" && (
                            <span style={style}>Field can't be blank *</span>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Email</InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            disabled
                            value={userDet?.email1}
                            // placeholder="Attention To..."
                            fullWidth
                            size="small"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Phone</InputLabel>
                          <OutlinedInput
                            type="text"
                            id="phone"
                            defaultValue={userDet?.phone1}
                            placeholder="Phone..."
                            fullWidth
                            size="small"
                            {...register("phone", {
                              validate: (value: any) => {
                                return !!value.trim();
                              },
                              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                              minLength: 10,
                              maxLength: 10,
                            })}
                          />
                          {errors.phone?.type === "validate" && (
                            <span style={style}>Field can't be blank *</span>
                          )}
                          {errors.phone?.type === "pattern" && (
                            <span style={style}>
                              Please enter valid number *
                            </span>
                          )}
                          {errors.phone?.type === "minLength" && (
                            <span style={style}>
                              Phone number must be in 10 digit*
                            </span>
                          )}
                          {errors.phone?.type === "maxLength" && (
                            <span style={style}>
                              Phone number must be in 10 digit*
                            </span>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Address 1</InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            defaultValue={useraddr?.add1}
                            placeholder="Address1..."
                            fullWidth
                            size="small"
                            {...register("address1")}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Address 2</InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            defaultValue={useraddr?.add2}
                            placeholder="Address2..."
                            fullWidth
                            size="small"
                            {...register("address2")}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">City</InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            defaultValue={useraddr?.city}
                            placeholder="City..."
                            fullWidth
                            size="small"
                            {...register("city")}

                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">State</InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            defaultValue={useraddr?.state}
                            placeholder="State..."
                            fullWidth
                            size="small"
                            {...register("state")}

                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Zip/Postal Code
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            defaultValue={useraddr?.postalcode}
                            placeholder="Postal Code..."
                            fullWidth
                            size="small"
                            {...register("postalcode")}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ width: 150 }}
                  autoFocus
                  disabled={btnDisabled}
                >
                  <b>Update</b>
                  <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
                    {spinner === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      ""
                    )}
                  </span>
                </Button>
                {/* <Button autoFocus onClick={handleClose}>
                  Save changes
                </Button> */}
              </DialogActions>
            </form>
          </BootstrapDialog>
          <MainFooter />
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
