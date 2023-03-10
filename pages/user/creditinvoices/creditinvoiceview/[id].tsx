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
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import MiniDrawer from "../../../sidebar";
import { api_url, auth_token } from "../../../api/api";
import { useRouter } from "next/router";
import MainFooter from "../../../commoncmp/mainfooter";
import moment from "moment";
import commmonfunctions from "../../../../commonFunctions/commmonfunctions";

export default function ViewCreditNotes(props: any) {
    const [creditNoteDet, setcreditNoteDet] = React.useState<any>([]);
    const [creditNoteMsg, setcreditNoteMsg] = React.useState<any>([]);
    const [creditball, setcreditball] = React.useState(0);
    const [apprball, setapprball] = React.useState<any>([]);
    const router = useRouter();
    const { id } = router.query;

    // verify user login and previlegs
    let logintoken: any;
    useEffect(() => {
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
        fetchData();
    }, []);

    //get credit notes
    const url = `${api_url}/getCreditNotesDetails/${id}`;
    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: auth_token,
                },
            });
            const json = await response.json();
            fetchBallance(json.data.result[0].customerId);
            setcreditNoteDet(json.data.result[0]);
            setcreditNoteMsg(json.data.results);
            setapprball(json?.data?.appramt[0])
        } catch (error: any) {
            console.log("error", error);
        }
    };
    //get credit ballance 
    const fetchBallance = async (id: number) => {
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
                                            View Credit Notes
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    VIEW CREDIT NOTE
                                </Typography>
                            </Stack>
                            <Stack>
                                <Typography style={{ color: "#F95A37" }}>
                                    <span style={{ fontSize: "14PX" }}>BALANCE </span>{" "}
                                    <b style={{ fontSize: "26px" }}>  ${creditball ? creditball : 0}</b>
                                </Typography>
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
                                                                    {creditNoteDet?.name}
                                                                </Typography>
                                                                <Typography component="h4">
                                                                    {creditNoteDet?.email1}
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    color="text.secondary"
                                                                >
                                                                    CUST-00002
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
                                                                moment(creditNoteDet?.createdAt).format("DD/MM/YYYY")}
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
                                                        Credit Request Reason
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Typography style={{ padding: "8px" }}>{creditNoteMsg[0]?.message}</Typography>
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
                                            >
                                                <Stack>
                                                    <Typography
                                                        variant="h5"
                                                        gutterBottom
                                                        style={{ fontWeight: "bold", color: "#333333" }}
                                                    >
                                                        Credit Invoice
                                                    </Typography>
                                                    <Typography variant="h6" style={{ color: "#26CEB3" }}>INV-000{id}</Typography>
                                                </Stack>
                                                <Stack direction="row">
                                                    {creditNoteDet?.status === 4 ? (<Stack style={{ color: "#02C509" }}><b>Approved</b></Stack>) : creditNoteDet?.status === 0 ? (<Stack style={{ marginLeft: "20px", color: "red", cursor: "pointer" }}><b>Pending</b></Stack>) : creditNoteDet?.status === 2 ? (<Stack style={{ marginLeft: "20px", color: "red", cursor: "pointer" }}><b>Reject</b></Stack>) : ""}
                                                </Stack>
                                            </Stack>
                                            <Table className="invoice-table" style={{ marginTop: "20px" }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography>Activity</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography>Date</Typography>
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
                                                        <TableCell align="left">{creditNoteDet?.activityname}</TableCell>
                                                        <TableCell align="left">10</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={1}>
                                                        <TableCell align="left" colSpan={2}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>SUBTOTAL</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={2}>
                                                        <TableCell align="left" colSpan={2}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>TOTAL</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {creditNoteDet?.status !== 0 ? (<Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <Stack>
                                                    <Typography
                                                        variant="h6"
                                                        gutterBottom
                                                        style={{ fontWeight: "bold", color: "#333333" }}
                                                    >
                                                        Credit {creditNoteDet?.status === 4 ? (<span>Approved</span>) : creditNoteDet?.status === 2 ? (<span>Reject</span>) : ""}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            {creditNoteDet?.status === 4 ? (<Table className="invoice-table" style={{ marginTop: "20px" }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography>Date</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography>Document</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography>Amount</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow hover tabIndex={-1}>
                                                        <TableCell align="left">{moment(apprball?.createdAt).format("DD/MM/YYYY")}</TableCell>
                                                        <TableCell align="left">INV-000{id}</TableCell>
                                                        <TableCell align="left">${apprball?.amount}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>) : ""}
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ padding: "8px" }}
                                            >
                                                <Stack>
                                                    <Typography
                                                        variant="h6"
                                                        gutterBottom
                                                        style={{
                                                            fontWeight: "bold",
                                                            color: "#333333",
                                                        }}
                                                    >
                                                        Admin Comments
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            {
                                                creditNoteMsg.slice(1).map((data: any) => {
                                                    return (<Typography style={{ padding: "8px" }}>{data.message}</Typography>)
                                                })

                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>) : ""}
                            </Grid>
                        </Grid>
                    </div>
                    <MainFooter />
                </Box>
            </Box >
        </>
    );
}