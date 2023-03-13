import {
  Card,
  Stack,
  Typography,
  Breadcrumbs,
  Pagination,
  Grid,
  styled,
  OutlinedInput,
  Button,
  CircularProgress,
  InputLabel,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
} from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../sidebar";
import { api_url, auth_token, base_url } from "../../helper/config";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import commmonfunctions from "../../commonFunctions/commmonfunctions";
import MainFooter from "../commoncmp/mainfooter";
import Paper from "@mui/material/Paper";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import getwayService from "../../services/gatewayService";
import Loader from "../commoncmp/myload";
import Modal from '@mui/material/Modal';
import { AddLogs } from "../../helper/activityLogs";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 331,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

type FormValues = {
  name: string;
  payment: number;
  date: string;
  amount: string;
  email1: string;
  email2: string;
  number: number;
  printUs: string;
  parentId: number;
  userRole: String;
  agegroup: number;
  pregeneratedid: string;
};
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
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ActivityList() {
  const [activites, setactivites] = useState<any>([]);
  const todayDate = moment(new Date()).format("YYYY.MM.DD");
  const [open, setOpen] = React.useState(false);
  const [spinner, setshowspinner] = React.useState(false);
  const [Check, setCheck] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [userDetail, setUserDetail] = useState<any>([]);
  const [activityDetail, setActivityData] = useState<any>([]);
  const [creditAmount, setCreditAmount] = React.useState<any>("");
  const [creditNoteId, setcreditNoteId] = React.useState<any>("");
  const [price, setPrice] = React.useState<any>("");
  const [activityId, setActivityId] = React.useState<any>("");
  const [paymentPayMethod, setPaymentPayMethod] = React.useState<any>("");
  const [orderId, setorderId] = React.useState("");
  const [myload, setmyload] = useState(false);
  const [userUniqueId, setUserUniqId] = React.useState<any>();

  const [openThank, setOpenThank] = React.useState(false);
  const handleThanksOpen = () => setOpenThank(true);
  const handleThanksClose = () => setOpenThank(false);

  var Checkout: any;
  let creditBalance: any;

  const handlePaymentName = (data: any) => {
    const Checkout: any = (window as any).Checkout;
    console.log("Checkout=>", Checkout);
    setPaymentPayMethod(data);
  };

  let today = new Date();
  const todaysDate = moment(today).format("MMM DD,YYYY");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // verify user login
  let logintoken: any;
  const router = useRouter();
  React.useEffect(() => {
    commmonfunctions.VerifyLoginUser().then(res => {
      if (res.exp * 1000 < Date.now()) {
        localStorage.removeItem('QIS_loginToken');
      }
    });
    logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
    commmonfunctions.GivenPermition().then((res) => {
      if (res.roleId === 2) {
      } else {
        router.push("/");
      }
    });
  }, []);

  const manageActivity = async () => {
    let login_token: any;
    login_token = localStorage.getItem("QIS_loginToken");
    const decoded: any = jwt_decode(login_token);
    let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
      headers: {
        Authorization: auth_token,
      },
    });
    const userData = response?.data?.data[0];
    setUserDetail(userData);

  };

  useEffect(() => {
    commmonfunctions.VerifyLoginUser().then(res => {
      setUserUniqId(res?.id)
    });

    fetchData();
    manageActivity();
  }, []);

  //get activites
  const url = `${api_url}/getActivity`;
  const fetchData = async () => {
    try {
      setmyload(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
          "x-access-token": logintoken,
        },
      });
      const json = await response.json();
      setactivites(json.data);
      setmyload(false);
    } catch (error: any) {
      console.log("error", error);
      setmyload(false);
    }
  };

  const filterActivity = activites?.filter((a: any) => a?.startDate > todayDate || a?.startDate === todayDate);

  //pagination
  const [row_per_page, set_row_per_page] = useState(8);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  let [page, setPage] = useState(1);
  const PER_PAGE = row_per_page;
  const count = Math.ceil(filterActivity.length / PER_PAGE);
  const DATA = usePagination(filterActivity, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  const handlePopupOpen = (item: any) => {
    setActivityData(item)
    setActivityId(item?.id);
    setPrice(item?.price);
    getCustomerNotes(userDetail.id);
    handleClickOpen();
  }

  const insertRemainingNotesAmount = async () => {
    const reqData = {
      customerId: userDetail?.id,
      Amount: creditBalance,
      amountMode: 0,
    };
    await axios({
      method: "PUT",
      url: `${api_url}/insertAmount`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data: any) => {
        if (data) {
          AddLogs(userUniqueId,`Amount debit id - (${(userDetail?.id)})`);
          console.log("@@@@@@@@");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getCustomerNotes = async (id: any) => {
    try {
      const response = await fetch(`${api_url}/creditballance/${id}`, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setcreditNoteId(res?.CreditRequestId)
      setCreditAmount(res?.creditBal);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };
  if (Check === true) {
    var hideshowstyle = {
      display: "block",
    };
  } else {
    var hideshowstyle = {
      display: "none",
    };
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const Checkout: any = (window as any).Checkout
    let sageintacctorderID: any = "";

    if (userDetail?.id !== "" && activityId !== "") {
      setshowspinner(true);
      setBtnDisabled(true);

      if (Check === true) {
        const reqData = {
          amount: price,
          status: 0,
          userId: userDetail?.id,
          activityId: activityId,
          transactionId: "Trh4354654457",
          orderId: 46,
          createdBy: userDetail?.id,
        };
        await axios({
          method: "POST",
          url: `${api_url}/addSalesOrders`,
          data: reqData,
          headers: {
            Authorization: auth_token,
          },
        })
          .then(async (data: any) => {
            if (data) {
              insertRemainingNotesAmount();
              if (data?.status === 200) {
                setorderId(data.data.sageIntacctorderID);
                sageintacctorderID = data.data.sageIntacctorderID;
                // setAmount(creditBalance)
              }
              const unique = keyGen(5);
              const reqData1 = {
                totalAmount: totalPrice,
                paidAmount: totalPrice,
                transactionId: `case-${unique} `,
                amexorderId: data?.data?.sageIntacctorderID,
                paymentMethod:
                paymentPayMethod === "" ? "Cash" : paymentPayMethod,
                idForPayment: data?.data?.sageIntacctorderID,
                creditNotesId: creditNoteId,
              };
              transactionSave(reqData1);
              setshowspinner(false);
              setBtnDisabled(false);
              AddLogs(userUniqueId,`Activity purchase id - (${(data?.data?.data?.insertId)})`);
              toast.success("Activity purchase Successfully !");
              setOpen(false);
              handleThanksOpen();
              setTimeout(() => {
                handleThanksClose();
              }, 3000);
            }
          }).catch((error) => {
            // toast.error(error?.message);
            console.log("error", error);
            setshowspinner(false);
            setBtnDisabled(false);
          });

      } else {

        const reqData = {
          amount: price,
          status: 0,
          userId: userDetail?.id,
          activityId: activityId,
          transactionId: "Trh4354654457",
          orderId: 46,
          createdBy: userDetail?.id,
        };
        await axios({
          method: "POST",
          url: `${api_url}/addSalesOrders`,
          data: reqData,
          headers: {
            Authorization: auth_token,
          },
        })
          .then(async (data: any) => {
            if (data) {
              // insertRemainingNotesAmount();
              if (data?.status === 200) {
                setorderId(data.data.sageIntacctorderID);
                sageintacctorderID = data.data.sageIntacctorderID;
                // setAmount(creditBalance)
              }
              const unique = keyGen(5);
              const reqData1 = {
                totalAmount: price,
                paidAmount: price,
                transactionId: `case-${unique} `,
                amexorderId: data?.data?.sageIntacctorderID,
                paymentMethod:
                  paymentPayMethod === "" ? "Cash" : paymentPayMethod,
                idForPayment: data?.data?.sageIntacctorderID,
                creditNotesId: null,
              };
              transactionSave(reqData1);
              setshowspinner(false);
              setBtnDisabled(false);
              AddLogs(userUniqueId,`Activity purchase id - (${(data?.data?.data?.insertId)})`);
              toast.success("Activity purchase Successfully !");
              setOpen(false);
              handleThanksOpen();
              setTimeout(() => {
                handleThanksClose();
              }, 3000);
            }
          }).catch((error) => {
            // toast.error(error?.message);
            console.log("error", error);
            setshowspinner(false);
            setBtnDisabled(false);
          });
      }
    } else {

    }

    let orderamount = Check ? Math?.abs(price - creditBalance) : price;
    console.log("orderamount =>", orderamount);
    // payment getway
    if (paymentPayMethod === "Amex" && orderamount > 0) {

      if (price === 0) {
        toast.error("amount will not be $0 for AMFX payment method");
      } else {
        var requestData = {
          apiOperation: "CREATE_CHECKOUT_SESSION",
          order: {
            id: sageintacctorderID,
            amount: orderamount,
            currency: "QAR",
            description: "Orderd",
          },
          interaction: {
            // "returnUrl":`${process.env.NEXT_PUBLIC_REDIRECT_URL}/?orderid=${orderId}&paymentMethod=${paymentMethod}`,
            returnUrl: `${process.env.NEXT_PUBLIC_AMEX_SALES_ORDER_REDIRECT_URL}/?orderid=${sageintacctorderID}&paymentMethod=${paymentPayMethod}&creditNoteId=${creditNoteId}`,
            cancelUrl: `${process.env.NEXT_PUBLIC_AMEX_SALES_ORDER_CANCEL_URL}`,
            operation: "PURCHASE",
            merchant: {
              name: "QATAR INTERNATIONAL SCHOOL - ONLINE 634",
              address: {
                line1: "200 Sample St",
                line2: "1234 Example Town",
              },
            },
          },
        };

        await getwayService.getSession(requestData, async function (result: any) {
          if (result?.data?.result === "SUCCESS") {
            // setSessionId(result?.data.session.id)
            // setsuccessIndicator(result?.data.successIndicator);
            await Checkout.configure({
              session: {
                id: result?.data.session.id
              }
            });
            await Checkout.showPaymentPage();
          }

        })

      }
    }

    if (paymentPayMethod === "Amex" && Check === true && orderamount === 0) {
      try {

        const rendomTransactionId = keyGen(5);
        let reqData = {
          totalAmount: price,
          paidAmount: price,
          transactionId: `case-${rendomTransactionId} `,
          amexorderId: sageintacctorderID,
          paymentMethod: "Cash",
          idForPayment: sageintacctorderID,
          creditNotesId: creditNoteId
        };
        transactionSave(reqData);

      } catch (error: any) {
        console.log("Error ", error.message);
      }
    }
    if (paymentPayMethod === "CBQ") {
      getwayService.redirectCyberSourcePayment();
      toast.info(`As of Now This payment method is not supported ${paymentPayMethod} !`);
    }

    if (paymentPayMethod === "QPay") {
      toast.info(`As of Now This payment method is not supported ${paymentPayMethod} !`);
    }
  };
  const keyGen = (keyLength: any) => {
    var i,
      key = "",
      characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var charactersLength = characters.length;
    for (i = 0; i < keyLength; i++) {
      key += characters.substr(
        Math.floor(Math.random() * charactersLength + 1),
        1
      );
    }
    return key;
  };

  const transactionSave = async (data: any) => {
    await axios({
      method: "POST",
      url: `${api_url}/createTransaction`,
      data: data,
      headers: {
        Authorization: auth_token,
      },
    }).then((result: any) => {
      AddLogs(userUniqueId,`Transaction id - (${(data?.idForPayment)})`);
      console.log("transaction ");
    }).catch((error: any) => {
      console.log("error =>", error);
    });
  };

  let totalPrice =
    price === 0
      ? 0
      : price < creditAmount
        ? 0
        : Math?.abs(creditAmount - price);
  creditBalance =
    creditAmount === price
      ? creditAmount
      : creditAmount > price
        ? price
        : creditAmount;

console.log('@@@@@@@@@@@@@',filterActivity);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <div className="guardianBar">
            <div>
              <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
              >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Payment
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Box sx={{ width: "100%" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid className="">
                        <Stack style={{ marginTop: "5px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor="name">Customer Name</InputLabel>
                                {userDetail && userDetail?.name}
                              </Stack>
                            </Grid>
                          </Grid>
                        </Stack>
                        <Stack style={{ marginTop: "20px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor="name">Activity Name</InputLabel>
                                {activityDetail && activityDetail?.name}
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor="name">Date</InputLabel>
                                {todaysDate && todaysDate}
                              </Stack>
                            </Grid>
                          </Grid>
                        </Stack>
                        <Stack style={{ marginTop: "20px" }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor="name">
                                  Amount<span className="err_str"></span>
                                </InputLabel>
                                ${activityDetail && activityDetail?.price}
                              </Stack>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Stack spacing={1}>
                                <InputLabel htmlFor="payment">
                                  Payment Method
                                </InputLabel>
                                <FormControl fullWidth>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={"Cash"}
                                    size="small"
                                    disabled={
                                      (totalPrice === 0 && price === 0) ||
                                        (Check === true && creditAmount > price)
                                        ? true
                                        : false
                                    }
                                    {...register("payment")}
                                    onChange={(e) =>
                                      handlePaymentName(e.target.value)
                                    }
                                  >
                                    <MenuItem value={"Cash"}>Cash</MenuItem>
                                    <MenuItem value={"Amex"}>Amex</MenuItem>
                                    <MenuItem value={"QPay"}>QPay</MenuItem>
                                    <MenuItem value={"CBQ"}>CBQ</MenuItem>
                                  </Select>
                                </FormControl>
                              </Stack>
                            </Grid>
                          </Grid>
                          <Stack style={{ marginTop: "20px" }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={12}>
                                {price === 0 || creditAmount === 0 ? (
                                  ""
                                ) : price > 0 ? (
                                  <Checkbox
                                    onChange={(e) => setCheck(e.target.checked)}
                                    className="checkbox132"
                                  />
                                ) : (
                                  ""
                                )}
                                {creditAmount === 0
                                  ? ""
                                  : `Want to use credit balance :$${creditAmount}`}
                                <div>
                                  <h5 className="apply">Apply Payment</h5>
                                </div>
                                <Stack spacing={1}>
                                  <InputLabel htmlFor="name"></InputLabel>
                                  <p>
                                    Sales invoice amount :{" "}
                                    {price === "" ? "$0.00" : "$" + price}
                                  </p>
                                </Stack>
                                <Stack spacing={1} style={hideshowstyle}>
                                  <InputLabel htmlFor="name"></InputLabel>
                                  <div className="iadiv">
                                    <div className="hh red">
                                      Total Credit Balance:
                                    </div>
                                    <div>
                                      $
                                      {creditAmount === price
                                        ? creditAmount
                                        : creditAmount > price
                                          ? price
                                          : creditAmount}
                                    </div>
                                  </div>
                                </Stack>
                                <Stack spacing={1}>
                                  <InputLabel htmlFor="name"></InputLabel>
                                  {Check != true ? (
                                    <p>
                                      Total amount :{" "}
                                      {price === "" ? "$0.00" : "$" + price}
                                    </p>
                                  ) : (
                                    <p>
                                      Total amount : $
                                      {price === 0
                                        ? "0.00"
                                        : price < creditAmount
                                          ? "0.00"
                                          : Math?.abs(creditAmount - price)}
                                    </p>
                                  )}
                                </Stack>
                              </Grid>
                            </Grid>
                          </Stack>
                        </Stack>
                      </Grid>
                      <DialogActions>
                        <Button
                          type="submit"
                          variant="contained"
                          size="small"
                          sx={{ width: 150 }}
                          autoFocus
                          disabled={btnDisabled}
                        >
                          <b>Pay</b>
                          <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
                            {spinner === true ? (
                              <CircularProgress color="inherit" />
                            ) : (
                              ""
                            )}
                          </span>
                        </Button>
                      </DialogActions>
                    </form>
                    <ToastContainer />
                  </Box>
                </DialogContent>
              </BootstrapDialog>
            </div>
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
            </Stack>
            {/*bread cump */}
            {myload ? <Loader /> :
              <Card
                style={{ margin: "10px", padding: "15px" }}
                className="box-shadow"
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
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
                          description,
                        } = item;
                        return (
                          <Grid item xs={2} sm={3} md={3} key={key}>
                            <Item className="cardcss">
                              <h4 className="h4heading">Activity Name</h4>
                              <p className="actpara">{name}</p>
                              <span style={{ display: "flex" }}>
                                <span style={{ position: "absolute" }}>
                                  <h4 className="h4heading">Start Date</h4>
                                  <p className="actpara paradate"> {moment(startDate,"YYYY.MM.DD").format("MMM DD, YYYY")}</p>
                                </span>
                                <span>
                                  <h4 className="h4heading headingmargin">End Date</h4>
                                  <p className="actpara headingmargin paradate1">{moment(endDate,"YYYY.MM.DD").format("MMM DD, YYYY")}</p>
                                </span>
                              </span>
                              <h4 className="h4heading">Amount</h4>
                              <p className="actpara">${price}</p>

                              <span style={{ display: "flex" }}>
                                <span>
                                  <Link
                                    href={`/user/activitydetail/${id}`}
                                    style={{
                                      color: "#26CEB3",
                                    }}
                                  >
                                    <Button variant="contained" size="large" className="btnCustomerdetail">
                                      Detail
                                    </Button>
                                  </Link>
                                </span>
                                &emsp;
                                <span>
                                  <Button variant="contained" size="large" className="btnCustomerdetail1" onClick={() => handlePopupOpen(item)}>
                                    Buy
                                  </Button>
                                </span>
                              </span>
                            </Item>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Box>
                {filterActivity?.length === 0 ? <h3>No Record found</h3> : ""}
                <Stack
                  style={{
                    marginBottom: "10px",
                    marginTop: "10px",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                  direction="row"
                >
                  <Pagination
                    className="pagination"
                    count={count}
                    page={page}
                    color="primary"
                    onChange={handlePageChange}
                  />
                  {/* <FormControl>
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
                    </FormControl> */}
                </Stack>
              </Card>
            }
          </div>
          <div>
            <Modal
              open={openThank}
              // onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h2 style={{ textAlign: "center", color: "orangered", position: "relative", top: "30px" }}>Thank You for </h2>
                <br />
                <h2 style={{ textAlign: "center", color: "orangered", position: "relative", bottom: "30px" }}>Payment</h2>
              </Box>
            </Modal>
          </div>
          <MainFooter />
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
