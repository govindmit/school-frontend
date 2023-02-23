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
import commmonfunctions from "./commonFunctions/commmonfunctions";
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

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  React.useEffect(() => {
    commmonfunctions.GivenPermition().then((res) => {
      setuserdet(res);
      const dttt = JSON.parse(res?.userPrevilegs);
      console.log(dttt);
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

  return (
    <>
      <Head>
        <title>QATAR INTERNATIONAL SCHOOL - QIS</title>
        <link rel="shortcut icon" href="/public/svg-icon/qatar-logo.png" />
      </Head>
      <Box sx={{ display: "flex" }}>
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
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="avatar-box">
              <Stack direction="row" spacing={2}>
                <Avatar>N</Avatar>
                <ArrowDropDownIcon />
              </Stack>
            </div>
          </div>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <h1>Header</h1>
          <List>
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
                onClick={() => router.push("/admin/creditnotes/creditnoteslist")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
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
                    primary="Credit Notes"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ) : ""}

            {checkActivity === true || userdet?.roleId === 1 ? (
              <ListItem
                className="sidebar-link"
                disablePadding
                sx={{ display: "block" }}
                onClick={() => router.push("/admin/activitylist")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
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
                    primary="Activity"
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
              // onClick={() => router.push("/activites/activitylist")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
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
           
          </List>
      
        </Drawer>
        <Divider />
      </Box>
    </>
  );
}