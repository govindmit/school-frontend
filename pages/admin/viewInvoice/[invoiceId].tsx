import { Breadcrumbs, Card, CardContent, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, DialogTitleProps, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TableHead, styled } from "@mui/material";
import { Stack } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import axios from "axios";
import { api_url, auth_token } from "../../api/hello";
import Image from "next/image";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PDFService from '../../../commonFunctions/invoicepdf';
import { toast } from "react-toastify";
import { GridCloseIcon } from "@mui/x-data-grid";
import moment from "moment";
import getwayService from "../../../services/gatewayService"

const BootstrapButton = styled(Button)({
    backgroundColor: "#1A70C5",
    color: "#FFFFFF",
    margin: "7px",
    "&:hover": {
        backgroundColor: "#1A70C5",
    },
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

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
                    <GridCloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}


export default function Guardians() {
    const router = useRouter();
    const { invoiceId } = router.query;
    const [value, setValue] = useState<any>({ id: null, title: null });
    const [invoiceno, setInvoiceNo] = useState();
    const [invoice, setInvoice] = useState<any>([]);
    const [item, setItem] = useState<any>([]);
    const [invDet, setinvDet] = useState<any>([]);
    const [product, setProduct] = useState<any>([]);
    const [dollerOpen, setDollerOpen] = useState(false);
    const [recievedPay, setRecieved] = useState<any>([]);
    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [note, setNote] = useState<any>([]);
    const [customerTotalCreditNoteBalance, setCustomerTotalCreditNoteBalance] = useState(0);
    const [customerCreditNoteRequestId, setCustomerCreditNoteRequestId] = useState(null);
    const [applyCreditNoteAmount, setApplyCreditNoteAmount] = useState(0);
    const [finalAmountToPay, setFinalAmountToPay] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const [InvoiceAmount, setInvoiceAmount] = useState(0);
    const [customerCreditNoteRemaingAmount, setCustomerCreditNoteRemaingAmount] = useState(0);
    const [invoiceStatus, setInvoiceStatus] = useState('');
    const [customerID, setCustomerId] = useState(null);
    const [orderId, setorderId] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [user, setUser] = useState<any>([]);

    useEffect(() => {
        invoiceDataById();
        getItem();
    }, []);

    // get items 
    const getItem = async () => {
        await axios({
            method: "GET",
            url: `${api_url}/getItems`,

            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((res) => {
                setItem(res?.data.data);
            })
            .catch((err) => { });
    };

    // get invoice det
    const invoiceDataById = async () => {
        await axios({
            method: "POST",
            url: `${api_url}/getInvoice/${invoiceId}`,
            headers: {
                Authorization: auth_token,
            },
        })
            .then((res) => {
                setInvoice(res?.data.data);
                setValue({
                    id: res?.data.data[0].id,
                    title: res?.data.data[0].name,
                });
                if (res) {
                    let requested = {
                        id: res?.data.data[0]?.itemId,
                    };
                    axios({
                        method: "POST",
                        url: `${api_url}/getItembyid`,
                        data: requested,

                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    })
                        .then((res) => {
                            setProduct(res?.data.data);
                        })
                        .catch((err) => { });
                }
                setinvDet(res?.data.data);
                setInvoiceNo(res?.data?.invoiceNo);
            })
            .catch((err) => { });
    };

    //genetate pdf
    function generateSimplePDF(product: any) {
        PDFService.generateSimplePDF(product);
    }

    // price cal 
    var price = 0;
    for (let d of product) {
        price = price + d.price;
    }

    // payment functionality

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


    const handleCloses = () => {
        setDollerOpen(false);
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
                        // "returnUrl":`${process.env.NEXT_PUBLIC_REDIRECT_URL}/?orderid=${orderId}&paymentMethod=${paymentMethod}`,
                        "returnUrl": `${process.env.NEXT_PUBLIC_AMEX_INVOICE_REDIRECT_URL}/?orderid=${orderId}&paymentMethod=${paymentMethod}&creditNoteId=${creditNotesId}&remaingAmount=${applyCreditNoteAmount}&customerID=${customerID}`,
                        "cancelUrl": `${process.env.NEXT_PUBLIC_AMEX_INVOICE_CANCEL_URL}`,
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

        if (paymentMethod === "Amex" || paymentMethod === "Cash" && isChecked === true && finalAmountToPay === 0) {
            try {

                const dataforRemaingAmount: any = {
                    customerId: customerID,
                    Amount: applyCreditNoteAmount,
                    amountMode: 0,
                }

                const rendomTransactionId = keyGen(5);
                let reqData = {
                    totalAmount: InvoiceAmount,
                    paidAmount: InvoiceAmount,
                    transactionId: `case-${rendomTransactionId} `,
                    amexorderId: orderId,
                    paymentMethod: "Cash",
                    idForPayment: orderId,
                    creditNotesId: customerCreditNoteRequestId
                };
                transactionSaveInDB(reqData);
                insertRemainingNotesAmount(dataforRemaingAmount);
                updateInvoiceAfterPay(id)
                handleCloses();
            } catch (error: any) {
                console.log("Error ", error.message);
            }
        }

        if (paymentMethod === "Cash" && finalAmountToPay > 0) {
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

                transactionSaveInDB(reqData);
                insertRemainingNotesAmount(dataforRemaingAmount);
                updateInvoiceAfterPay(id)
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

        if (paymentMethod === "CBQ") {
            toast.info(`As of Now This payment method is not supported ${paymentMethod} !`);
        }

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
        //  const reqData = {
        //   customerId: customerId,
        //   Amount: creditBalance,
        //   amountMode: 0,
        // };
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
                    getUser();
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


    const getUser = async () => {
        await axios({
            method: "POST",
            url: `${api_url}/getInvoice`,
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((res) => {
                setUser(res?.data.data);
                setInvoice(res?.data.data);
            })
            .catch((err) => { });
    };

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                                            Invoices View
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    INVOICE VIEW
                                </Typography>
                            </Stack>
                            <div className="buycss" style={{ textAlign: "end" }}>
                                <Link
                                    href="/admin/invoices"
                                    style={{ color: "#1A70C5", textDecoration: "none" }}
                                >
                                    <Button variant="contained" startIcon={<ArrowBackIcon />}> <b>Back To List</b></Button>
                                </Link>
                            </div>
                        </Stack>
                        {/*bread cump */}
                        <div className="midBar">
                            <div className="guardianList" style={{ padding: "50px", }}>

                                <div className="aititle">
                                    <div className="iatitle flex">
                                        <div className="invoive-img">
                                            {" "}
                                            <Image
                                                className="iaimg"
                                                src="/favicon.ico"
                                                alt="Picture of the author"
                                                width={65}
                                                height={62}
                                            />
                                        </div>
                                        <div className="invoice-name-detail">
                                            <span className="iahead">
                                                Qatar International School
                                            </span>
                                            <span className="line">
                                                Qatar international school W.L.L
                                            </span>
                                            <span className="line">
                                                United Nations St, West Bay, P.O. Box: 5697
                                            </span>
                                            <span className="line">Doha, Qatar</span>
                                        </div>
                                    </div>
                                    <div className="itele">
                                        <span className="Tline">Telephone: 443434343</span>
                                        <span className="Tline">Website: www.qis.org</span>
                                        <span className="Tline">Email: qisfinance@qis.org</span>
                                    </div>
                                </div>
                                <div className="icenter">
                                    <div className="invoice">
                                        {/*bread cump */}
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            style={{ padding: "8px", marginBottom: "15px" }}
                                        >
                                            <Stack style={{ paddingLeft: "50px", paddingRight: "50px" }}>
                                                <Stack spacing={3}>
                                                    <Typography

                                                        gutterBottom
                                                        style={{ fontWeight: "bold", color: "#333333" }}
                                                    >
                                                        Bill To :
                                                    </Typography>
                                                </Stack>
                                                <Typography

                                                    gutterBottom
                                                    style={{ fontWeight: "bold", color: "#333333" }}
                                                >
                                                    {invDet[0]?.name}
                                                </Typography>
                                            </Stack>

                                            <Stack>
                                                <Stack spacing={3}>
                                                    <Typography

                                                        gutterBottom
                                                        style={{ fontWeight: "bold", color: "#333333" }}
                                                    >
                                                        Date To :
                                                    </Typography>
                                                </Stack>
                                                <Typography

                                                    gutterBottom
                                                    style={{ fontWeight: "bold", color: "#333333" }}
                                                >
                                                    {invDet[0]?.invoiceDate}

                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </div>
                                </div>
                                <div className="ickks" style={{ display: "flex", justifyContent: "center" }}>
                                    <div className="ickk">
                                        <div className="cinvoice">
                                            <div>
                                                <Typography style={{ textAlign: "center" }}><b>${invDet[0]?.amount} DUE</b></Typography>
                                                <BootstrapButton
                                                    type="button"
                                                    style={{ backgroundColor: "#42D5CD" }}
                                                    sx={{ width: 250, padding: 1, margin: 2 }}
                                                    onClick={() => handleClickOpen(invDet && invDet[0])}
                                                >
                                                    Pay Now !
                                                </BootstrapButton>

                                                <BootstrapButton sx={{ width: 250, padding: 1, margin: 2 }} onClick={() => generateSimplePDF(invDet && invDet[0])}>
                                                    Download Statement
                                                </BootstrapButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                    Line Items
                                                </Typography>
                                            </Stack>

                                        </Stack>
                                        <Table className="invoice-table" style={{ marginTop: "20px" }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <Typography>INVOICE ID</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>Item</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>Quantity</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>Rate</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>Amount</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {product.map((row: any) => (
                                                    <TableRow
                                                        key={row.name}
                                                    >
                                                        <TableCell >
                                                            INV{row.id}
                                                        </TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>1</TableCell>
                                                        <TableCell>{row.price}</TableCell>
                                                        <TableCell>{row.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <div className="invoiceSubTotal" >
                                                    <div className="invoiceTotalamount">
                                                        <div className="sdiv">
                                                            <div className="sidiv">Subtotal</div>
                                                            <div>$ &nbsp;{price}.00</div>
                                                        </div>
                                                        <div className="sdiv">
                                                            <div className="sidiv">Total</div>
                                                            <div>$ &nbsp;{price}.00</div>
                                                        </div>
                                                        <div className="sdiv">
                                                            <div className="sidiv">Balance Due</div>
                                                            <div>$ &nbsp;{price}.00</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box >
            <div>
                <BootstrapDialog
                    onClose={handleCloses}
                    aria-labelledby="customized-dialog-title"
                    open={dollerOpen}
                >
                    <BootstrapDialogTitle
                        id="customized-dialog-title"
                    //onClose={handleCloses}
                    >
                        Recieve Payment
                    </BootstrapDialogTitle>
                    <DialogContent dividers className="popup">
                        <Grid>
                            <Stack>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name">
                                                Customer <span className="err_str">*</span>
                                            </InputLabel>
                                            <OutlinedInput
                                                defaultValue={recievedPay.name}
                                                type="text"
                                                id="name"
                                                placeholder="Customer Name..."
                                                fullWidth
                                                size="small"
                                            />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
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
                                                {/* <MenuItem value="Cashd">
                                Cash on Delivery
                              </MenuItem> */}
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
                            {/* <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Want to use credit balance $100"
                        className="want"
                      />
                    </FormGroup> */}
                            {/* <div>
                      <h5 className="apply">Apply Payment</h5>
                    </div>
                    <div className="iadiv">
                      <div className="hh">Invoice Amount:</div>
                      <div>${recievedPay.amount}.00</div>
                    </div>
                    <div className="iadiv">
                      <div className="hh red">Total Credit Balance:</div>
                      <div>$0.00</div>
                    </div> */}
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
                        {/* <div className="total-amount">
                    <div className="hh">Total Amount:</div>
                    <div>${recievedPay.amount}.00</div>
                  </div> */}
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
        </>
    );
}


