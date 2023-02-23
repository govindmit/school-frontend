import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../../api/hello";
import AddCustomer from "../../commoncmp/getCustomer";
import AddActivity from "../../commoncmp/getActivity";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import styled from "@emotion/styled";
// import commmonfunctions from "../commonFunctions/commmonfunctions";
const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

//dialog box
const BootstrapDialog = styled(Dialog)(({ theme }) => ({}));
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
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

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

export default function AddSalesOrder({
  open,
  closeDialog,
}: {
  open: any;
  closeDialog: any;
}) {
  const [value, setValue] = React.useState(0);
  const [spinner, setshowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [opens, setOpen] = React.useState(open);
  const [custtype, setcusttype] = React.useState<any>([]);
  const [customerId, setCustomerId] = React.useState<any>("");
  const [parentid, setparentid] = React.useState(0);
  const [parentname, setparentname] = React.useState<any>("");
  const [activityId, setActivityId] = React.useState<any>("");
  const [parentsid, setparentsid] = React.useState(0);
  const [parentsname, setparentsname] = React.useState<any>("");
  const [handleacctid, sethandleacctid] = React.useState("");
  const [price, setPrice] = React.useState<any>("");
  const [customerError, setCustomerError] = React.useState<any>("");
  const [activityError, setActivityError] = React.useState<any>("");
  const [paymentPayMethod, setPaymentPayMethod] = React.useState<any>("");



  let datee=Date();
  let creditAmount:any="3000"
  const todayDate = moment(datee).format("DD/MM/YYYY");
  const todaysDate = moment(datee).format("MMM DD,YYYY");

  const handleacctids = (e: any) => {
    sethandleacctid(e.target.value);
  }

  const handlePaymentName = (data: any) => {
    setPaymentPayMethod(data)
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [Check, setCheck] = React.useState(false);
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
    if (customerId === "") {
      setCustomerError("Customer field is Required *");
    } else {
      setCustomerError("");
    }
    if (activityId === "") {
      setActivityError("Activity field is Required *");
    } else {
      setActivityError("");
    }
    setshowspinner(true);
    setBtnDisabled(true);

    const reqData = {
      amount:price,
      status:0,
      userId:customerId,
      activityId:activityId,
      transactionId:"Trh4354654457",
      orderId:46,
      createdBy:customerId,
      createdDate:todayDate,
      paymentMethod:paymentPayMethod === "" ? "Cash" : paymentPayMethod
    };
    await axios({
      method: "POST",
      url: `${api_url}/addSalesOrders`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data: any) => {
        if (data) {
          setshowspinner(false);
          setBtnDisabled(false);
          toast.success("Sales Order Create Successfully !");
          closeDialog(false);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
        setshowspinner(false);
        setBtnDisabled(false);
      });
  };

  const closeDialogs = () => {
    closeDialog(false);
    setOpen(false);
  };

  const Getdata = (item: any) => {
    if (item) {
      setCustomerId(item?.id);
    }else{
      setCustomerId("");
    }
  };
  

  const GetActivitydata = (item: any) => {
    if (item) {
      setActivityId(item?.id);
      setPrice(item?.price)
    }else{
      setActivityId("");
      setPrice("")
    }
  };
  
  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

  return (
    <BootstrapDialog
      onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open={opens}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={closeDialogs}>
        New Sales Order
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>  
            <TabPanel value={value} index={0}>
              <Grid>
                <Stack style={{ marginTop: "5px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Customer Name</InputLabel>
                        <AddCustomer Data={Getdata} PId={parentid} pname={parentname}   />
                        {customerError &&  <span style={style}>Customer field is Required *</span>}
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack style={{ marginTop: "20px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name" >Service</InputLabel>
                        <AddActivity Data={GetActivitydata} PId={parentsid} pname={parentsname}/>
                        {activityError &&  <span style={style}>Activity field is Required *</span>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                      <InputLabel htmlFor="name">Date</InputLabel>
                      <OutlinedInput
                          type="text"
                          id="date"
                          value={todaysDate && todaysDate}
                          disabled
                          fullWidth
                          size="small"
                        />
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
                        <OutlinedInput
                          type="text"
                          id="amount"
                          value={price && price}
                          placeholder=" Service amount"
                          fullWidth
                          size="small"
                        />
                        
                      </Stack>
                     </Grid>
                    <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="payment">Payment Method</InputLabel>
                        <FormControl fullWidth>
                          { price > 0 ? 
                           <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           defaultValue={"Cash"}
                           size="small"
                           {...register("payment")}
                           onChange={(e) => handlePaymentName(e.target.value)}
                         >
                           <MenuItem value={"Cash"}>Cash</MenuItem>
                           <MenuItem value={"Amex"}>Amex</MenuItem>
                           <MenuItem value={"QPay"}>QPay</MenuItem>
                           <MenuItem value={"CBQ"}>CBQ</MenuItem>
                         </Select>
                           : 
                           <Select
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           defaultValue={"Cash"}
                           disabled
                           size="small"
                           {...register("payment")}
                           onChange={(e) => handlePaymentName(e.target.value)}
                         >
                           <MenuItem value={"Cash"}>Cash</MenuItem>
                         </Select>
                          
                          }
                        </FormControl>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack style={{ marginTop: "20px" }} >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12} >
                    {price === 0 ? <Checkbox  onChange={(e) => setCheck(e.target.checked)} disabled className="checkbox132"/>:price > 0? <Checkbox  onChange={(e) => setCheck(e.target.checked)} className="checkbox132"/>:<Checkbox  onChange={(e) => setCheck(e.target.checked)} disabled className="checkbox132"/>}
                      Want to use credit balance ${creditAmount}

                      <InputLabel htmlFor="name" className="paymentcolor">Apply Payment</InputLabel>
                      <Stack spacing={1} >
                        <InputLabel htmlFor="name"></InputLabel>
                        <p>Sales invoice Amount : ${price}</p>
                      </Stack>

                      <Stack spacing={1} style={hideshowstyle}>
                        <InputLabel htmlFor="name"></InputLabel>
                        <p>Total credit balance : ${creditAmount}</p>
                      </Stack>
                      <Stack spacing={1} >
                        <InputLabel htmlFor="name"></InputLabel>
                       {Check === true ? <p>Total amount : ${creditAmount-price}</p>:<p>Total amount : ${price}</p>} 
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
                </Stack>
              </Grid>

            </TabPanel>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ width: 150 }}
                autoFocus
                disabled={btnDisabled}
              >
                <b>Create</b>
                <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
                  {spinner === true ? <CircularProgress color="inherit" /> : ""}
                </span>
              </Button>
            </DialogActions>
          </form>
          <ToastContainer />
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
