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
import React from "react";
import MiniDrawer from "../../../sidebar";
import DeleteFormDialog from "./deletedialougebox";
export default function ViewCreditNotes(props: any) {
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    //open close delete popup boxes
    function handleDeleteOpen() {
        setDeleteOpen(true);
    }
    const closePoP = (data: any) => {
        setDeleteOpen(false);
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
                                    <b style={{ fontSize: "26px" }}> $174.00</b>
                                </Typography>
                                <Stack direction="row">
                                    <Typography style={{ color: "#02C509" }}><b>Approved</b></Typography>
                                    <Typography style={{ marginLeft: "20px", color: "red" }}><b>Reject</b></Typography>
                                    <Stack onClick={handleDeleteOpen} style={{ marginLeft: "20px", color: "red", cursor: "pointer" }}><b>Delete</b></Stack>
                                </Stack>
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
                                                                    Acme Corporation
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    color="text.secondary"
                                                                >
                                                                    CUST-00002
                                                                </Typography>
                                                                <Typography variant="subtitle1">

                                                                </Typography>
                                                                <Typography variant="subtitle1">

                                                                </Typography>
                                                            </CardContent>
                                                        </Box>
                                                    </Stack>
                                                    <Stack style={{ padding: "8px" }}>
                                                        <Typography>Cretaed : Jan 10, 2023</Typography>
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
                                                        Note by Customer
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Typography>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one </Typography>
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
                                            <Table style={{ marginTop: "20px" }}>
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
                                                    <TableRow hover tabIndex={-1}>
                                                        <TableCell align="left" className="invcss" style={{ fontWeight: "500", color: "#26CEB3" }}>INV-0001</TableCell>
                                                        <TableCell align="left">Adam Johans
                                                            Lorem ipsum dollar sit ammet</TableCell>
                                                        <TableCell align="left">10</TableCell>
                                                        <TableCell align="left">$ 237.5</TableCell>
                                                        <TableCell align="left">$ 237.5</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={1}>
                                                        <TableCell align="left" colSpan={3}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>SUBTOTAL</TableCell>
                                                        <TableCell align="left">$ 237.5</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={2}>
                                                        <TableCell align="left" colSpan={3}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>TOTAL</TableCell>
                                                        <TableCell align="left">$ 237.5</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box>
            <DeleteFormDialog open={deleteOpen} closeDialog={closePoP} />
        </>
    );
}

