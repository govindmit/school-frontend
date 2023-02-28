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
    CircularProgress,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import UserService from './servives'
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { api_url, auth_token } from "../../api/hello";
import { useRouter } from "next/router";
import MainFooter from "../../commoncmp/mainfooter";
const Item = styled(Paper)(({ theme }) => ({
    p: 10,
}));

type FormValues = {
    name: string;
    email: string;
    number: number;
    roleid: number;
    previlegs: Array<string>;
};
const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
};

export default function EditUser(props: any) {
    const router = useRouter();
    const [spinner, setshowspinner] = React.useState(false);
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [roles, setroles] = React.useState<any>([])
    const [rolestatus, setrolestatus] = React.useState<any>("");
    let permitions: { Dashboard?: any; Invoices?: any; SalesInvoices?: any; Activites?: any; Customers?: any; Cumposers?: any; CreditNote?: any }[] = [];
    const [onDashboard, setonDashboard] = React.useState(false);
    const [Dashboardchecked, setDashboardchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    if (onDashboard) {
        permitions.push({
            Dashboard: Dashboardchecked
        })
    }
    const [onInvoice, setonInvoice] = React.useState(false);
    const [Invoicechecked, setInvoicechecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    if (onInvoice) {
        permitions.push({
            Invoices: Invoicechecked
        })
    }
    const [onActivity, setonActivity] = React.useState(false);
    const [Activitychecked, setActivitychecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    if (onActivity) {
        permitions.push({
            Activites: Activitychecked
        })
    }

    const [onCustomer, setonCustomer] = React.useState(false);
    const [Customerchecked, setCustomerchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    if (onCustomer) {
        permitions.push({
            Customers: Customerchecked
        })
    }
    const [onComposer, setonComposer] = React.useState(false);
    const [Composerchecked, setComposerchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });

    if (onComposer) {
        permitions.push({
            Cumposers: Customerchecked
        })
    }

    const [onSalesInvoice, setonSalesInvoice] = React.useState(false);
    const [SalesInvoicechecked, setSalesInvoicechecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    if (onSalesInvoice) {
        permitions.push({
            SalesInvoices: SalesInvoicechecked
        })
    }

    const [onCreditNote, setonCreditNote] = React.useState(false);
    const [CreditNotechecked, setCreditNotechecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    if (onCreditNote) {
        permitions.push({
            CreditNote: CreditNotechecked
        })
    }

    console.log(permitions);

    useEffect(() => {
        //get roles
        UserService.GetRoles().then(response => setroles(response));
        //get user det
        UserService.GetUserDet(props.id).then(response => {
            if (response?.userPrevilegs != null) {
                let datas = (response?.userPrevilegs);
                const parsedata = JSON.parse(datas)?.user_permition;
                const lgh = parsedata.length;
                if (lgh > 0) {
                    for (var i = 0; i <= lgh - 1; i++) {
                        if (parsedata[i].Dashboard) {
                            setonDashboard(true);
                            setDashboardchecked({
                                canView: parsedata[i].Dashboard.canView,
                                canAdd: parsedata[i].Dashboard.canAdd,
                                canEdit: parsedata[i].Dashboard.canEdit,
                                canDelete: parsedata[i].Dashboard.canDelete
                            })
                        }
                        if (parsedata[i].Customers) {
                            setonCustomer(true);
                            setCustomerchecked({
                                canView: parsedata[i].Customers.canView,
                                canAdd: parsedata[i].Customers.canAdd,
                                canEdit: parsedata[i].Customers.canEdit,
                                canDelete: parsedata[i].Customers.canDelete
                            }
                            )
                        }
                        if (parsedata[i].Invoices) {
                            setonInvoice(true);
                            setInvoicechecked({
                                canView: parsedata[i].Invoices.canView,
                                canAdd: parsedata[i].Invoices.canAdd,
                                canEdit: parsedata[i].Invoices.canEdit,
                                canDelete: parsedata[i].Invoices.canDelete
                            })
                        }
                        if (parsedata[i].Activites) {
                            setonActivity(true);
                            setActivitychecked({
                                canView: parsedata[i].Activites.canView,
                                canAdd: parsedata[i].Activites.canAdd,
                                canEdit: parsedata[i].Activites.canEdit,
                                canDelete: parsedata[i].Activites.canDelete
                            }
                            )

                        }
                        if (parsedata[i].Cumposers) {
                            setonComposer(true);
                            setComposerchecked({
                                canView: parsedata[i].Cumposers.canView,
                                canAdd: parsedata[i].Cumposers.canAdd,
                                canEdit: parsedata[i].Cumposers.canEdit,
                                canDelete: parsedata[i].Cumposers.canDelete
                            }
                            )
                        }
                        if (parsedata[i].SalesInvoices) {
                            setonSalesInvoice(true);
                            setSalesInvoicechecked({
                                canView: parsedata[i].SalesInvoices.canView,
                                canAdd: parsedata[i].SalesInvoices.canAdd,
                                canEdit: parsedata[i].SalesInvoices.canEdit,
                                canDelete: parsedata[i].SalesInvoices.canDelete
                            })
                        }
                        if (parsedata[i].CreditNote) {
                            setonCreditNote(true);
                            setCreditNotechecked({
                                canView: parsedata[i].CreditNote.canView,
                                canAdd: parsedata[i].CreditNote.canAdd,
                                canEdit: parsedata[i].CreditNote.canEdit,
                                canDelete: parsedata[i].CreditNote.canDelete
                            })
                        }
                    }
                }
            }
            setValue("name", response && response.name);
            setValue("email", response && response.email1);
            setValue("number", response && response.phone1);
            setrolestatus(response && response.roleId);

        });
    }, []);


    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setshowspinner(true);
        setBtnDisabled(true);
        const reqData = {
            name: data.name,
            email: data.email,
            phone: data.number,
            roleId: data.roleid,
            previlegs: permitions,
            status: 1,
            userRole: "user"
        };
        await axios({
            method: "put",
            url: `${api_url}/edituser/${props.id}`,
            data: reqData,
            headers: {
                Authorization: auth_token,
            },
        })
            .then((data: any) => {
                if (data) {
                    toast.success("User updated successfully!");
                    setshowspinner(false);
                    setBtnDisabled(false);
                    setTimeout(() => {
                        router.push("/usermanagement/users");
                    }, 2000);
                }
            })
            .catch((error) => {
                toast.error("Email Allready Registred !");
                setshowspinner(false);
                setBtnDisabled(false);
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
                                    EDIT USER ADD
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
                                                            User Name  <span className="err_str">*</span>
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
                                                            <span style={style}>Field can't be blank *</span>
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
                                                        <InputLabel htmlFor="Price">
                                                            Role    <span className="err_str">*</span>
                                                        </InputLabel>
                                                        <FormControl fullWidth>
                                                            {rolestatus !== "" ? (<Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                size="small"
                                                                defaultValue={rolestatus}
                                                                {...register("roleid", {
                                                                    required: true
                                                                })}
                                                            >
                                                                {roles &&
                                                                    roles.map((data: any, key: any) => {
                                                                        return (
                                                                            <MenuItem key={key} value={data.id}>
                                                                                {data.name}
                                                                            </MenuItem>
                                                                        );
                                                                    })}
                                                            </Select>) : ("")}

                                                        </FormControl>
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
                                                        disabled={btnDisabled}
                                                    >
                                                        <b>SAVE & UPDATE</b>
                                                        <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
                                                            {spinner === true ? <CircularProgress color="inherit" /> : ""}
                                                        </span>
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
                                                            {onDashboard ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onDashboard}
                                                        onChange={e => setonDashboard(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onDashboard ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Dashboardchecked.canView} onChange={e => setDashboardchecked({ ...Dashboardchecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Dashboardchecked.canAdd} onChange={e => setDashboardchecked({ ...Dashboardchecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Dashboardchecked.canEdit} onChange={e => setDashboardchecked({ ...Dashboardchecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Dashboardchecked.canDelete} onChange={e => setDashboardchecked({ ...Dashboardchecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
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
                                                            {onInvoice ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onInvoice}
                                                        onChange={e => setonInvoice(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onInvoice ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Invoicechecked.canView} onChange={e => setInvoicechecked({ ...Invoicechecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Invoicechecked.canAdd} onChange={e => setInvoicechecked({ ...Invoicechecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Invoicechecked.canEdit} onChange={e => setInvoicechecked({ ...Invoicechecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Invoicechecked.canDelete} onChange={e => setInvoicechecked({ ...Invoicechecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
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
                                                            {onSalesInvoice ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onSalesInvoice}
                                                        onChange={e => setonSalesInvoice(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onSalesInvoice ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canView} onChange={e => setSalesInvoicechecked({ ...SalesInvoicechecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canAdd} onChange={e => setSalesInvoicechecked({ ...SalesInvoicechecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canEdit} onChange={e => setSalesInvoicechecked({ ...SalesInvoicechecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canDelete} onChange={e => setSalesInvoicechecked({ ...SalesInvoicechecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
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
                                                            {onActivity ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onActivity}
                                                        onChange={e => setonActivity(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onActivity ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Activitychecked.canView} onChange={e => setActivitychecked({ ...Activitychecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Activitychecked.canAdd} onChange={e => setActivitychecked({ ...Activitychecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Activitychecked.canEdit} onChange={e => setActivitychecked({ ...Activitychecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Activitychecked.canDelete} onChange={e => setActivitychecked({ ...Activitychecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
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
                                                            {onCustomer ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onCustomer}
                                                        onChange={e => setonCustomer(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onCustomer ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Customerchecked.canView} onChange={e => setCustomerchecked({ ...Customerchecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Customerchecked.canAdd} onChange={e => setCustomerchecked({ ...Customerchecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Customerchecked.canEdit} onChange={e => setCustomerchecked({ ...Customerchecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Customerchecked.canDelete} onChange={e => setCustomerchecked({ ...Customerchecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
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
                                                            {onComposer ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onComposer}
                                                        onChange={e => setonComposer(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onComposer ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Composerchecked.canView} onChange={e => setComposerchecked({ ...Composerchecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Composerchecked.canAdd} onChange={e => setComposerchecked({ ...Composerchecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Composerchecked.canEdit} onChange={e => setComposerchecked({ ...Composerchecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={Composerchecked.canDelete} onChange={e => setComposerchecked({ ...Composerchecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
                                                <Stack
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    style={{ backgroundColor: "#F0F4FF", padding: "10px", marginTop: "15px" }}

                                                >
                                                    <Stack>
                                                        <Stack spacing={3}>
                                                            CREDIT NOTE
                                                        </Stack>
                                                        <span style={{ color: "#333333" }}>
                                                            {onCreditNote ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                        </span>
                                                    </Stack>
                                                    <Switch
                                                        checked={onCreditNote}
                                                        onChange={e => setonCreditNote(e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </Stack>
                                                {onCreditNote ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={CreditNotechecked.canView} onChange={e => setCreditNotechecked({ ...CreditNotechecked, canView: e.target.checked })} />} label="Can View" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={CreditNotechecked.canAdd} onChange={e => setCreditNotechecked({ ...CreditNotechecked, canAdd: e.target.checked })} />} label="Can Add" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={CreditNotechecked.canEdit} onChange={e => setCreditNotechecked({ ...CreditNotechecked, canEdit: e.target.checked })} />} label="Can Edit" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <FormControlLabel control={<Checkbox checked={CreditNotechecked.canDelete} onChange={e => setCreditNotechecked({ ...CreditNotechecked, canDelete: e.target.checked })} />} label="Can Delete" />
                                                    </FormGroup>
                                                </Stack>) : ""}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </form >
                    </div>
                    <MainFooter />
                </Box>
            </Box>
            <ToastContainer />
        </>
    );
}

