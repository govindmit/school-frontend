import {
    Card,
    Table,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    Box,
    Typography,
    Stack,
    Breadcrumbs,
    FormControl,
    TextField,
    Menu,
    MenuItem,
    Grid,
    InputLabel,
    Container,
    Select,
    IconButton,
    OutlinedInput,
    Pagination,
    Tabs,
    Tab,
    Paper,
    TextareaAutosize,
    CardContent,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import { api_url, auth_token } from "../../api/hello";
import { BiFilterAlt, BiShow } from "react-icons/bi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ConfirmBox from "../../commoncmp/confirmbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AddCustomer from "./addNewCustomer";
// import EditCustomer from "./editcustomer";
import { useRouter } from "next/router";
import { CSVDownload } from "react-csv";
import styled from "@emotion/styled";
// import Loader from "../commoncmp/myload";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


const Item = styled(Paper)(({ theme }) => ({
    p: 10,
}));

//pagination function
function usePagination(data: any, itemsPerPage: any) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);
    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }
    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }
    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }
    function jump(page: any) {
        const pageNumber = Math.max(1, page);
        setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }
    return { next, prev, jump, currentData, currentPage, maxPage };
}

//filter form values
type FormValues = {
    customerType: number;
    status: number;
    phoneNumber: number;
    contactName: string;
    sorting: number;
    ParentId: string;
};

export default function AddNewUser() {
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
                                            href="/admin/dashboard"
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
                                            <Grid item xs={12} md={12}>
                                                <Stack
                                                    textAlign={"end"}
                                                >
                                                    <Typography style={{ color: "#1A70C5" }}>
                                                        VIEW ALL
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    <b>SAVE & UPDATE</b>
                                                </Button>{" "}
                                                <Link
                                                    style={{ color: "red", textDecoration: "none" }}
                                                    href="/activites/activitylist"
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

