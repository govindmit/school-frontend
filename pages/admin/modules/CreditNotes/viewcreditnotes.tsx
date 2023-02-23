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
    InputLabel,
    OutlinedInput,
    Button,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import MiniDrawer from "../../../sidebar";
import DeleteFormDialog from "./deletedialougebox";
import { api_url, auth_token } from "../../../api/hello";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import ApproveCompForm from "./approvecmp";
const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
};
type FormValues = {
    message: string;
    status: number;
    updatedBy: number

};

export default function ViewCreditNotes(props: any) {
    const [creditNoteDet, setcreditNoteDet] = React.useState<any>([]);
    const [creditNoteMsg, setcreditNoteMsg] = React.useState<any>([]);
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [rejectOpen, setrejectOpen] = React.useState(false);
    const [approveOpen, setapproveOpen] = React.useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    //get credit notes
    const url = `${api_url}/getCreditNotesDetails/${props.id}`;
    const fetchData = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: auth_token,
                },
            });
            const json = await response.json();
            console.log(json.data);
            setcreditNoteDet(json.data.result[0]);
            setcreditNoteMsg(json.data.results);
        } catch (error: any) {
            console.log("error", error);
        }
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        const reqData = {
            message: data.message,
            status: 2,
            updatedBy: 1
        };
        await axios({
            method: "put",
            url: `${api_url}/editCreditNotes/${props.id}`,
            data: reqData,
            headers: {
                Authorization: auth_token,
            },
        })
            .then((data) => {
                if (data) {
                    toast.success("Credit Notes Updated Successfully !");
                    reset();
                    setrejectOpen(false)
                }
            })
            .catch((error) => {
                toast.error(" Internal Server Error !");
            });
    };

    //open close delete popup boxes
    function handleDeleteOpen() {
        setDeleteOpen(true);
        setrejectOpen(false)
        setapproveOpen(false);
    }
    const closePoP = (data: any) => {
        setDeleteOpen(false);
    };

    //reject open form
    function handleRejectOpen() {
        setrejectOpen(true)
        setapproveOpen(false);
    }
    function closeRejectForm() {
        setrejectOpen(false)
    }

    //approve form open
    function handleApproveOpen() {
        setapproveOpen(true);
        setrejectOpen(false)
    }

    const closePoPapprove = (data: any) => {
        setapproveOpen(false);
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
                                    <Stack onClick={handleApproveOpen} style={{ color: "#02C509", cursor: "pointer" }}><b>Approved</b></Stack>
                                    <Stack onClick={handleRejectOpen} style={{ marginLeft: "20px", color: "red", cursor: "pointer" }}><b>Reject</b></Stack>
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
                                            <Typography style={{ padding: "8px" }}>{creditNoteMsg[0]?.message}</Typography>
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
                                                        Note by Admin
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
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={1}>
                                                        <TableCell align="left" colSpan={3}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>SUBTOTAL</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                    </TableRow>
                                                    <TableRow hover tabIndex={2}>
                                                        <TableCell align="left" colSpan={3}></TableCell>
                                                        <TableCell align="left" style={{ fontWeight: "600" }}>TOTAL</TableCell>
                                                        <TableCell align="left">${creditNoteDet?.amount}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                {rejectOpen ? (<Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <CardContent>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                >
                                                    <Stack>
                                                        <Typography
                                                            variant="h5"

                                                            style={{
                                                                fontWeight: "bold",
                                                                color: "#333333",
                                                            }}
                                                        >
                                                            Reason  for reject this request
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                                <Table style={{ marginTop: "20px" }}>
                                                    <Stack>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} md={6}>
                                                                <Stack spacing={1}>
                                                                    <InputLabel htmlFor="name">
                                                                        Your comments on this request                                                                </InputLabel>
                                                                    <OutlinedInput
                                                                        type="text"
                                                                        id="name"
                                                                        fullWidth
                                                                        size="small"
                                                                        {...register("message", {
                                                                            required: true,
                                                                        })}
                                                                    />
                                                                    {errors.message?.type === "required" && (
                                                                        <span style={style}>Field is Required *</span>
                                                                    )}
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="primary"
                                                                >
                                                                    <b>SAVE</b>
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    style={{
                                                                        marginLeft: "10px",
                                                                        backgroundColor: "#F95A37",
                                                                    }}
                                                                    onClick={closeRejectForm}
                                                                >
                                                                    <b>CANCEL</b>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Stack>
                                                </Table>
                                            </CardContent>
                                        </form>
                                    </Card>
                                </Grid>) : ""}
                                {approveOpen ? (<Grid item xs={12} md={12} style={{ marginTop: "20px" }}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <ApproveCompForm id={props.id} closeDialog={closePoPapprove} />
                                    </Card>
                                </Grid>) : ""}
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box >
            <DeleteFormDialog id={props.id} open={deleteOpen} closeDialog={closePoP} />
        </>
    );
}

