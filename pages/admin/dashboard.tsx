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
                      <Item>
                        <div>
                          <div className="dmain">
                            <h1 className="dhead">157</h1>
                            <PeopleAltIcon
                              className="dimg"
                              color="primary"
                            ></PeopleAltIcon>
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
                            <h2 className="dh1">TOTAL USERS</h2>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        <div>
                          <div className="dmain">
                            <h1 className="dhead">1021</h1>
                            <Image
                              className="dstud"
                              src="/cap.png"
                              alt="Picture of the author"
                              width={45}
                              height={42}
                            />
                          </div>

                          <div className="Dtotal">
                            {" "}
                            &nbsp;
                            <h2 className="dh1">NUMBER OF STUDENTS</h2>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        <div>
                          <div className="dmain">
                            <h1 className="dhead">1021</h1>
                            <BabyChangingStationIcon
                              className="dimg"
                              color="primary"
                            ></BabyChangingStationIcon>
                          </div>

                          <div className="Dtotal">
                            {" "}
                            &nbsp;
                            <h2 className="dh1">TOTAL GUARDIANS</h2>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Item>
                        <div>
                          <div className="dmain">
                            <h1 className="dhead">$123.12</h1>
                            <AttachMoneyIcon
                              className="dlimg"
                              color="primary"
                            ></AttachMoneyIcon>
                          </div>

                          <div className="Dtotal">
                            {" "}
                            &nbsp;
                            <h2 className="dh1">TOTAL REFUND AMOUNT</h2>
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
                    <Grid item xs={8} md={7}>
                      <Item>
                        <span className="dramount">Refund Amount</span>
                        <DynamicComponentWithNoSSR />
                      </Item>
                    </Grid>
                    <Grid item xs={8} md={5}>
                      <Item>
                        <div className="dlhead">
                          <h3 className="dluser">Latest Users</h3>
                          <Button className="dview" variant="text">
                            View All
                          </Button>
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
                              &nbsp;&nbsp;
                              <span className="hh">
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
                              &nbsp;&nbsp;
                              <span className="hh">
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
                              &nbsp;&nbsp;
                              <span className="hh">
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
                              &nbsp;&nbsp;
                              <span className="hh">
                                gracie@testmailinator.com
                              </span>
                            </div>
                          </div>

                          <div id="dstatus">
                            <span className="dactive">Active</span>
                          </div>
                        </div>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="dtable">
                <Grid container spacing={2}>
                  <Grid item xs={8} md={12}>
                    <Item>
                      <div className="Dcredit">
                        <h3>Latest Credit Report</h3>
                      </div>
                      <Container>
                        <Card>
                          <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell padding="checkbox">
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell>ID</TableCell>
                                  <TableCell>USER NAME</TableCell>
                                  <TableCell>EMAIL</TableCell>
                                  <TableCell>STATUS</TableCell>
                                  <TableCell>AMOUNT</TableCell>
                                  <TableCell>INVOICE ID</TableCell>
                                  <TableCell>ACTION</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow hover tabIndex={-1} role="checkbox">
                                  <TableCell padding="checkbox">
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <TableCell align="left">01</TableCell>
                                  </TableCell>
                                  <TableCell className="dname" align="left">
                                    Gracie Owens
                                  </TableCell>
                                  <TableCell className="demail" align="left">
                                    gracie@testmailinator.com
                                  </TableCell>

                                  <TableCell className="active" align="left">
                                    APPROVED
                                  </TableCell>

                                  <TableCell align="left">$500</TableCell>
                                  <TableCell align="left">1000001</TableCell>
                                  <TableCell align="left">
                                    {/* <Button variant="contained" size="small"> */}
                                    <div className="dicon">
                                      <Image
                                        className="dimg"
                                        src="/deleteicon.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                      <Image
                                        className="dimg"
                                        src="/download.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                    </div>

                                    {/* </Button> */}

                                    {/* <Button variant="outlined" size="small">
                                      <FiEdit />
                                    </Button>

                                    <Button variant="outlined" size="small">
                                      <RiDeleteBin5Fill />
                                    </Button>
                                    <Button variant="outlined" size="small">
                                      <RiDeleteBin5Fill />
                                    </Button> */}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow hover tabIndex={-1} role="checkbox">
                                  <TableCell padding="checkbox">
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <TableCell align="left">01</TableCell>
                                  </TableCell>
                                  <TableCell className="dname" align="left">
                                    Gracie Owens
                                  </TableCell>
                                  <TableCell className="demail" align="left">
                                    gracie@testmailinator.com
                                  </TableCell>

                                  <TableCell className="dpending" align="left">
                                    PENDING
                                  </TableCell>

                                  <TableCell align="left">$500</TableCell>
                                  <TableCell align="left">1000001</TableCell>
                                  <TableCell align="left">
                                    <div className="dicon">
                                      <Image
                                        className="dimg"
                                        src="/deleteicon.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                      <Image
                                        className="dimg"
                                        src="/download.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow hover tabIndex={-1} role="checkbox">
                                  <TableCell padding="checkbox">
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <TableCell align="left">01</TableCell>
                                  </TableCell>
                                  <TableCell className="dname" align="left">
                                    Gracie Owens
                                  </TableCell>
                                  <TableCell className="demail" align="left">
                                    gracie@testmailinator.com
                                  </TableCell>

                                  <TableCell className="dpending" align="left">
                                    PENDING
                                  </TableCell>

                                  <TableCell align="left">$500</TableCell>
                                  <TableCell align="left">1000001</TableCell>
                                  <TableCell align="left">
                                    <div className="dicon">
                                      <Image
                                        className="dimg"
                                        src="/deleteicon.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                      <Image
                                        className="dimg"
                                        src="/download.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                    </div>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                              <TableBody>
                                <TableRow hover tabIndex={-1} role="checkbox">
                                  <TableCell padding="checkbox">
                                    <Checkbox />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <TableCell align="left">01</TableCell>
                                  </TableCell>
                                  <TableCell className="dname" align="left">
                                    Gracie Owens
                                  </TableCell>
                                  <TableCell className="demail" align="left">
                                    gracie@testmailinator.com
                                  </TableCell>

                                  <TableCell className="active" align="left">
                                    APPROVED
                                  </TableCell>

                                  <TableCell align="left">$500</TableCell>
                                  <TableCell align="left">1000001</TableCell>
                                  <TableCell align="left">
                                    <div className="dicon">
                                      <Image
                                        className="dimg"
                                        src="/deleteicon.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                      <Image
                                        className="dimg"
                                        src="/download.svg"
                                        alt="Picture of the author"
                                        width={35}
                                        height={32}
                                      />
                                    </div>
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
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
