import {
    Card,
    Button,
    Box,
    Typography,
    Stack,
    Breadcrumbs,
    Grid,
    InputLabel,
    OutlinedInput,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import UserService from './servives'
const Item = styled(Paper)(({ theme }) => ({
    p: 10,
}));

export default function EditUser(props: any) {
    const [userdet, setuserdet] = useState<any>([]);
    const [checked, setChecked] = React.useState(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
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
                                    EDIT USER ADD
                                </Typography>
                            </Stack>
                        </Stack>
                        {/*bread cump */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Item style={{ padding: "15px" }}>
                                    <Typography>
                                        <b>User Info</b>
                                    </Typography>
                                    <Stack style={{ marginTop: "20px" }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="name">
                                                        User Name  <span className="err_str">*</span>
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        type="text"
                                                        id="name"
                                                        fullWidth
                                                        size="small"
                                                    // {...register("name")}
                                                    // value={activites.name}
                                                    />
                                                    <Typography
                                                    //style={style}
                                                    >
                                                        {/* {errors.name && (
                                                <span>Name Feild is Required **</span>
                                            )} */}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="Price">
                                                        Email id  <span className="err_str">*</span>
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        type="text"
                                                        id="name"
                                                        placeholder="price..."
                                                        fullWidth
                                                        size="small"
                                                    // {...register("price")}
                                                    // value={activites.price}
                                                    />
                                                    <Typography
                                                    //style={style}
                                                    >
                                                        {/* {errors.price && <span> Price Required **</span>} */}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="Price">
                                                        Phone no   <span className="err_str">*</span>
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        type="text"
                                                        id="name"
                                                        placeholder="price..."
                                                        fullWidth
                                                        size="small"
                                                    // {...register("price")}
                                                    // value={activites.price}
                                                    />
                                                    <Typography
                                                    //style={style}
                                                    >
                                                        {/* {errors.price && <span> Price Required **</span>} */}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="Price">
                                                        Role    <span className="err_str">*</span>
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        type="text"
                                                        id="name"
                                                        placeholder="price..."
                                                        fullWidth
                                                        size="small"
                                                    // {...register("price")}
                                                    // value={activites.price}
                                                    />
                                                    <Typography
                                                    //style={style}
                                                    >
                                                        {/* {errors.price && <span> Price Required **</span>} */}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} md={12} style={{ paddingTop: "0px" }}>
                                                <Stack
                                                    textAlign={"end"}
                                                >
                                                    <span style={{ color: "#26CEB3", fontWeight: "bold" }}>
                                                        Create New Role
                                                    </span>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} style={{ paddingTop: "0px" }}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    <b>SAVE & UPDATE</b>
                                                </Button>{" "}
                                                <Link
                                                    style={{ color: "red", textDecoration: "none" }}
                                                    href="/usermanagement/users"
                                                >
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        style={{
                                                            marginRight: "30px",
                                                            backgroundColor: "#F95A37",
                                                        }}
                                                    >
                                                        <b>CANCEL</b>
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography><b>Manage Permillage for this user</b></Typography>
                                        <Box sx={{ width: "100%" }}>
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
                                                    checked={checked}
                                                    onChange={handleChange}
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
                                                    checked={checked}
                                                    onChange={handleChange}
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
                                                    checked={checked}
                                                    onChange={handleChange}
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
                                                    checked={checked}
                                                    onChange={handleChange}
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
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            <Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Can Delete" />
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
                                                    checked={checked}
                                                    onChange={handleChange}
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
            <ToastContainer />
        </>
    );
}

