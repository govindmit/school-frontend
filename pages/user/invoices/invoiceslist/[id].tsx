import {
    Card,
    Table,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    FormControl,
    TableContainer,
    TableHead,
    Menu,
    Button,
    Breadcrumbs,
    Box,
    Pagination,
    styled,
    OutlinedInput,
    Typography,
    Tabs,
    Tab,
} from "@mui/material";
import { BiFilterAlt } from "react-icons/bi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { BsTelegram } from "react-icons/bs";
import { Grid, InputLabel, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../../sidebar";
import axios from "axios";
import Select from "@mui/material/Select";
import moment from "moment";
import Image from "next/image";
import PopupState, {
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Script from "next/script";
import getwayService from "../../../../services/gatewayService"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import commmonfunctions from "../../../../commonFunctions/commmonfunctions";
import { api_url, auth_token } from "../../../api/hello";
import MainFooter from "../../../commoncmp/mainfooter";
import PDFService from "../../../../commonFunctions/invoicepdf"
import jwt_decode from "jwt-decode";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export interface FormValues {
    status: string;
    startDate: String;
    endDate: String;
    total: String;
    sort: String;
    invoiceId: String;
}

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

export default function UserInvoices() {
    const [getInvoices, setgetInvoices] = useState<FormValues | any>([]);
    const [Invoicedata, setInvoice] = useState<FormValues | any>([]);
    const [searchdata, setsearchdata] = useState([]);
    const [searchquery, setsearchquery] = useState("");
    const [custid, setcustid] = useState(0);
    const [sort, setSort] = useState<FormValues | any>("ASC");
    const [status, setStatus] = useState<FormValues | any>("All");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [invoiceId, setInvoiceId] = useState("");
    const [note, setNote] = useState<FormValues | any>([]);
    const [value, setValue] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [customerTotalCreditNoteBalance, setCustomerTotalCreditNoteBalance] = useState(0);
    const [customerCreditNoteRequestId, setCustomerCreditNoteRequestId] = useState(null);
    const [applyCreditNoteAmount, setApplyCreditNoteAmount] = useState(0);
    const [finalAmountToPay, setFinalAmountToPay] = useState(0);
    const [orderId, setorderId] = useState('');
    const [InvoiceAmount, setInvoiceAmount] = useState(0);
    const [invoiceStatus, setInvoiceStatus] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [customerID, setCustomerId] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [customerCreditNoteRemaingAmount, setCustomerCreditNoteRemaingAmount] = useState(0);
    var Checkout: any
    const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const router = useRouter();
    const [pop, setPop] = useState(false);
    const [share, setShare] = useState(false);
    const [id, setId] = useState();
    const [dollerOpen, setDollerOpen] = useState(false);
    const [recievedPay, setRecieved] = useState<FormValues | any>([]);
    const[sageCustomerId,setSageCustomerID]=useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    // verify user login and previlegs
    useEffect(() => {
        getDetailsOfCustomer();
        commmonfunctions.VerifyLoginUser().then(res => {
            if (res.exp * 1000 < Date.now()) {
                localStorage.removeItem('QIS_loginToken');
                localStorage.removeItem('QIS_User');
                router.push("/");
            }
            if (res && res?.id) {
                setcustid(res.id);
                Invoices(res.id);
            }
        });
        
    }, []);

    useEffect(() => {
        let search = router.query;
        let amexOrderId = search.orderid;
        let paymentMethod = search.paymentMethod;
        let creditRequestId = search.creditNoteId;
        let customerid = search.customerID;
        let remaingAmount = search.remaingAmount;
        let DBInvoiceid = search.invoiceiddb;
        if (paymentMethod && amexOrderId) {
          console.log("order created");
          buyActivity(amexOrderId, paymentMethod, creditRequestId,DBInvoiceid);
        }
      }, [router.query]);

      const getDetailsOfCustomer = async () => {
        let login_token: any;
        login_token = localStorage.getItem("QIS_loginToken");
        const decoded: any = jwt_decode(login_token);
        let response = await axios.get(`${api_url}/getuserdetails/${decoded.id}`, {
          headers: {
            Authorization: auth_token,
          },
        });
        const userData = response?.data?.data[0];
        setSageCustomerID(userData.sageCustomerId)
        
    
      };
      const buyActivity = async(amexOrderId:any,paymentMethod:any,creditNoteId:any,DBInvoiceid:any)=>{
        var generatedTransactionId = "";
        const data = {orderId :amexOrderId}
        var apiRequest = data;
        var requestUrl = await getwayService.getRequestUrl("REST", apiRequest);
        await getwayService.retriveOrder( requestUrl,async function (orderresult:any) {
              console.log("order result =>",orderresult);
              if(orderresult.status === 200){
              const amextransactionData = orderresult.data
              const transactionData = {
              idForPayment:amexOrderId,
              totalAmount:amextransactionData?.transaction[0].transaction.amount,
              paidAmount:amextransactionData?.transaction[0].transaction.amount,
              paymentMethod:paymentMethod,
              amexorderId:amexOrderId,
            
              transactionId:amextransactionData?.transaction[0].transaction.id,
              creditNotesId: creditNoteId
            }
              var ARRefrenceNumber =  "" ;
               await getwayService.transactionDataSaveInDB(transactionData,async function (result: any) {
               generatedTransactionId = result?.insetTransatction?.insertId
                ARRefrenceNumber=  await getwayService.generateRefrenceNumber(generatedTransactionId);
                console.log("ARRefrenceNumber =>",ARRefrenceNumber);
                await getwayService.getARInoviceRecordNumber(amexOrderId,async function (ARRecordNumberResult:any) {
                console.log("ARRecordNumberResult['RECORDNO'] =>",ARRecordNumberResult['RECORDNO']);
                
                 const data ={
                  customerId: sageCustomerId,
                   amount: amextransactionData?.transaction[0].transaction.amount,
                   ARpaymentMethod: "EFT",
                   referenceNumber: ARRefrenceNumber,
                   ARinvoiceRecordNumber: ARRecordNumberResult['RECORDNO']
                 }
                 console.log("data for apply pay =>",data);
                 await getwayService.createAndApplyPaymentARInvoice(data,async function (result: any) {
                 await updateInvoiceAfterPay(DBInvoiceid)
              
                  setTimeout(() => {
                     document.location.href = `${process.env.NEXT_PUBLIC_AMEX_CUSTOMER_PAY_INVOICE_CANCEL_URL}`;
                  }, 3000);
                  })
                });
    
               });
    
            
              
            
            }
            
          });
    }

    //get invoices by user id
    const Invoices = async (id: number) => {
        await axios({
            method: "POST",
            url: `${api_url}/getInvoicebyUser/${id}`,
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((res) => {
              
                setgetInvoices(res?.data);
                setInvoice(res?.data);
                setsearchdata(res?.data);
            })
            .catch((err) => { });
    };

    // pagination;
    const [row_per_page, set_row_per_page] = useState(5);
    function handlerowchange(e: any) {
        set_row_per_page(e.target.value);
    }
    let [page, setPage] = React.useState(1);
    const PER_PAGE = row_per_page;
    const count = Math.ceil(getInvoices?.length / PER_PAGE);
    const DATA = usePagination(getInvoices, PER_PAGE);
    const handlePageChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
    };

    //tab functionality
    const pending = Invoicedata?.filter((a: any) => a.status == "pending");
    const paid = Invoicedata?.filter((a: any) => a.status == "paid");
    const draft = Invoicedata?.filter((a: any) => a.status == "draft");
    const handleAll = () => {
        Invoices(custid);
    };
    const handlePaid = () => {
        const paids = Invoicedata.filter((a: any) => a.status == "paid");
        setgetInvoices(paids);
    };
    const handlePending = () => {
        const pendings = Invoicedata.filter((a: any) => a.status == "pending");
        setgetInvoices(pendings);
    };
    const handleDraft = () => {
        const drafts = Invoicedata.filter((a: any) => a.status == "draft");
        setgetInvoices(drafts);
    };


    // searching functionality
    const searchItems = (e: any) => {
        setsearchquery(e.target.value);
        if (e.target.value === "") {
            setgetInvoices(searchdata);
        } else {
            const filterres = getInvoices.filter((item: any) => {
                return (
                    item.status
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    item.invoiceId
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    moment(item?.invoiceDate, "DD/MM/YYYY")
                        .format("ll")
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    moment(item?.createdDate, "DD/MM/YYYY")
                        .format("ll")
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                );
            });
            const dtd = filterres;
            setgetInvoices(dtd);
        }
    };

    //generate pdf
    const generateSimplePDF = async (item: any) => {
        PDFService.generateSimplePDF(item);
    };

    // filter functionality
    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        let sdate = moment(startDate).format("DD/MM/YYYY");
        let edate = moment(endDate).format("DD/MM/YYYY");
        const reqData = {
            status: status,
            startDate: sdate === "Invalid date" ? "" : sdate,
            endDate: edate === "Invalid date" ? "" : edate,
            order: sort,
            amount: data.total.replace("$", ""),
            invoiceId: data.invoiceId,
        };
        await axios({
            method: "POST",
            url: `${api_url}/getInvoicebyUser/${custid}`,
            data: reqData,
        })
            .then((res) => {
                console.log("invoice =>",res);
                setgetInvoices(res?.data);
            })
            .catch((err) => { });
    };

    //reset filter
    const handleReset = () => {
        reset();
        setSort("ASC");
        setStatus("All");
        setStartDate(null);
        setEndDate(null);http://localhost:3000/user/invoices/invoiceslist?orderid=IN0082&paymentMethod=Amex&creditNoteId=null&remaingAmount=0&customerID=174&resultIndicator=143a3a0c8f104b2d&sessionVersion=5f6959f009&checkoutVersion=1.0.0
        setInvoiceId("");
        Invoices(custid);
    };

    //invoice payment 
    const handleClickOpen = (item: any) => {
        console.log(item, "itemmmmm");
        if (item.status == "paid") {
            setDollerOpen(false);
            toast.success("Already Paid!");
        } else {
            setRecieved(item);
            setDollerOpen(true);
        }
        setorderId(item.invoiceId);
        setInvoiceAmount(item.amount);
        setInvoiceStatus(item.status);
        setFinalAmountToPay(item.amount);
        setCustomerId(item.customerId);
        getCustomerNotes(item.customerId);
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
            console.log("CreditRequestId =>", res);
            setCustomerCreditNoteRequestId(res?.CreditRequestId)
            setCustomerTotalCreditNoteBalance(res?.creditBal);

        } catch (error: any) {
            console.log("error", error.message);
        }
    };

    const handleCheckBoxClick = async (e: any) => {
        console.log("event =>", e.target.checked);
        setIsChecked(e.target.checked);
        if (e.target.checked === true) {
            let applyCreditNoteAmout = customerTotalCreditNoteBalance > InvoiceAmount ? InvoiceAmount : customerTotalCreditNoteBalance;
            let creditNoteRemaingAmount = customerTotalCreditNoteBalance > InvoiceAmount ? customerTotalCreditNoteBalance - InvoiceAmount : 0;
            setApplyCreditNoteAmount(applyCreditNoteAmout);
            let actualPay = customerTotalCreditNoteBalance > InvoiceAmount ? 0 : InvoiceAmount - customerTotalCreditNoteBalance;
            setFinalAmountToPay(actualPay)

            console.log("creditNoteRemaingAmount =>", creditNoteRemaingAmount);
            setCustomerCreditNoteRemaingAmount(creditNoteRemaingAmount);
        } else {
            setApplyCreditNoteAmount(0);
            setFinalAmountToPay(InvoiceAmount);
            setCustomerCreditNoteRequestId(null);
        }
    }

    const handleCreate = async (id: any) => {
        // console.log(process.env.NEXT_PUBLIC_REDIRECT_URL,"Checkout =>",(window as any).Checkout);
        const Checkout: any = (window as any).Checkout
        const creditNotesId = isChecked ? customerCreditNoteRequestId : null
        console.log("payment method => ", paymentMethod, "isChcked =>", isChecked, "finaltopay =>", finalAmountToPay);
        if (paymentMethod === "Amex" && finalAmountToPay > 0) {
            if (finalAmountToPay === 0) {
                toast.error("amount will not be $0 for Amex payment method");
            } if (invoiceStatus === "draft") {
                toast.error("Invoice has status with Draft,Only Pending invoice Can Pay ");
            }
            else {
                console.log(customerID, "customerId", applyCreditNoteAmount, "=======> ", creditNotesId);
                var requestData = {
                    "apiOperation": "CREATE_CHECKOUT_SESSION",
                    "order": {
                        "id": orderId,
                        "amount": finalAmountToPay,
                        "currency": "QAR",
                        "description": "Orderd",
                    },
                    "interaction": {
                        "returnUrl": `${process.env.NEXT_PUBLIC_AMEX_CUSTOMER_PAY_INVOICE_REDIRECT_URL}/?orderid=${orderId}&paymentMethod=${paymentMethod}&creditNoteId=${creditNotesId}&invoiceiddb=${id}&remaingAmount=${applyCreditNoteAmount}&customerID=${customerID}`,
                        "cancelUrl": `${process.env.NEXT_PUBLIC_AMEX_CUSTOMER_PAY_INVOICE_CANCEL_URL}`,
                        "operation": "PURCHASE",
                        "merchant": {
                            "name": "QATAR INTERNATIONAL SCHOOL - ONLINE 634",
                            "address": {
                                "line1": "200 Sample St",
                                "line2": "1234 Example Town"
                            }
                        }
                    }
                }
                await getwayService.getSession(requestData, async function (result: any) {
                    if (result?.data?.result === "SUCCESS") {
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
        if (paymentMethod === "Cash") {
            try {

                const dataforRemaingAmount: any = {
                    customerId: customerID,
                    Amount: applyCreditNoteAmount,
                    amountMode: 0,
                }

                const rendomTransactionId = keyGen(5);
                let amount = finalAmountToPay > 0 ? finalAmountToPay : InvoiceAmount
                let reqData = {
                    totalAmount: amount,
                    paidAmount: amount,
                    transactionId: `case-${rendomTransactionId} `,
                    amexorderId: orderId,
                    paymentMethod: "Cash",
                    idForPayment: orderId,
                    creditNotesId: customerCreditNoteRequestId
                };

                await transactionSaveInDB(reqData);
                await insertRemainingNotesAmount(dataforRemaingAmount);
                await updateInvoiceAfterPay(id)
                handleCloses();
            } catch (error: any) {
                console.log("Error ", error.message);
            }
        }
        if (paymentMethod === "Amex" && finalAmountToPay === 0) {

            try {
                const dataforRemaingAmount: any = {
                    customerId: customerID,
                    Amount: applyCreditNoteAmount,
                    amountMode: 0,
                }
                const rendomTransactionId = keyGen(5);
                let reqData = {
                    totalAmount: finalAmountToPay,
                    paidAmount: finalAmountToPay,
                    transactionId: `case-${rendomTransactionId} `,
                    amexorderId: orderId,
                    paymentMethod: "Cash",
                    idForPayment: orderId,
                    creditNotesId: customerCreditNoteRequestId
                };
                await transactionSaveInDB(reqData);
                await insertRemainingNotesAmount(dataforRemaingAmount);
                await updateInvoiceAfterPay(id)
                handleCloses();
            } catch (error: any) {
                console.log("Error ", error.message);
            }
        }
        if (paymentMethod === "QPay") {
            toast.info(`As of Now This payment method is not supported ${paymentMethod} !`);
        }

        if (paymentMethod === "CBQ") {
            toast.info(`As of Now This payment method is not supported ${paymentMethod} !`);
        }

    }

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

    const transactionSaveInDB = async (data: any) => {
        getwayService.transactionDataSaveInDB(data, function (result: any) {
            console.log("final result =>", result);
            setShowSuccess(true)
            setTimeout(callBack_func, 5000);
            function callBack_func() {
                setShowSuccess(false)
                document.location.href = `${process.env.NEXT_PUBLIC_AMEX_INVOICE_REDIRECT_URL}`;
            }

        });
    }

    const insertRemainingNotesAmount = async (reqData: any) => {
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
    const updateInvoiceAfterPay = async (invoiceId: any) => {
        try {
            let requestedData = {
                note: note ? note : null,
            };
            await axios({
                method: "PUT",
                url: `${api_url}/updateInvoice/${invoiceId}`,
                data: requestedData,
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
                .then((res) => {
                    setNote("");
                    toast.success("Payment Successfully !");
                    setTimeout(() => {
                        handleCloses();
                    }, 1000);
                })
                .catch((err) => { });
        } catch (error: any) {
            console.log("error => ", error.message);
        }
    }

    const handleCloses = () => {
        setDollerOpen(false);
    };

    return (
        <>
            <Script src="https://amexmena.gateway.mastercard.com/static/checkout/checkout.min.js"
                data-error="errorCallback"
                data-cancel="cancelCallback"
                strategy="beforeInteractive"
            > </Script>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className="guardianBar">
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
                                            Invoices
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    INVOICES
                                </Typography>
                            </Stack>
                        </Stack>
                        <Card
                            style={{ margin: "10px", padding: "15px" }}
                            className="box-shadow"
                        >
                            <TableContainer>
                                <Stack
                                    style={{ marginBottom: "10px" }}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Tabs
                                            value={value}
                                            onChange={handleChanges}
                                            aria-label="basic tabs example"
                                        >
                                            <Tab
                                                className="filter-list"
                                                label={`All (${Invoicedata.length})`}
                                                {...a11yProps(0)}
                                                onClick={handleAll}
                                            />
                                            <Tab
                                                label={`Paid (${paid.length})`}
                                                {...a11yProps(1)}
                                                onClick={handlePaid}
                                            />
                                            <Tab
                                                label={`Un Paid  (${pending.length})`}
                                                {...a11yProps(2)}
                                                onClick={handlePending}
                                            />
                                            <Tab
                                                label={`Draft (${draft.length})`}
                                                {...a11yProps(3)}
                                                onClick={handleDraft}
                                            />
                                        </Tabs>
                                    </Box>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        className="fimport-export-box"
                                    >
                                        <PopupState variant="popover" popupId="demo-popup-popover">
                                            {(popupState: any) => (
                                                <Box>
                                                    <MenuItem {...bindTrigger(popupState)}>
                                                        <div>
                                                            <span>
                                                                <BiFilterAlt />
                                                            </span>
                                                            &nbsp; Filter
                                                        </div>
                                                    </MenuItem>
                                                    <Menu {...bindMenu(popupState)}>
                                                        <Container>
                                                            <Grid>
                                                                <Typography variant="h5">
                                                                    <b>Filter</b>
                                                                </Typography>
                                                                <form
                                                                    onSubmit={handleSubmit(onSubmit)}
                                                                    className="form-filter"
                                                                >
                                                                    <Grid container spacing={3}>
                                                                        <Grid
                                                                            className="filterdd"
                                                                            item
                                                                            xs={12}
                                                                            md={3}
                                                                        >
                                                                            <Stack spacing={1} sx={{}}>
                                                                                <InputLabel id="demo-select-small">
                                                                                    Invoice Id
                                                                                </InputLabel>
                                                                                <OutlinedInput
                                                                                    fullWidth
                                                                                    id="Total"
                                                                                    placeholder="Invoice id"
                                                                                    multiline
                                                                                    {...register("invoiceId")}
                                                                                />
                                                                            </Stack>
                                                                        </Grid>

                                                                        <Grid item xs={12} md={3}>
                                                                            <Stack spacing={1}>
                                                                                <InputLabel id="demo-select-small">
                                                                                    Date Range
                                                                                </InputLabel>

                                                                                <DatePicker
                                                                                    className="myDatePicker"
                                                                                    selected={startDate}
                                                                                    onChange={(date: any) =>
                                                                                        setStartDate(date)
                                                                                    }
                                                                                    name="startDate"
                                                                                    dateFormat="MM/dd/yyyy"
                                                                                    placeholderText="Start Date"
                                                                                />
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Stack spacing={1}>
                                                                                <InputLabel className="dotremove" id="demo-select-small"></InputLabel>
                                                                                .
                                                                                <DatePicker
                                                                                    className="myDatePicker"
                                                                                    selected={endDate}
                                                                                    onChange={(date: any) =>
                                                                                        setEndDate(date)
                                                                                    }
                                                                                    name="startDate"
                                                                                    dateFormat="MM/dd/yyyy"
                                                                                    placeholderText="End Date"
                                                                                    minDate={startDate}
                                                                                />
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={2}>
                                                                            <Stack spacing={1}>
                                                                                <InputLabel id="demo-select-small">
                                                                                    Total
                                                                                </InputLabel>
                                                                                <OutlinedInput
                                                                                    fullWidth
                                                                                    id="Total"
                                                                                    size="small"
                                                                                    placeholder="Total"
                                                                                    multiline
                                                                                    {...register("total")}
                                                                                />
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Stack spacing={1}>
                                                                                <InputLabel htmlFor="status">
                                                                                    Sort
                                                                                </InputLabel>
                                                                                <Select
                                                                                    defaultValue="none"
                                                                                    onChange={(e) =>
                                                                                        setSort(e.target.value)
                                                                                    }
                                                                                    value={sort}
                                                                                    labelId="demo-select-small"
                                                                                    id="demo-select-small"
                                                                                    label="Status"
                                                                                >
                                                                                    <MenuItem value="ASC">
                                                                                        Date, Oldest First
                                                                                    </MenuItem>
                                                                                    <MenuItem value="DESC">
                                                                                        Date, Newest First
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={3}>
                                                                            <Stack spacing={1}>
                                                                                <InputLabel id="demo-select-small">
                                                                                    Status
                                                                                </InputLabel>
                                                                                <Select
                                                                                    onChange={(e) =>
                                                                                        setStatus(e.target.value)
                                                                                    }
                                                                                    labelId="demo-select-small"
                                                                                    id="demo-select-small"
                                                                                    value={status}
                                                                                    label="Status"
                                                                                >
                                                                                    <MenuItem value="All">All</MenuItem>
                                                                                    <MenuItem value="pending">
                                                                                        Pending
                                                                                    </MenuItem>
                                                                                    <MenuItem value="paid">Paid</MenuItem>
                                                                                </Select>
                                                                            </Stack>
                                                                        </Grid>
                                                                        <br></br>
                                                                    </Grid>
                                                                    &nbsp; &nbsp; &nbsp;
                                                                    <Grid container spacing={3}>
                                                                        <Grid item xs={3} md={3}>
                                                                            <Stack spacing={1}>
                                                                                <Button
                                                                                    onClick={handleReset}
                                                                                    variant="contained"
                                                                                    type="submit"
                                                                                >
                                                                                    reset Filter
                                                                                </Button>
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={3} md={3}>
                                                                            <Stack spacing={1}>
                                                                                <Button
                                                                                    onClick={popupState.close}
                                                                                    variant="contained"
                                                                                    type="submit"
                                                                                >
                                                                                    Apply Filter
                                                                                </Button>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </Grid>
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
                                                </Box>
                                            )}
                                        </PopupState>
                                        <FormControl>
                                            <OutlinedInput
                                                onChange={(e) => searchItems(e)}
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Search"
                                                value={searchquery}
                                            />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>INVOICE</TableCell>
                                            <TableCell>DATE</TableCell>
                                            <TableCell>EXPECTED PAYMENT DATE</TableCell>
                                            <TableCell>STATUS</TableCell>
                                            <TableCell>BALANCE</TableCell>
                                            <TableCell className="action-th">ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {DATA.currentData() && DATA.currentData() ? (
                                            DATA.currentData().map((item: any) => (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    className="boder-bottom"
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox />
                                                    </TableCell>

                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Link
                                                            href={`/user/invoices/viewinvoice/${item.invid}`}>
                                                            <TableCell align="left">
                                                                {item.invoiceId}
                                                            </TableCell>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <b>{moment(item.createdDate, "DD/MM/YYYY").format(
                                                            "ll"
                                                        )}</b>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {moment(item.invoiceDate, "DD/MM/YYYY").format(
                                                            "ll"
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="left">{item?.status === "pending" ? (<span style={{ color: "#FF4026", fontWeight: "bold" }}>Pending</span>) : item?.status === "paid" ?
                                                        (<span style={{ color: "#02C509", fontWeight: "bold" }}>paid</span>) : ""}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <b>${item.amount}.00</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="action-td">
                                                        <div className="btn">
                                                            <Button className="idiv" >
                                                                <Link
                                                                    href={`/user/invoices/viewinvoice/${item.invid}`}>
                                                                    <Image
                                                                        src="/view.png"
                                                                        alt="Picture of the author"
                                                                        width={35}
                                                                        height={35}
                                                                    />
                                                                </Link>
                                                            </Button>
                                                            &nbsp;
                                                            {item.status === "paid" ? (
                                                                <Button className="idiv">
                                                                    <Image
                                                                        onClick={() => generateSimplePDF(item)}
                                                                        src="/download.svg"
                                                                        alt="Picture of the author"
                                                                        width={35}
                                                                        height={35}
                                                                    />
                                                                </Button>
                                                            ) : (
                                                                ""
                                                            )}
                                                            &nbsp;
                                                            {item.status !== "draft" ? (
                                                                <Button className="idiv" >
                                                                    <div className="idiv">
                                                                        <Image
                                                                            onClick={() => handleClickOpen(item)}
                                                                            src="/doller.svg"
                                                                            alt="Picture of the author"
                                                                            width={35}
                                                                            height={35}
                                                                        />
                                                                    </div>
                                                                </Button>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <h3>No Record found</h3>
                                        )}
                                    </TableBody>
                                </Table>
                                {getInvoices == "" ? <h3>No Record found</h3> : ""}
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
                        <div>
                            <BootstrapDialog
                                onClose={handleCloses}
                                aria-labelledby="customized-dialog-title"
                                open={dollerOpen}
                            >
                                <BootstrapDialogTitle
                                    id="customized-dialog-title"
                                    onClose={handleCloses}
                                >
                                    Recieve Payment
                                </BootstrapDialogTitle>
                                <DialogContent dividers className="popup">
                                    <Grid>
                                        <Stack style={{ marginTop: "8px" }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name">
                                                            Received On <span className="err_str">*</span>
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            defaultValue={moment(
                                                                recievedPay.invoiceDate,
                                                                "DD/MM/YYYY"
                                                            ).format("ll")}
                                                            type="text"
                                                            id="name"
                                                            placeholder="Phone..."
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name">
                                                            Payment  Method <span className="err_str">*</span>
                                                        </InputLabel>
                                                        <Select
                                                            labelId="demo-select-small"
                                                            id="demo-select-small"
                                                            defaultValue="Cash"
                                                            size="small"
                                                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                                                        >
                                                            <MenuItem value="All"></MenuItem>
                                                            <MenuItem value="CBQ">
                                                                CBQ
                                                            </MenuItem>
                                                            <MenuItem value="QPay">QPay</MenuItem>
                                                            <MenuItem value="Amex">AMEX</MenuItem>
                                                            <MenuItem value="Cash">Cash</MenuItem>
                                                        </Select>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack style={{ marginTop: "15px" }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name">Reference</InputLabel>
                                                        <OutlinedInput
                                                            onChange={(e) => setNote(e.target.value)}
                                                            type="text"
                                                            id="name"
                                                            placeholder="Enter note"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name">
                                                            Amount <span className="err_str">*</span>
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            disabled
                                                            defaultValue={recievedPay.amount}
                                                            type="text"
                                                            id="name"
                                                            placeholder="Alternate Email..."
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack style={{ marginTop: "20px" }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>

                                                    {customerTotalCreditNoteBalance != 0 && <>
                                                        <Checkbox
                                                            onChange={(e) => { handleCheckBoxClick(e) }}
                                                            className="checkbox132"
                                                        />
                                                        Want to use credit balance :${customerTotalCreditNoteBalance}.00
                                                    </>}

                                                    <div>
                                                        <h5 className="apply">Apply Payment</h5>
                                                    </div>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name"></InputLabel>
                                                        <p>Sales invoice amount : ${InvoiceAmount}.00 </p>
                                                    </Stack>
                                                    <Stack spacing={1} >
                                                        <InputLabel htmlFor="name"></InputLabel>
                                                        <div className="iadiv">
                                                            <div className="hh red">Total Credit Balance:</div>
                                                            <div> ${applyCreditNoteAmount}.00 </div>
                                                        </div>
                                                    </Stack>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name"></InputLabel>
                                                        <p> Total amount :${finalAmountToPay}.00 </p>

                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Stack>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        variant="contained"
                                        autoFocus
                                        onClick={() => handleCreate(recievedPay.id)}
                                    >
                                        Create
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        </div>
                        <ToastContainer />
                    </div>
                    <MainFooter />
                </Box>
            </Box>
        </>
    );
}