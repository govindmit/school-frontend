import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
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
  OutlinedInput,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Image from "next/image";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MiniDrawer from "../sidebar";

import TasksChart from "../chart";
import dynamic from "next/dynamic";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const DynamicComponentWithNoSSR = dynamic(() => import("../chart"), {
  ssr: false,
});
export default function Dashboard(this: any) {
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
                              <h1 className="dhead">157</h1>
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
                            <h1 className="dhead">$1300</h1>
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
                              <h1 className="dhead">$1021</h1>
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
                              <h1 className="dheads">15</h1>
                              <span className="pend">PENDING INVOICES</span>
                            </div>
                          </div>

                          <div className="Dtotals">
                            <div>
                              <span className="dh2">$2024</span>
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
                                <Container>
                                  <Card className="box-show-no border-round">
                                    <TableContainer sx={{ minWidth: 800 }}>
                                      <Table>
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
                                        </TableBody>
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
                          <Button className="dview" variant="text">
                            View All
                          </Button>
                        </div>
                        <div className="padding-22">
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
                        </div>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
