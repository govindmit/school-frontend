import {
    Card,
    Box,
    Typography,
    Stack,
    Breadcrumbs,
    Grid,
    CardContent,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router, { useRouter } from "next/router";
import MiniDrawer from "./sidebar";
import { api_url, auth_token } from "./api/hello";
import commmonfunctions from "./commonFunctions/commmonfunctions";
import MainFooter from "./commoncmp/mainfooter";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function ViewCustomer() {
    const router = useRouter();
    const [userDet, setUserDet] = useState<any>([]);
    useEffect(() => {
        const logintoken = localStorage.getItem("QIS_loginToken");
        if (logintoken === undefined || logintoken === null) {
            router.push("/");
        }
        if (logintoken) {
            commmonfunctions.GetuserDet(logintoken).then(response => {
                setUserDet(response);
            })
        }
    }, []);
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
                                            User Profile
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    USER PROFILE
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
                                        <Stack style={{ padding: "8px" }}>
                                            <Box sx={{ display: "flex" }}>
                                                <div id="profileImage"><span id="fullName"> {userDet && userDet.name && userDet.name.charAt(0).toUpperCase()}</span></div>
                                                <CardContent sx={{ flex: 1 }} className="text-grey">
                                                    <Typography component="h4" variant="h4">
                                                        {userDet && userDet.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="text.secondary"
                                                    >
                                                        USER-0000{userDet && userDet?.id}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        {userDet?.email1}
                                                    </Typography>
                                                    <Typography variant="subtitle1">
                                                        {userDet?.phone1}
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
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
                                                        <b>Details</b>
                                                    </Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography style={{ color: "#1A70C5" }}>
                                                        <b>Edit Details</b>
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Box sx={{ width: "100%" }}>

                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <MainFooter />
                </Box>
            </Box>
            <ToastContainer />
        </>
    );
}
