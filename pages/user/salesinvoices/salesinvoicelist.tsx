import {
    Card,
    Table,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    FormControl,
    TableContainer,
    TableHead,
    Button,
    Breadcrumbs,
    Box,
    Pagination,
    styled,
    OutlinedInput,
    Typography,
    Tabs,
    Tab,
} from "@mui/material";
import { Grid, InputLabel, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../../pages/sidebar";
import axios from "axios";
import Select from "@mui/material/Select";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import commmonfunctions from "../../../commonFunctions/commmonfunctions";
import { api_url, auth_token } from "../../api/hello";
import MainFooter from "../../commoncmp/mainfooter";
import RequestFormCmp from "./requestFormCmp";

const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
};

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export interface FormValues {
    message: string;
}

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


export default function UserInvoices() {
    const [getSalesInvoices, setgetSalesInvoices] = useState<any>([]);
    const [searchdata, setsearchdata] = useState([]);
    const [searchquery, setsearchquery] = useState("");
    const [value, setValue] = useState(0);
    const [reqDet, setreqDet] = useState<any>([]);
    const [custid, setcustid] = useState(0);
    const router = useRouter();
    const [CreditReqFormOpen, setCreditReqFormOpen] = useState(false);
    const handleChanges = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // verify user login and previlegs
    useEffect(() => {
        let logintoken: any;
        commmonfunctions.VerifyLoginUser().then(res => {
            if (res.exp * 1000 < Date.now()) {
                localStorage.removeItem('QIS_loginToken');
            }
            if (res && res?.id) {
                setcustid(res?.id);
                getSalesOrdersByUser(res.id);
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
    }, []);

    //get invoices by user id
    const getSalesOrdersByUser = async (id: number) => {
        await axios({
            method: "get",
            url: `${api_url}/getSalesOrdersByUser/${id}`,
            headers: {
                Authorization: auth_token,
            },
        })
            .then((res) => {
                setgetSalesInvoices(res?.data?.data);
                setsearchdata(res?.data?.data);
            })
            .catch((err) => {
                console.log(err)
            });
    };

    // pagination;
    const [row_per_page, set_row_per_page] = useState(5);
    function handlerowchange(e: any) {
        set_row_per_page(e.target.value);
    }
    let [page, setPage] = React.useState(1);
    const PER_PAGE = row_per_page;
    const count = Math.ceil(getSalesInvoices?.length / PER_PAGE);
    const DATA = usePagination(getSalesInvoices, PER_PAGE);
    const handlePageChange = (e: any, p: any) => {
        setPage(p);
        DATA.jump(p);
    };

    // searching functionality
    const searchItems = (e: any) => {
        setsearchquery(e.target.value);
        if (e.target.value === "") {
            setgetSalesInvoices(searchdata);
        } else {
            const filterres = getSalesInvoices.filter((item: any) => {
                return (
                    item.activity_name
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    `${item?.amount}`.includes(e.target.value)
                );
            });
            const dtd = filterres;
            setgetSalesInvoices(dtd);
        }
    };


    //Credit Request
    const handleClickOpen = (item: any) => {
        setreqDet(item);
        setCreditReqFormOpen(true);
    };

    const closePoP = (data: any) => {
        setCreditReqFormOpen(false);
        getSalesOrdersByUser(custid);

    };

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className="guardianBar">
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
                                            href="/"
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
                                            Sales Invoice
                                        </Link>
                                    </Breadcrumbs>
                                </Stack>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    style={{ fontWeight: "bold", color: "#333333" }}
                                >
                                    SALES INVOICE
                                </Typography>
                            </Stack>
                        </Stack>
                        <Card
                            style={{ margin: "10px", padding: "15px" }}
                            className="box-shadow"
                        >
                            <TableContainer>
                                <Stack
                                    style={{ marginBottom: "10px" }}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Tabs
                                            value={value}
                                            onChange={handleChanges}
                                            aria-label="basic tabs example"
                                        >
                                            <Tab
                                                className="filter-list"
                                                label={`All (${getSalesInvoices.length})`}
                                                {...a11yProps(0)}
                                            />
                                        </Tabs>
                                    </Box>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        className="fimport-export-box"
                                    >
                                        <FormControl>
                                            <OutlinedInput
                                                onChange={(e) => searchItems(e)}
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Search"
                                                value={searchquery}
                                            />
                                        </FormControl>
                                    </Stack>
                                </Stack>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>SALES INVOICE ID</TableCell>
                                            <TableCell>ACTIVITY</TableCell>
                                            <TableCell>STATUS</TableCell>
                                            <TableCell>AMOUNT</TableCell>
                                            <TableCell className="action-th">ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {DATA.currentData() && DATA.currentData() ? (
                                            DATA.currentData().map((item: any) => (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    className="boder-bottom"
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none">
                                                        <Link
                                                            href={`/user/salesinvoices/viewsalesinvoice/${item.id}`}>
                                                            <TableCell align="left">
                                                                INV-000{item.id}
                                                            </TableCell>
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {item.activity_name}
                                                    </TableCell>
                                                    <TableCell align="left">{item?.status === 0 ? (<span style={{ color: "#02C509", fontWeight: "bold" }}>Paid</span>) : ""}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <b>${item.amount}.00</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="action-td">
                                                        {item?.amount !== 0 ? (<div className="btn">
                                                            {item.isRequested === 1 ? (<Button size="small" variant="outlined" style={{ backgroundColor: "#D1D2D2", color: "whitesmoke" }} disabled sx={{ width: 135 }} ><b>Requested</b></Button>) : (<Button size="small" variant="outlined" onClick={() => handleClickOpen(item)} ><b>Create Request</b></Button>)}
                                                        </div>) : (<div className="btn">
                                                            {(<Button size="small" variant="outlined" disabled style={{ backgroundColor: "#D1D2D2", color: "whitesmoke" }}><b>Create Request</b></Button>)}
                                                        </div>)}

                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <h3>No Record found</h3>
                                        )}
                                    </TableBody>
                                </Table>
                                {getSalesInvoices == "" ? <h3>No Record found</h3> : ""}
                                <Stack
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                        justifyContent: "end",
                                        alignItems: "center",
                                    }}
                                    direction="row"
                                >
                                    <Pagination
                                        count={count}
                                        page={page}
                                        color="primary"
                                        onChange={handlePageChange}
                                    />
                                    <FormControl>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={5}
                                            onChange={handlerowchange}
                                            size="small"
                                        >
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </TableContainer>
                        </Card>
                        <ToastContainer />
                    </div>
                    <MainFooter />
                </Box >
            </Box >
            {
                CreditReqFormOpen ? (
                    <RequestFormCmp open={RequestFormCmp} reqDet={reqDet} closeDialog={closePoP} />
                ) : (
                    ""
                )
            }
        </>
    );
}