import {
  Card,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Grid,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../../sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { api_url, auth_token } from "../../../api/api";
import EditCustomer from "../editcustomer";
import MainFooter from "../../../commoncmp/mainfooter";
import moment from "moment";     

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ViewCustomer() {
  const [value, setValue] = React.useState(0);
  const [userDet, setUserDet] = useState<any>([]);
  const [invoice, setUserinvoice] = useState<any>([]);
  const [closeinvoice, setCloseinvoice] = useState<any>([]);
  const [editCustOpen, seteditCustOpen] = React.useState(false);
  const [editid, seteditid] = useState<any>(0);
  const [creditball, setcreditball] = React.useState(0);
  const [totalinv, settotalinv] = React.useState(2);
  const [totalcrdt, settotalcrdt] = React.useState(2);
  const [btnahow, setbtnahow] = React.useState(false);
  const [btnacrdthow, setbtnacrdthow] = React.useState(false);
  const [useraddr, setuseraddr] = React.useState<any>([]);
  const [creditNotes, setcreditNotes] = React.useState<any>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();
  const { customerId } = router.query;

  useEffect(() => {
    getUserDet();
    fetchBallance();
    getUserCloseInvoice();
    getUserInvoice();
    fetchCreditNotes();
  }, []);

  const getUserDet = async () => {
    try {
      const response = await fetch(`${api_url}/getuserdetails/${customerId}`, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setUserDet(res.data[0]);
      const addr = JSON.parse(res.data[0]?.address);
      setuseraddr(addr);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUserInvoice = async () => {
    const response = await fetch(`${api_url}/getInvoicebyUser/${customerId}`, {
      method: "GET",
      headers: {
        Authorization: auth_token,
      },
    });
    const res = await response.json();
    setUserinvoice(res);
  };

  const getUserCloseInvoice = async () => {
    const response = await fetch(
      `${api_url}/getInvoicebyUser/${customerId}?key=close`,
      {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      }
    );
    const res = await response.json();
    setCloseinvoice(res);
  };

  //get credit ballance 
  const fetchBallance = async () => {
    const apiurl = `${api_url}/creditballance/${customerId}`;
    try {
      const response = await fetch(apiurl, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const json = await response.json();
      setcreditball(json.creditBal);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  //get credit notes
  const fetchCreditNotes = async () => {
    const apiurl = `${api_url}/creditballanceByUser/${customerId}`;
    try {
      const response = await fetch(apiurl, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const json = await response.json();
      setcreditNotes(json.data);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  //edit customer
  function handleEditCustomerOpen(id: any) {
    console.log(id);
    seteditCustOpen(true);
    seteditid(id);
  }
  const closeEditPoP = (data: any) => {
    seteditCustOpen(false);
    getUserDet();
  };

  //handle view all
  function handleView() {
    settotalinv(invoice.length);
    setbtnahow(true);
  }

  //handle view less
  function handleViewLess() {
    settotalinv(2);
    setbtnahow(false);
  }

  //habdle crdt show
  function handlecrdtView() {
    settotalcrdt(creditNotes.length);
    setbtnacrdthow(true);
  }

  //handle view less
  function handlecrdtViewLess() {
    settotalcrdt(2);
    setbtnacrdthow(false);
  }


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
                      View Customers
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  VIEW CUSTOMER
                </Typography>
              </Stack>
              <Stack>
                <Typography style={{ color: "#F95A37" }}>
                  <span style={{ fontSize: "14PX" }}>OWES </span>{" "}
                  <b style={{ fontSize: "26px" }}> $174.00</b>
                </Typography>
                <Typography style={{ color: "rgba(125, 134, 165, 0.6)" }}>
                  <span style={{ fontSize: "14PX" }}>CREDITS </span>
                  <b style={{ fontSize: "26px" }}> ${creditball}</b>
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
                          Profile
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          style={{ color: "#1A70C5", cursor: "pointer" }}
                          onClick={() => handleEditCustomerOpen(customerId)}
                        >
                          <b>EDIT</b>
                        </Typography>
                      </Stack>
                    </Stack>
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
                            CUST-00002
                          </Typography>
                          <Typography variant="subtitle1">
                            {userDet.email1}
                          </Typography>
                          <Typography variant="subtitle1">
                            {userDet.phone1}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Stack>
                    <Stack style={{ padding: "8px" }} className="text-grey">
                      <Typography>Address:</Typography>
                      <span>
                        {useraddr && useraddr?.add1 + " , " + useraddr?.city + " , " + useraddr?.state + " , " + useraddr?.postalcode}
                      </span>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      style={{ padding: "8px" }}
                    >
                      <Stack>
                        <Typography variant="subtitle1">
                          In My Network:
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          style={{
                            border: "1px solid gray",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                          }}
                        >
                          No
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack style={{ padding: "8px" }}>
                      <Typography>Cretaed :  {userDet && moment(userDet?.createdAt).format("DD/MM/YYYY")}</Typography>
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
                            Invoice
                          </Typography>
                        </Stack>
                        <Stack>
                          {btnahow === false ? (<Typography style={{ color: "#1A70C5", cursor: "pointer" }} onClick={handleView}>
                            <b>VIEW ALL</b>
                          </Typography>) : (<Typography style={{ color: "#1A70C5", cursor: "pointer" }} onClick={handleViewLess}>
                            <b>VIEW LESS</b>
                          </Typography>)}
                        </Stack>
                      </Stack>
                      <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                          >
                            <Tab label="OPEN INVOICES" {...a11yProps(0)} />
                            <Tab label="CLOSED INVOICES" {...a11yProps(1)} />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                          <Table style={{ marginTop: "20px" }}>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography>INVOICES</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>DATE</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>TOTAL</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>BALANCE</Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            {invoice.length > 0 ? (
                              invoice.slice(0, totalinv).map((item: any) => (
                                <TableBody>
                                  <TableRow hover tabIndex={-1}>
                                    <TableCell align="left">
                                      {item.invoiceId}
                                    </TableCell>
                                    <TableCell align="left">
                                      {item.invoiceDate}
                                    </TableCell>
                                    <TableCell align="left">
                                      {item.amount}
                                    </TableCell>
                                    <TableCell align="left">
                                      {item.amount}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ))
                            ) : (
                              <h3>No record found</h3>
                            )}
                          </Table>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                          <Table style={{ marginTop: "20px" }}>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  <Typography>INVOICES</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>DATE</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>TOTAL</Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography>BALANCE</Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            {closeinvoice.length > 0 ? (
                              closeinvoice.slice(0, totalinv).map((item: any) => (
                                <TableBody>
                                  <TableRow hover tabIndex={-1}>
                                    <TableCell align="left">
                                      {item.invoiceId}
                                    </TableCell>
                                    <TableCell align="left">
                                      {item.invoiceDate}
                                    </TableCell>
                                    <TableCell align="left">
                                      {item.amount}
                                    </TableCell>
                                    <TableCell align="left">
                                      {item.amount}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ))
                            ) : (
                              <h3>No record found</h3>
                            )}
                          </Table>
                        </TabPanel>
                      </Box>
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
                            Open Credit Notes
                          </Typography>
                        </Stack>
                        <Stack>
                          {btnacrdthow === false ? (<Typography style={{ color: "#1A70C5", cursor: "pointer" }} onClick={handlecrdtView}>
                            <b>VIEW ALL</b>
                          </Typography>) : (<Typography style={{ color: "#1A70C5", cursor: "pointer" }} onClick={handlecrdtViewLess}>
                            <b>VIEW LESS</b>
                          </Typography>)}
                        </Stack>
                      </Stack>
                      <Table style={{ marginTop: "20px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>CREDIT NOTE</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>DATE</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>STATUS</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>TOTAL</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>BALANCE</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {creditNotes.slice(0, totalcrdt).map((item: any, key: any) => {
                            return (<TableRow hover tabIndex={-1}>
                              <TableCell align="left">INV000-{item?.id}</TableCell>
                              <TableCell align="left">{moment(item?.createdAt).format("DD/MM/YYYY")}</TableCell>
                              <TableCell align="left"></TableCell>
                              <TableCell align="left">{item?.amount}</TableCell>
                              <TableCell align="left">{item?.amount}</TableCell>
                            </TableRow>)
                          })}
                        </TableBody>
                      </Table>
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
      {editCustOpen ? (
        <EditCustomer
          id={editid}
          open={editCustOpen}
          closeDialogedit={closeEditPoP}
        />
      ) : (
        ""
      )}
    </>
  );
}
