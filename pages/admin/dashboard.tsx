import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TableHead,
  Button,
  Box,
  styled,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MiniDrawer from "../sidebar";
import dynamic from "next/dynamic";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import commmonfunctions from "../../commonFunctions/commmonfunctions";
import { useRouter } from "next/router";
import MainFooter from "../commoncmp/mainfooter";
import moment from "moment";
const DynamicComponentWithNoSSR = dynamic(() => import("../chart"), {
  ssr: false,
});

export default function Dashboard(this: any) {
  const router = useRouter();
  const [dashboardData, setDashBoardData] = React.useState<any>('');

  React.useEffect(() => {
    commmonfunctions.VerifyLoginUser().then(res => {
      if (res.exp * 1000 < Date.now()) {
        localStorage.removeItem('QIS_loginToken');
        localStorage.removeItem('QIS_User');
        router.push("/");
      }
    });
    const logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    }
    commmonfunctions.GivenPermition().then(res => {
      if (res.roleId === 1) {
        //router.push("/userprofile");
      } else if (res.roleId > 1 && res.roleId !== 2) {
        commmonfunctions.ManageDashboard().then(res => {
          if (!res) {
            router.push("/userprofile");
          }
        })
      } else {
        router.push("/userprofile");
      }
    });
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      const dashBoardDataResponse = await commmonfunctions.CallculateDashBoardData();
      console.log("dashBoardData =>", dashBoardDataResponse);
      setDashBoardData(dashBoardDataResponse)
    } catch (error: any) {
      console.log("error => ", error.message);
    }
  }
  const sendViewAllCustomer = () => {
    router.push("/admin/customer/customerslist");
  }
  const sendViewCreditNote = () => {
    router.push("/admin/creditnotes/creditnoteslist");
  }
  const viewCreditNoteById = (id: any) => {
    router.push(`/admin/creditnotes/viewcreditnotes/${id}`);
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      name: "All Tasks",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "My Tasks",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="dashboardBar">
            <div className="dashboardbar">
              <div>
                <span className="dashboardsmallHeading">Home</span>&nbsp;
                <span>&gt;</span> &nbsp;{" "}
                <span className="secondHeading">Dashboard</span>
                <h1 className="dashboardGtitle">DASHBOARD</h1>
              </div>
            </div>
            <div className="dashboardmidBar">
              <div className="dashboardcontent">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Item className="dashboard-box">
                        <div>
                          <div className="dmain">
                            <div>
                              <h1 className="dhead">{dashboardData?.totalCustomer}</h1>
                            </div>
                            <div className="svg">
                              <PeopleAltIcon
                                className="dimg"
                                color="primary"
                              ></PeopleAltIcon>
                            </div>
                            {/* <Image
                              className="dimg"
                              src="/school.png"
                              alt="Picture of the author"
                              width={45}
                              height={42}
                            /> */}
                          </div>

                          <div className="Dtotal">
                            {" "}
                            &nbsp;
                            <h2 className="dh1">TOTAL CUSTOMERS</h2>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item className="dashboard-box">
                        <div>
                          <div className="dmain">
                            <h1 className="dhead">${dashboardData?.totalEarning}</h1>
                            <AttachMoneyIcon
                              className="dimg"
                              color="primary"
                            ></AttachMoneyIcon>
                          </div>

                          <div className="Dtotal">
                            {" "}
                            &nbsp;
                            <h2 className="dh1">TOTAL EARNING</h2>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item className="dashboard-box">
                        <div>
                          <div className="dmain">
                            <div>
                              <h1 className="dhead">${dashboardData?.totalCredit}</h1>
                            </div>
                            <div className="svg3">
                              <AttachMoneyIcon
                                className="dimg"
                                color="primary"
                              ></AttachMoneyIcon>
                            </div>
                          </div>

                          <div className="Dtotal">
                            {" "}
                            &nbsp;
                            <h2 className="dh1">TOTAL CREDITED AMOUNT</h2>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item className="dashboard-box">
                        <div className="amo">
                          <div className="dmain">
                            <div className="jk">
                              <h1 className="dheads">{dashboardData?.pendingInvoice}</h1>
                              <span className="pend">PENDING INVOICES</span>
                            </div>
                          </div>

                          <div className="Dtotals">
                            <div>
                              <span className="dh2">${dashboardData?.pendingInvoiceAmount}</span>
                            </div>

                            <div>
                              <span className="dh2">
                                TOTAL OUTSTANDING AMOUNT
                              </span>
                            </div>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="dGraph">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={8} md={7} className="data-table-box">
                      <Item className="dtable-box">
                        <div className="dtable">
                          <Grid container spacing={2}>
                            <Grid
                              item
                              xs={8}
                              md={12}
                              className="data-table-inner"
                            >
                              <Item className="data-table-inner-item box-shadow padding-le-ri-zero">
                                <div className="Dcredit">
                                  <h3 className="lcr">Latest Credit Report</h3>
                                </div>
                                <Button className="dview" variant="text" onClick={() => { sendViewCreditNote() }}>
                                  View All
                                </Button>
                                <Container>
                                  <Card className="box-show-no border-round">
                                    <TableContainer sx={{ minWidth: 800 }}>
                                      <Table className="dasboard-table">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell>CUSTOMER</TableCell>
                                            <TableCell>DATE</TableCell>
                                            <TableCell>TOTAL</TableCell>
                                            <TableCell>BALANCE</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        {dashboardData && dashboardData?.creditRequestData.map((creditRequest: any) => {
                                          const date = creditRequest?.createdAt;
                                          const dateprint = date?.split(" ")[0]
                                          return (
                                            <TableBody>
                                              <TableRow
                                                hover
                                                tabIndex={-1}
                                                role="checkbox"
                                              >
                                                <TableCell padding="checkbox">
                                                  <Checkbox />
                                                </TableCell>
                                                <TableCell
                                                  component="th"
                                                  scope="row"
                                                  padding="none"
                                                >
                                                  <TableCell style={{ cursor: 'pointer', color: 'blue' }} align="left" onClick={() => { viewCreditNoteById(creditRequest?.creditRequestId) }}>
                                                    CRD-{creditRequest?.creditRequestId
                                                    }
                                                  </TableCell>
                                                </TableCell>
                                                <TableCell
                                                  className="dname"
                                                  align="left"
                                                >
                                                  {creditRequest?.name}
                                                </TableCell>
                                                <TableCell
                                                  className="demail"
                                                  align="left"
                                                >
                                                  {moment(dateprint, "YYYY/MM/DD").format("ll")}

                                                </TableCell>

                                                <TableCell
                                                  className="active"
                                                  align="left"
                                                >
                                                  ${creditRequest?.requestedAmount}
                                                </TableCell>

                                                <TableCell align="left">
                                                  ${creditRequest?.creditAmount}
                                                </TableCell>
                                              </TableRow>
                                            </TableBody>
                                          )
                                        })}

                                        {/* <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-001
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="active"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                        <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-002
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="dpending"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                        <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-003
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="dpending"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                        <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-004
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="active"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                        <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-004
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="active"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                        <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-004
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="active"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody>
                                        <TableBody>
                                          <TableRow
                                            hover
                                            tabIndex={-1}
                                            role="checkbox"
                                          >
                                            <TableCell padding="checkbox">
                                              <Checkbox />
                                            </TableCell>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                              padding="none"
                                            >
                                              <TableCell align="left">
                                                CRD-004
                                              </TableCell>
                                            </TableCell>
                                            <TableCell
                                              className="dname"
                                              align="left"
                                            >
                                              Gracie Owens
                                            </TableCell>
                                            <TableCell
                                              className="demail"
                                              align="left"
                                            >
                                              JAN 12, 2023{" "}
                                            </TableCell>

                                            <TableCell
                                              className="active"
                                              align="left"
                                            >
                                              Rs.768
                                            </TableCell>

                                            <TableCell align="left">
                                              $500
                                            </TableCell>
                                          </TableRow>
                                        </TableBody> */}
                                      </Table>
                                    </TableContainer>
                                  </Card>
                                </Container>
                              </Item>
                            </Grid>
                          </Grid>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={8} md={5} className="data-table-inner">
                      <Item className="box-shadow padding-le-ri-zero">
                        <div className="Dcredit">
                          <h3 className="lcr">Latest Users</h3>
                          <Button className="dview" variant="text" onClick={() => { sendViewAllCustomer() }}>
                            View All
                          </Button>
                        </div>
                        <div className="padding-22">
                          {dashboardData && dashboardData?.leatestCustomer.map((customer: any) => {
                            return (
                              <div className="Ddiv1">
                                <div id="dimage">
                                  <Avatar
                                    alt="Remy Sharp"
                                    src="/image.png"
                                    sx={{ width: 50, height: 50 }}
                                  />
                                </div>

                                <div id="dinfo">
                                  <div className="diinfo">
                                    <span className="dname">{customer?.name}</span>{" "}
                                    <span className="email">
                                      {customer?.email1}
                                    </span>
                                  </div>
                                </div>

                                <div id="dstatus">
                                  <span className="dactive" style={{ color: customer?.status === 0 ? "rgb(2 197 9)" : "red" }}>{customer?.status === 0 ? "Active" : "InActive"}</span>
                                </div>
                              </div>
                            )
                          })}
                          {/* <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div>
                          <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div>
                          <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div>
                          <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div>
                          <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div>
                          <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div>
                          <div className="Ddiv1">
                            <div id="dimage">
                              <Avatar
                                alt="Remy Sharp"
                                src="/image.png"
                                sx={{ width: 50, height: 50 }}
                              />
                            </div>

                            <div id="dinfo">
                              <div className="diinfo">
                                <span className="dname">Gracie Owens</span>{" "}
                                <span className="email">
                                  gracie@testmailinator.com
                                </span>
                              </div>
                            </div>

                            <div id="dstatus">
                              <span className="dactive">Active</span>
                            </div>
                          </div> */}
                        </div>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </div>
          <MainFooter />
        </Box>
      </Box>
    </>
  );
}
