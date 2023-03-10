import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  Button,
  Breadcrumbs,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Pagination,
  IconButton,
  Tabs,
  Tab,
  Menu,
  styled,
} from "@mui/material";
import moment from "moment";
import Box from "@mui/material/Box";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import { api_url, auth_token } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import commmonfunctions from "../../../commonFunctions/commmonfunctions";
import MainFooter from "../../commoncmp/mainfooter";
import Alert from "@mui/material/Alert";
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface StyledTabProps {
  label: string;
  onClick: any;
  className?: any;
}

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
};

export default function CreditRequestList() {
  const [creditRequest, setCreditRequest] = useState<any>([]);
  const [fullCreditRequest, setFullCreditRequest] = useState<any>([]);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [All, setAll] = useState(0);
  const [value, setValue] = React.useState(0);
  const [custpermit, setcustpermit] = useState<any>([]);
  const [roleid, setroleid] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [showSuccess, setShowSuccess] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // verify user login
  let logintoken: any;
  const router = useRouter();
  React.useEffect(() => {
    if (!process.env.NEXT_PUBLIC_AMEX_SALES_ORDER_REDIRECT_URL) {
      logintoken = localStorage.getItem("QIS_loginToken");
      if (logintoken === undefined || logintoken === null) {
        router.push("/");
      }
    }

    commmonfunctions.GivenPermition().then((res) => {
      if (res.roleId == 1) {
        setroleid(res.roleId);
        //router.push("/userprofile");
      } else if (res.roleId > 1) {
        commmonfunctions.ManageActivity().then((res) => {
          if (!res) {
            router.push("/userprofile");
          } else {
            setcustpermit(res);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //get creditRequest
  const url = `${api_url}/getCreditNotes`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
          "x-access-token": logintoken,
        },
      });
      const json = await response.json();
      setCreditRequest(json.data);
      setFullCreditRequest(json.data);
      setsearchdata(json.data);
      setAll(json.data.length);
    } catch (error: any) {
      console.log("error", error);
    }
  };
  //searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      if (activeTab === "Pending") {
        setCreditRequest(pendingOrder);
      } else if (activeTab === "Complete") {
        setCreditRequest(completeOrder);
      } else if (activeTab === "All") {
        setCreditRequest(allListData);
      } else {
        // setCreditRequest(searchdata);
      }
    } else {
      const filterres = creditRequest.filter((item: any) => {
        return (
          item?.email1?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item?.customerName
            ?.toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });
      const dtd = filterres;
      setCreditRequest(dtd);
    }
  };

  const pendingOrder = fullCreditRequest?.filter(
    (a: any) => a?.is_complete === 0
  );
  const completeOrder = fullCreditRequest?.filter(
    (a: any) => a?.is_complete === 1
  );
  const allListData = fullCreditRequest?.filter((a: any) => a);

  //pagination
  const [row_per_page, set_row_per_page] = useState(5);
  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  let [page, setPage] = useState(1);
  const PER_PAGE = row_per_page;
  const count = Math.ceil(creditRequest.length / PER_PAGE);
  const DATA = usePagination(creditRequest, PER_PAGE);

  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  const handleAll = () => {
    setActiveTab("All");
    if (DATA?.currentPage === 1) {
      setCreditRequest(allListData);
    } else {
      handlePageChange("", 1);
    }
    // fetchData();
  };
  const handleComplete = () => {
    setActiveTab("Complete");
    if (DATA?.currentPage === 1) {
      setCreditRequest(completeOrder);
    } else {
      handlePageChange("", 1);
    }
  };

  const handlePending = () => {
    setActiveTab("Pending");
    if (DATA?.currentPage === 1) {
      setCreditRequest(pendingOrder);
    } else {
      handlePageChange("", 1);
    }
  };

  const AntTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: "none",
  }));

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
                      Credit
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  CREDIT REQUESTS
                </Typography>
                {showSuccess && (
                  <Alert
                    style={{
                      width: "50%",
                      height: 50,
                      marginLeft: 430,
                      marginTop: "-50px",
                    }}
                    severity="success"
                  >
                    Thanks You ! Payment Recieved
                  </Alert>
                )}
              </Stack>
            </Stack>
            {/*bread cump */}
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <TableContainer>
                {/*bread cump */}
                <Stack
                  style={{ marginBottom: "10px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <AntTab
                        className="filter-list"
                        label={`All (${All})`}
                        {...a11yProps(0)}
                        onClick={handleAll}
                      />
                      <AntTab
                        label={`Complete (${completeOrder?.length})`}
                        {...a11yProps(2)}
                        onClick={handleComplete}
                      />

                      <AntTab
                        label={`Pending (${pendingOrder?.length})`}
                        {...a11yProps(1)}
                        onClick={handlePending}
                      />
                    </Tabs>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="fimport-export-box"
                  >
                    <FormControl>
                      <TextField
                        placeholder="Search..."
                        size="small"
                        value={searchquery}
                        type="search..."
                        onInput={(e) => handleSearch(e)}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
                <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                        //onChange={handleCheck}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography>CREDIT REQUEST ID</Typography>
                      </TableCell>
                      <TableCell className="t-name">
                        <Typography>SALES ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>INVOICE ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>CUSTOMER NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>EMAIL</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>DATE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>MARK AS COMPLETE</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DATA.currentData() &&
                      DATA.currentData().map((item: any, key: any) => {
                        const {
                          id,
                          salesOrderId,
                          invoiceId,
                          customer_email,
                          customerName,
                          email1,
                          createdAt,
                          status,
                          is_complete,
                        } = item;
                        return (
                          <TableRow
                            key={key}
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            className={
                              item?.is_complete === 0 ? "darkBgCss" : ""
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell align="left">REQ-{id}</TableCell>
                            <TableCell align="left">
                              SAL-{salesOrderId}
                            </TableCell>
                            <TableCell align="left">
                              {invoiceId === 0 ? "----" : invoiceId}
                            </TableCell>
                            <TableCell align="left">{customerName}</TableCell>
                            <TableCell align="left">{email1}</TableCell>
                            <TableCell align="left">
                              {moment(createdAt, "YYYY-MM-DD").format(
                                "MMM DD, YYYY"
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {is_complete === 1 && status === 4 ? (
                                <p className="salesStatus">Complete</p>
                              ) : (
                                <p className="salesPendingstatus">Pending</p>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                {/* } */}
                {creditRequest == "" ? <h3>No Record found</h3> : ""}
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
                    className="pagination"
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
          </div>
          <MainFooter />
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
