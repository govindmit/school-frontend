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
import MainFooter from "../../commoncmp/mainfooter";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
    p: 10,
}));

export default function ViewUser(props: any) {
    const [userdet, setuserdet] = useState<any>([]);
    const [onDashboard, setonDashboard] = React.useState(false);
    const [Dashboardchecked, setDashboardchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    const [onInvoice, setonInvoice] = React.useState(false);
    const [Invoicechecked, setInvoicechecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    const [onActivity, setonActivity] = React.useState(false);
    const [Activitychecked, setActivitychecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });

    const [onCustomer, setonCustomer] = React.useState(false);
    const [Customerchecked, setCustomerchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    const [onComposer, setonComposer] = React.useState(false);
    const [Composerchecked, setComposerchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });
    const [onSalesInvoice, setonSalesInvoice] = React.useState(false);
    const [SalesInvoicechecked, setSalesInvoicechecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });

    const [onCreditNote, setonCreditNote] = React.useState(false);
    const [onCreditNotechecked, setonCreditNotechecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });

    const [onUserManagement, setonUserManagement] = React.useState(false);
    const [onUserManagementchecked, setonUserManagementchecked] = React.useState<any>({
        canView: false,
        canAdd: false,
        canEdit: false,
        canDelete: false
    });

    useEffect(() => {
        //get user det
        UserService.GetUserDet(props.id).then(response => {
            setuserdet(response);
            let datas = (response?.userPrevilegs);
            const parsedata = JSON.parse(datas)?.user_permition;
            const lgh = parsedata?.length;
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
                        setonCreditNotechecked({
                            canView: parsedata[i].CreditNote.canView,
                            canAdd: parsedata[i].CreditNote.canAdd,
                            canEdit: parsedata[i].CreditNote.canEdit,
                            canDelete: parsedata[i].CreditNote.canDelete
                        })
                    }
                    if (parsedata[i].UserManagement) {
                        setonCreditNote(true);
                        setonCreditNotechecked({
                            canView: parsedata[i].CreditNote.canView,
                            canAdd: parsedata[i].CreditNote.canAdd,
                            canEdit: parsedata[i].CreditNote.canEdit,
                            canDelete: parsedata[i].CreditNote.canDelete
                        })
                    }
                }
            }
        });
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
                                                        Date: {userdet &&
                                                            moment(userdet.createdAt).format("DD/MM/YYYY")}
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
                                                        {onDashboard ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    checked={onDashboard}
                                                    onChange={e => setonDashboard(e.target.checked)}
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onDashboard ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Dashboardchecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Dashboardchecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Dashboardchecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Dashboardchecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onInvoice ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Invoicechecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Invoicechecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Invoicechecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Invoicechecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onSalesInvoice ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={SalesInvoicechecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onActivity ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Activitychecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Activitychecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Activitychecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Activitychecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onCustomer ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Customerchecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Customerchecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Customerchecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Customerchecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onComposer ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </Stack>
                                            {onComposer ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={Composerchecked.canDelete} disabled />} label="Can Delete" />
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
                                                    disabled
                                                />
                                            </Stack>
                                            {onCreditNote ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canDelete} disabled />} label="Can Delete" />
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
                                                        User Management
                                                    </Stack>
                                                    <span style={{ color: "#333333" }}>
                                                        {onCreditNote ? (<span style={{ color: "#1976d2" }}>ON</span>) : "OFF"}
                                                    </span>
                                                </Stack>
                                                <Switch
                                                    checked={onCreditNote}
                                                    onChange={e => setonCreditNote(e.target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    disabled
                                                />
                                            </Stack>
                                            {onCreditNote ? (<Stack direction="row" style={{ marginTop: "10px" }} >
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canView} disabled />} label="Can View" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canAdd} disabled />} label="Can Add" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canEdit} disabled />} label="Can Edit" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <FormControlLabel control={<Checkbox checked={onCreditNotechecked.canDelete} disabled />} label="Can Delete" />
                                                </FormGroup>
                                            </Stack>) : ""}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                    <MainFooter />
                </Box>
            </Box>
        </>
    );
}

