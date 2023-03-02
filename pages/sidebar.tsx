import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { useState } from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { Input } from "@mui/material";
import { useRouter } from "next/router";
import { OutlinedInput } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Head from "next/head";
import { Stack } from "@mui/system";
import commmonfunctions from "../commonFunctions/commmonfunctions";
import Footer from "./commoncmp/footer";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const handleChangeActive = () => {
  console.log("######");
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const [userdet, setuserdet] = React.useState<any>([]);
  const [checkdashboard, setcheckdashboard] = React.useState<any>(false);
  const [checkcustomers, setcheckcustomers] = React.useState<any>(false);
  const [checkInvoices, setcheckInvoices] = React.useState<any>(false);
  const [checkActivity, setcheckActivity] = React.useState<any>(false);
  const [checkSalesInvoice, setcheckSalesInvoice] = React.useState<any>(false);
  const [checkComposer, setcheckComposer] = React.useState<any>(false);
  const [isActive, setIsActive] = useState(false);
  let path = router?.pathname;
  let mngbackground = "#1976d2";
  let textcolor='white !important';
  const [profileActive, setprofileActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
    console.log("isActive", isActive);
  };

  const profileClick = () => {
    setprofileActive((current) => !current);
  };


  React.useEffect(() => {
    commmonfunctions.GivenPermition().then((res) => {
      setuserdet(res);
      const dttt = JSON.parse(res?.userPrevilegs);
      const lgh = dttt?.user_permition?.length;
      if (lgh > 0) {
        for (var i = 0; i <= lgh - 1; i++) {
          if (dttt.user_permition[i].Dashboard) {
            setcheckdashboard(true);
          } else if (dttt.user_permition[i].Customers) {
            setcheckcustomers(true);
          } else if (dttt.user_permition[i].Invoices) {
            setcheckInvoices(true);
          } else if (dttt.user_permition[i].Activites) {
            setcheckActivity(true);
          } else if (dttt.user_permition[i].Cumposers) {
            setcheckComposer(true);
          } else if (dttt.user_permition[i].SalesInvoices) {
            setcheckSalesInvoice(true);
          }
        }
      }
    });
  }, []);


  let setActivityBgColor = path.includes("activity") ? mngbackground : "";
  let setActivityColor = path.includes("activity") ? textcolor : "";

  let setSalesBgColor = path.includes("sales_order") ? mngbackground : "";
  let setSalesColor = path.includes("sales_order") ? textcolor : "";

  let setCreditBgColor = path.includes("creditnotes") ? mngbackground : "";
  let setCreditColor = path.includes("creditnotes") ? textcolor : "";

  let setDashboardBgColor = path.includes("dashboard") ? mngbackground : "";
  let setDashboardColor = path.includes("dashboard") ? textcolor : "";

  let setCostomerBgColor = path.includes("customer") ? mngbackground : "";
  let setCostomerColor = path.includes("customer") ? textcolor : "";

  let setInvoiceBgColor = path.includes("invoice") ? mngbackground : "";
  let setInvoiceColor = path.includes("invoice") ? textcolor : "";

  let setUserManagementBgColor = path.includes("usermanagement") ? mngbackground : "";
  let setUserManagementColor = path.includes("usermanagement") ? textcolor : "";

  let setComposerBgColor = path.includes("composer") ? mngbackground : "";
  let setComposerColor = path.includes("composer") ? textcolor : "";

  let setLogoutBgColor = path.includes("logout") ? mngbackground : "";
  let setLogoutColor = path.includes("logout") ? textcolor : "";

  let setProfileBgColor = path.includes("userprofile") ? mngbackground : "";
  let setProfileColor = path.includes("userprofile") ? textcolor : "";

  return (
    <>
      <Head>
        <title>QATAR INTERNATIONAL SCHOOL - QIS</title>
        <link rel="shortcut icon" href="/public/svg-icon/qatar-logo.png" />
      </Head>
      <Box sx={{ display: "flex" }} className="mainbgcss">
        <CssBaseline />
        <AppBar className="sder" position="fixed" open={false}>
          <div className="maiDiv">
            <div className="header-logo-search">
              <Toolbar>
                <Typography variant="h6" noWrap component="div">
                  <Image
                    src="/adminlogo.png"
                    alt="Picture of the author"
                    width={160}
                    height={60}
                  />
                </Typography>
              </Toolbar>
              <div className="inputBar search-box">
                <OutlinedInput
                  className="inbar search-box-outer"
                  id="name1"
                  type="text"
                  name="name"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="avatar-box">

              <Stack onClick={profileClick} direction="row" spacing={2}>
                <Avatar>N</Avatar>

                <ArrowDropDownIcon />
              </Stack>
              <List
                className={
                  profileActive
                    ? "bisplay-block drop-down-profile"
                    : "drop-down-profile"
                }
                style={{ display: "none" }}
              >
                <ListItem
                  className="sidebar-link"
                  disablePadding
                  sx={{ display: "block" }}
                  // onClick={() => router.push("/activites/activitylist")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <PeopleAltOutlinedIcon />
                    <ListItemText
                      className="text-line"
                      primary="Profile"
                      sx={{ opacity: open ? 1 : 0 }}
                      onClick={() => router.push("/userprofile")}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  className="sidebar-link"
                  disablePadding
                  sx={{ display: "block" }}
                  // onClick={() => router.push("/activites/activitylist")}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <LockOutlinedIcon />
                    <ListItemText
                      className="text-line"
                      primary="Log Out"
                      sx={{ opacity: open ? 1 : 0 }}
                      onClick={() => router.push("/logout")}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </div>
          </div>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <h1>Header</h1>
          <List>
{/* //////////////////////Customer Management////////////////////////// */}

{ userdet?.roleId === 2 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/user/dashboard")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setDashboardBgColor,
                    color:setDashboardColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <DashboardOutlinedIcon />
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
             {userdet?.roleId === 2 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/user/invoices")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setInvoiceBgColor,
                    color:setInvoiceColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <DescriptionOutlinedIcon />
                  <ListItemText
                    primary="Invoices"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
             {userdet?.roleId === 2 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/user/salesinvoice")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setSalesBgColor,
                    color:setSalesColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <DescriptionOutlinedIcon />
                  <ListItemText
                    primary="Sales Invoice"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
             {userdet?.roleId === 2 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() =>
                  router.push("/user/creditinvoice")
                }
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setCreditBgColor,
                    color:setCreditColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <CreditCardOutlinedIcon />
                  <ListItemText
                    primary="Credit Invoice"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}

            {userdet?.roleId === 2 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/user/activities")}
              >
                <ListItemButton
                  onClick={handleChangeActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setActivityBgColor,
                    color:setActivityColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon >
                  <TimelineOutlinedIcon/>
                  <ListItemText
                    primary="Activities"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}

{/* ///////////////////////////////////////////////////////////////////////// */}


            {checkdashboard === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/admin/dashboard")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setDashboardBgColor,
                    color:setDashboardColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <DashboardOutlinedIcon />
                  <ListItemText
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {checkcustomers === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/customer/customerslist")}
              >
                <ListItemButton
                  onClick={handleClick}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setCostomerBgColor,
                    color:setCostomerColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <PeopleAltOutlinedIcon />
                  <ListItemText
                    primary="Customers"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                  <ArrowDropDownIcon />
                </ListItemButton>
                <Stack
                  className={isActive ? "bisplay-block" : ""}
                  style={{ display: "none" }}
                >
                  <ListItem
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/customer/custType")}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 7 : "auto",
                        justifyContent: "center",
                      }}
                    ></ListItemIcon>
                    <PeopleAltOutlinedIcon />
                    <ListItemText
                      primary="Customers Type"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItem>
                </Stack>
              </ListItem>
            ) : (
              ""
            )}
            {checkInvoices === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/admin/invoices")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setInvoiceBgColor,
                    color:setInvoiceColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <DescriptionOutlinedIcon />
                  <ListItemText
                    primary="Invoices"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}

            {userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() =>
                  router.push("/admin/creditnotes/creditnoteslist")
                }
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setCreditBgColor,
                    color:setCreditColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <CreditCardOutlinedIcon />
                  <ListItemText
                    primary="Credit Note"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}

            {checkActivity === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/admin/activitylist")}
              >
                <ListItemButton
                  onClick={handleChangeActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setActivityBgColor,
                    color:setActivityColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon >
                  <TimelineOutlinedIcon/>
                  <ListItemText
                    primary="Activities"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {checkSalesInvoice === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/admin/sales_order/list")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setSalesBgColor,
                    color:setSalesColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <DescriptionOutlinedIcon />
                  <ListItemText
                    primary="Sales Order"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {userdet && userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/usermanagement/users")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setUserManagementBgColor,
                    color:setUserManagementColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <PeopleAltOutlinedIcon />
                  <ListItemText
                    primary="User Management"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}
            {checkComposer === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                 onClick={() => router.push("/admin/composer")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: setComposerBgColor,
                    color:setComposerColor,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  ></ListItemIcon>
                  <TimelineOutlinedIcon />
                  <ListItemText
                    primary="Composer"
                    sx={{ opacity: open ? 1 : 0 }}
                    //onClick={() => router.push("/logout")}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              ""
            )}

            <ListItem
              className="sidebar-link"
              disablePadding
              sx={{ display: "block" }}
              // onClick={() => router.push("/activites/activitylist")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: setLogoutBgColor,
                  color:setLogoutColor,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                ></ListItemIcon>
                <LockOutlinedIcon />
                <ListItemText
                  primary="Log Out"
                  sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => router.push("/logout")}
                />
              </ListItemButton>
            </ListItem>
            {userdet?.roleId === 1 ? (
            <ListItem
              className="sidebar-link"
              disablePadding
              sx={{ display: "block" }}
              // onClick={() => router.push("/activites/activitylist")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: setProfileBgColor,
                  color:setProfileColor,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                ></ListItemIcon>
                <PeopleAltOutlinedIcon />
                <ListItemText
                  primary="Profile"
                  sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => router.push("/userprofile")}
                />
              </ListItemButton>
            </ListItem>
) : (
  ""
)}

          </List>
        </Drawer>
        <Divider />
      </Box>
    </>
  );
}
