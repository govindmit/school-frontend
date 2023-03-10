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
  Checkbox,
  MenuItem,
  FormControl,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsTelegram } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { api_url, auth_token, base_url } from "../../api/api";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import MiniDrawer from "../../sidebar";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainFooter from "../../commoncmp/mainfooter";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import getwayService from "../../../services/gatewayService";
import commmonfunctions from "../../../commonFunctions/commmonfunctions";
import { useForm, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";

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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
enum typeEnum {
  Free = "Free",
  Paid = "Paid",
}

enum statusEnum {
  Active = "Active",
  Archive = "Archive",
  Draft = "Draft",
}
type FormValues = {
  name: string;
  type: typeEnum;
  payment: number;
  image: any;
  shortdescription: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  status: statusEnum;
  startDates: string;
};
type HTMLData = {
  content: { "mycustom-html": string };
};
export default function Guardians() {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [activity, setActivity] = useState<FormValues | any>("");
  const [htmlData, setHtmlData] = useState<HTMLData>({
    content: { "mycustom-html": "<p>demo</p>" },
  });
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

  const [openThank, setOpenThank] = React.useState(false);
  const handleThanksOpen = () => setOpenThank(true);
  const handleThanksClose = () => setOpenThank(false);

  const router = useRouter();
  const activityid = router?.query?.activityId;

  var Checkout: any;
  let creditBalance: any;
  let logintoken: any;

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

  const getActivityDetail = async () => {
    try {
      const response = await fetch(
        `${api_url}/getactivitydetails/${activityid}`,
        {
          method: "GET",
          headers: {
            Authorization: auth_token,
          },
        }
      );
      const res = await response.json();

      setActivity(res.data);
      setHtmlData(res.data[0].description);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getActivityDetail();
    manageActivity();

  }, [activityid]);

  const handlePopupOpen = () => {
    setActivityData(activity[0]?.id)
    setActivityId(activity[0]?.id);
    setPrice(activity[0]?.price);
    getCustomerNotes(userDetail.id);
    handleClickOpen();
  }

  const insertRemainingNotesAmount = async () => {
    // setAmount(creditBalance)
    // setPrice(creditBalance)
    console.log("price =>", creditBalance);
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
              toast.success("Activity purchase Successfully !");
              setOpen(false);
              handleThanksOpen();
              setTimeout(() => {
                handleThanksClose();
                router.push("/user/activities");
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
              toast.success("Activity purchase Successfully !");
              handleClose();
              handleThanksOpen();
              setTimeout(() => {
                handleThanksClose();
                router.push("/user/activities");
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



  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                                {activity[0]?.name}
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
                                ${activity[0]?.price}
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
                      Activities
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  VIEW ACTIVITY
                </Typography>
              </Stack>
              <div className="buycss" style={{ textAlign: "end" }}>
                <Link
                  href="/user/activities"
                  style={{ color: "#1A70C5", textDecoration: "none" }}
                >
                  <Button variant="contained" startIcon={<ArrowBackIcon />}> Back To List</Button>
                </Link>
              </div>
            </Stack>
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <div className="view-main">
                <div className="view-mainleft">
                  <span
                    className="title view-activity"
                    style={{ fontSize: "40px" }}
                  >
                    {activity[0]?.name}
                  </span>
                  <div className="date" style={{ display: "flex" }}>
                    <div className="sdiv">
                      <h4>
                        <span>startDate : </span>{moment(activity[0]?.startDate, "YYYY.MM.DD").format("DD-MM-YYYY")}
                      </h4>
                    </div>
                    <div className="sdiv">
                      - &nbsp;<h4>
                        <span>endDate : </span>{moment(activity[0]?.endDate, "YYYY.MM.DD").format("DD-MM-YYYY")}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="view-mainright">
                  {activity[0]?.price === 0 ? (
                    <div style={{ marginLeft: "55%" }}>
                      <h4 style={{ color: "#395ba9" }}>Free</h4>
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      <h4>Amount</h4> &nbsp;&nbsp;
                      <h3 style={{ color: "orangered", fontSize: "24px" }}>
                        ${activity[0]?.price}
                      </h3>
                    </div>
                  )}
                </div>
              </div>
              {/* <p>{activity[0]?.description}</p>  */}
              <div
                dangerouslySetInnerHTML={{
                  __html: activity[0]?.description,
                }}
              ></div>
              <div
                className="font-size-15"
                dangerouslySetInnerHTML={{
                  __html: activity[0]?.shortDescription,
                }}
              ></div>
              <br />
              <div style={{ textAlign: "end" }}>
                <Button variant="contained" size="large" className="btnCustomerdetailPay" onClick={handlePopupOpen}>
                  Buy
                </Button>
              </div>
            </Card>
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
    </>
  );
}
