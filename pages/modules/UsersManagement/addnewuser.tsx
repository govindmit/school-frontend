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
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import MiniDrawer from "../../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { api_url, auth_token } from "../../api/hello";
import UserService from "./servives";
const Item = styled(Paper)(({ theme }) => ({
    p: 10,
}));

const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
};

type FormValues = {
    name: string;
    email: string;
    number: number;
    roleid: number;
};

export default function AddNewUser() {
    const [roles, setroles] = React.useState<any>([])

    React.useEffect(() => {
        UserService.GetRoles().then(response => setroles(response));
    }, []);

    const [checked, setChecked] = React.useState<any>({
        dashboardcheck: false,
        invoicescheck: false,
    });

    const [previlegs, setprevilegs] = React.useState<any>({
        dashboard_permition: 0,
        invoice_permition: 0,
        activity_permition: 0,
        customer_permition: 0,
        sales_inv_permition: 0,
        composer_permition: 0
    });

    const handleChange = (event: any) => {
        if (event.target.checked === true && event.target.name === "dashboard") {
            setChecked({
                dashboardcheck: event.target.checked,
            })
            setprevilegs({
                dashboard_permition: 1, invoice_permition: 0,
                activity_permition: 0,
                customer_permition: 0,
                sales_inv_permition: 0,
                composer_permition: 0
            });
        } else {
            setChecked({
                dashboardcheck: event.target.checked,
            })
            setprevilegs({
                dashboard_permition: 0, activity_permition: 0,
                customer_permition: 0,
                sales_inv_permition: 0,
                composer_permition: 0
            });
        }
        // if (event.target.checked === true && event.target.name === "invoices") {
        //     setChecked({
        //         invoicescheck: event.target.checked,
        //     })
        //     setprevilegs({
        //         dashboard_permition: 0, invoice_permition: 1,
        //         activity_permition: 0,
        //         customer_permition: 0,
        //         sales_inv_permition: 0,
        //         composer_permition: 0
        //     });
        // } else {
        //     setChecked({
        //         invoicescheck: event.target.checked,
        //     })
        //     setprevilegs({
        //         dashboard_permition: 0, invoice_permition: 0,
        //         activity_permition: 0,
        //         customer_permition: 0,
        //         sales_inv_permition: 0,
        //         composer_permition: 0
        //     });
        // }
    };

    // console.log(previlegs);


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data); return false;
        // setshowspinner(true);
        //setBtnDisabled(true);
        const reqData = {
            name: data.name,
            email: data.email,
            phone: data.number,
            roleId: data.roleid,
        };
        await axios({
            method: "POST",
            url: `${api_url}/addUser`,
            data: reqData,
            headers: {
                Authorization: auth_token,
            },
        })
            .then((data: any) => {
                if (data) {
                    //setshowspinner(false);
                    //setBtnDisabled(false);
                    toast.success("Customer Added Successfully !");
                    reset();

                }
            })
            .catch((error) => {
                toast.error("Email Allready Registred !");
                //setshowspinner(false);
                //setBtnDisabled(false);
            });
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
                                    NEW USER ADD
                                </Typography>
                            </Stack>
                        </Stack>
                        {/*bread cump */}
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                                            User Name <span className="err_str">*</span>
                                                        </InputLabel>
                                                        <OutlinedInput
                                                            type="text"
                                                            id="name"
                                                            fullWidth
                                                            size="small"
                                                            {...register("name", {
                                                                required: true,
                                                                validate: (value) => { return !!value.trim() }
                                                            })}

                                                        />
                                                        {errors.name?.type === "required" && (
                                                            <span style={style}>Field is Required *</span>
                                                        )}
                                                        {errors.name?.type === "validate" && (
                                                            <span style={style}>Name can't be blank *</span>
                                                        )}
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
                                                            fullWidth
                                                            size="small"
                                                            {...register("email", {
                                                                required: true,
                                                                pattern: /^\S+@\S+$/i,
                                                                validate: (value) => { return !!value.trim() }
                                                            })}
                                                        />
                                                        {errors.email?.type === "required" && (
                                                            <span style={style}>Field is Required *</span>
                                                        )}
                                                        {errors.email?.type === "pattern" && (
                                                            <span style={style}>
                                                                Please enter a valid email address *
                                                            </span>
                                                        )}
                                                        {errors.email?.type === "validate" && (
                                                            <span style={style}>
                                                                Please enter a valid email address *
                                                            </span>
                                                        )}
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
                                                            fullWidth
                                                            size="small"
                                                            {...register("number", {
                                                                required: true,
                                                                pattern: /^[0-9+-]+$/,
                                                                minLength: 10,
                                                                maxLength: 10,
                                                            })}
                                                        />
                                                        {errors.number?.type === "required" && (
                                                            <span style={style}>Field is Required *</span>
                                                        )}
                                                        {errors.number?.type === "pattern" && (
                                                            <span style={style}>Enter Valid Number *</span>
                                                        )}
                                                        {errors.number?.type === "minLength" && (
                                                            <span style={style}>Enter Valid Number *</span>
                                                        )}
                                                        {errors.number?.type === "maxLength" && (
                                                            <span style={style}>Enter Valid Number *</span>
                                                        )}
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Stack spacing={1}>
                                                        <InputLabel htmlFor="name">Role  <span className="err_str">*</span></InputLabel>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                size="small"
                                                                defaultValue={0}
                                                                {...register("roleid", {
                                                                    required: true
                                                                })}
                                                            >
                                                                <MenuItem value={0}>Select Role</MenuItem>
                                                                {roles &&
                                                                    roles.map((data: any, key: any) => {
                                                                        return (
                                                                            <MenuItem key={key} value={data.id}>
                                                                                {data.name}
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                            </Select>
                                                        </FormControl>
                                                        {errors.roleid?.type === "pattern" && (
                                                            <span style={style}>
                                                                Please select user role *
                                                            </span>
                                                        )}
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
                                                        <b>SAVE</b>
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
                                                        checked={checked.dashboardcheck}
                                                        onChange={handleChange}
                                                        name="dashboard"
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
                                                        checked={checked.invoicescheck}
                                                        onChange={handleChange}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                        name="invoices"
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
                                                        //checked={checked}
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
                                                        //checked={checked}
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
                                                        // checked={checked}
                                                        onChange={handleChange}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Box>
            </Box>
            <ToastContainer />
        </>
    );
}

