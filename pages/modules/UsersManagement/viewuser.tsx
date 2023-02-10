import {
    Card,
    Box,
    Typography,
    Stack,
    Breadcrumbs,
    Grid,
    Paper,
    CardContent,
    Switch,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import styled from "@emotion/styled";
import UserService from "./servives";

const Item = styled(Paper)(({ theme }) => ({
    p: 10,
}));

export default function ViewUser(props: any) {
    const [userdet, setuserdet] = useState<any>([]);
    useEffect(() => {
        //get user det
        UserService.GetUserDet(props.id).then(response => setuserdet(response));
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
                            style={{ padding: "8px", marginBottom: "15px" }}
                        >
                            <Stack>
                                <Stack spacing={3}>
                                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                                        <Link
                                            key="1"
                                            color="inherit"
                                            href="/usermanagement/users"
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
                                            My Account
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    VIEW USER DETAILS
                                </Typography>
                            </Stack>
                        </Stack>
                        {/*bread cump */}
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Item style={{ padding: "15px" }}>
                                    <Typography>
                                        <b>Customer Detail</b>
                                    </Typography>
                                    <Stack style={{ padding: "8px" }}>
                                        <Box sx={{ display: "flex" }}>
                                            <CardContent sx={{ flex: 1 }}>
                                                <Typography component="h2" variant="h5">
                                                    {userdet && userdet.name}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    {userdet && userdet.email1}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    {userdet && userdet.phone1}
                                                </Typography>
                                                <Stack>
                                                    <Typography variant="subtitle1">
                                                        Date:
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Box>
                                    </Stack>


                                </Item>
                            </Grid>
                            <Grid item xs={7}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography><b>Manage Permillage for this user</b></Typography>
                                        <Box sx={{ width: "100%" }} style={{ marginTop: "10px" }}>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ backgroundColor: "#F0F4FF", padding: "10px" }}
                                            >
                                                <Stack>
                                                    <Stack spacing={3}>
                                                        DASHBOARD
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        OFF
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    //checked={checked}
                                                    //onChange={handleChange}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ backgroundColor: "#F0F4FF", padding: "10px", marginTop: "10px" }}

                                            >
                                                <Stack>
                                                    <Stack spacing={3}>
                                                        INVOICE
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        OFF
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    //checked={checked}
                                                    //onChange={handleChange}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ backgroundColor: "#F0F4FF", padding: "10px", marginTop: "10px" }}

                                            >
                                                <Stack>
                                                    <Stack spacing={3}>
                                                        SALES INVOICE
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        OFF
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    //checked={checked}
                                                    //onChange={handleChange}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ backgroundColor: "#F0F4FF", padding: "10px", marginTop: "10px" }}

                                            >
                                                <Stack>
                                                    <Stack spacing={3}>
                                                        ACTIVITY
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        OFF
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    //checked={checked}
                                                    //onChange={handleChange}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ backgroundColor: "#F0F4FF", padding: "10px", marginTop: "10px" }}

                                            >
                                                <Stack>
                                                    <Stack spacing={3}>
                                                        CUSTOMER
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        OFF
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    //checked={checked}
                                                    // onChange={handleChange}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            <Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked disabled />} label="Can Delete" />
                                                </FormGroup>
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                style={{ backgroundColor: "#F0F4FF", padding: "10px", marginTop: "10px" }}

                                            >
                                                <Stack>
                                                    <Stack spacing={3}>
                                                        COMPOSER
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        OFF
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    //checked={checked}
                                                    //onChange={handleChange}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box>
        </>
    );
}

