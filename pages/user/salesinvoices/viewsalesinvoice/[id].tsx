import {
    Card,
    Box,
    Typography,
    Stack,
    Breadcrumbs,
    Grid,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import MiniDrawer from "../../../sidebar";
import { api_url, auth_token } from "../../../api/hello";
import { useRouter } from "next/router";
import MainFooter from "../../../commoncmp/mainfooter";
import moment from "moment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RequestFormCmp from "../requestFormCmp";
import { ToastContainer } from "react-toastify";


export default function ViewCreditNotes(props: any) {
    const [salesOrderDet, setsalesOrderDet] = React.useState<any>([]);
    const [CreditReqFormOpen, setCreditReqFormOpen] = React.useState(false);
    const router = useRouter();
    const { id } = router.query;

    // verify user login and previlegs
    let logintoken: any;
    useEffect(() => {
        logintoken = localStorage.getItem("QIS_loginToken");
        if (logintoken === undefined || logintoken === null) {
            router.push("/");
        }
        fetchData();
    }, []);

    //get credit notes
    const url = `${api_url}/getSalesOrdersDetails/${id}`;
    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: auth_token,
                },
            });
            const json = await response.json();
            setsalesOrderDet(json?.data[0]);
        } catch (error: any) {
            console.log("error", error);
        }
    };

    //Credit Request
    const handleClickOpen = () => {
        setCreditReqFormOpen(true);
    };

    const closePoP = (data: any) => {
        setCreditReqFormOpen(false);
        fetchData();
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
                            style={{ padding: "8px", marginBottom: "25px" }}
                        >
                            <Stack>
                                <Stack spacing={3}>
                                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                                        <Link
                                            key="1"
                                            color="inherit"
                                            href="/creditnotes/creditnotes"
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
                                            View Sales Invoices
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    VIEW SALES INVOICES
                                </Typography>
                            </Stack>
                            <Stack>
                                <div className="cinvoice">
                                    <div className="buycss" style={{ textAlign: "end", marginRight: "10px" }} >
                                        <Link
                                            href="/user/salesinvoices/salesinvoicelist"
                                            style={{ color: "#1A70C5", textDecoration: "none" }}
                                        >
                                            <Button variant="contained" startIcon={<ArrowBackIcon />}> <b>Back To List</b></Button>
                                        </Link>
                                    </div>
                                    <div>
                                        {salesOrderDet?.amount !== 0 ? (<div>
                                            {salesOrderDet.isRequested === 1 ? (<Button size="small" variant="contained" style={{ backgroundColor: "#D1D2D2", color: "whitesmoke" }} disabled sx={{ width: 135 }}
                                                onClick={() => handleClickOpen()}
                                            ><b>Requested</b></Button>) : (<Button size="small" variant="contained"
                                                onClick={() => handleClickOpen()}
                                            ><b>Create Request</b></Button>)}

                                        </div>) : (<Button disabled size="small" variant="contained"
                                        ><b>Create Request</b></Button>)}
                                    </div>
                                </div>
                            </Stack>
                        </Stack>
                        {/*bread cump */}
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ padding: "8px" }}
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
                                                                Credit Note Details
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack style={{ padding: "8px" }}>
                                                        <Box sx={{ display: "flex" }}>
                                                            <div id="profileImage"><span id="fullName">A</span></div>
                                                            <CardContent sx={{ flex: 1 }} className="text-grey">
                                                                <Typography component="h4" variant="h4">
                                                                    {salesOrderDet?.user_name}
                                                                </Typography>
                                                                <Typography component="h4">
                                                                    {salesOrderDet?.user_email1}
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    color="text.secondary"
                                                                >
                                                                    CUST-0000{salesOrderDet?.userId}
                                                                </Typography>
                                                                <Typography
                                                                    component="h4"
                                                                    className="status-title"
                                                                >
                                                                    Status:
                                                                </Typography>
                                                                <Typography
                                                                    component="span"
                                                                    className="status-box"
                                                                >
                                                                    Open
                                                                </Typography>
                                                            </CardContent>
                                                        </Box>
                                                    </Stack>
                                                    <Stack style={{ padding: "8px" }} >
                                                        <Typography className="date-box">
                                                            <span>Cretaed :</span> {
                                                                moment(salesOrderDet?.user_create_Date).format("DD/MM/YYYY")}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                        style={{ padding: "8px" }}
                                                    >
                                                        <Stack>
                                                            <Typography variant="subtitle1">
                                                                purchase order : 2342354235
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                </CardContent>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
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
                                                            <Typography>Activity</Typography>
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
                                                    <TableRow hover tabIndex={-1}>
                                                        <TableCell align="left" className="invcss" style={{ fontWeight: "500", color: "#26CEB3" }}>INV-000{id}</TableCell>
                                                        <TableCell align="left">{salesOrderDet?.activity_name}</TableCell>
                                                        <TableCell align="left">${salesOrderDet?.amount}</TableCell>
                                                        <TableCell align="left">${salesOrderDet?.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={1}>
                                                        <TableCell align="left" colSpan={2}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>SUBTOTAL</TableCell>
                                                        <TableCell align="left">${salesOrderDet?.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={2}>
                                                        <TableCell align="left" colSpan={2}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>TOTAL</TableCell>
                                                        <TableCell align="left">${salesOrderDet?.amount}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <MainFooter />
                    <ToastContainer />
                </Box>
            </Box >
            {
                CreditReqFormOpen ? (
                    <RequestFormCmp open={RequestFormCmp} reqDet={salesOrderDet} closeDialog={closePoP} />
                ) : (
                    ""
                )
            }
        </>
    );
}