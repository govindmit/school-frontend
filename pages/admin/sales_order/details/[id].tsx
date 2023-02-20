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
  Button,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../../../sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { api_url, auth_token } from "../../../api/hello";
import moment from "moment";
//   import EditCustomer from "../../editcustomer";

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { id } = router.query;

  const getUserDet = async () => {
    try {
      const response = await fetch(`${api_url}/getSalesOrdersDetails/${id}`, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setUserDet(res.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getUserInvoice = async () => {
    const response = await fetch(`${api_url}/getInvoicebyUser/${id}`, {
      method: "GET",
      headers: {
        Authorization: auth_token,
      },
    });
    const res = await response.json();
    console.log("hellooooo view", res);
    setUserinvoice(res);
  };
  const getUserCloseInvoice = async () => {
    const response = await fetch(
      `${api_url}/getInvoicebyUser/${id}?key=close`,
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

  useEffect(() => {
    getUserDet();

    // getUserCloseInvoice();
    // getUserInvoice();
  }, []);
  console.log(value, "value");

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
                  VIEW SALES ORDER
                </Typography>
              </Stack>
              <Stack>
                <div className="buycss" style={{ textAlign: "end" }}>
                  <Link
                    href="/admin/sales_order/list"
                    style={{ color: "#1A70C5", textDecoration: "none" }}
                  >
                    <Button variant="contained">Back</Button>
                  </Link>
                </div>
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
                          Customer Detail
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack style={{ padding: "8px" }}>
                      <Box sx={{ display: "flex" }}>
                        <div id="profileImage">
                          <span id="fullName">
                            {" "}
                            {userDet &&
                              userDet.user_name &&
                              userDet.user_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <CardContent sx={{ flex: 1 }} className="text-grey">
                          <Typography component="h4" variant="h4">
                            {userDet && userDet.user_name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            Email : {userDet && userDet.user_email1}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            Status :
                          </Typography>
                          <Button variant="contained" size="small" className="paidcss">
                            Paid
                          </Button>
                        </CardContent>
                      </Box>
                    </Stack>
                    <div style={{ padding: "8px", display:"flex"}} className="text-grey">
                      <p>Date :</p> <p style={{marginLeft:"38%"}}>{moment(userDet?.user_create_Date).format("MMM DD, YYYY")}</p>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}>
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
                            Line Items
                          </Typography>
                        </Stack>
                      </Stack>
                      <Table style={{ marginTop: "20px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography>INVOICE ID</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>Activity</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography></Typography>
                            </TableCell>
                            <TableCell>
                              <Typography></Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>Amount</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow hover tabIndex={-1}>
                            <TableCell align="left" className="invcss" style={{fontWeight:"500"}}>INV-{userDet && userDet?.id}</TableCell>
                            <TableCell align="left"><span style={{fontWeight:"500"}}>{userDet && userDet?.activity_name}&nbsp; <Button className="btndetail" variant="contained" size="small">
          Service
        </Button></span> <br/><p style={{marginTop:"4px"}}>{userDet && userDet?.activity_shortDescription?.replace( /(<([^>]+)>)/ig, '')}</p></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">$ {userDet && userDet?.amount}</TableCell>
                          </TableRow>
                          <TableRow hover tabIndex={1}>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left" style={{fontWeight:"600"}}>SUBTOTAL</TableCell>
                            <TableCell align="left">$ {userDet && userDet?.amount}</TableCell>
                          </TableRow>
                          <TableRow hover tabIndex={2}>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"  style={{fontWeight:"600"}}>TOTAL</TableCell>
                            <TableCell align="left">$ {userDet && userDet?.amount}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
