import {
  Card,
  Button,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import MiniDrawer from "../../sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewCustomer() {
  useEffect(() => {}, []);

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
              style={{ padding: "8px" }}
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
                  <span style={{ fontSize: "10PX" }}>OWES </span>{" "}
                  <b> $174.00</b>
                </Typography>
                <Typography style={{ color: "#7D86A5" }}>
                  <span style={{ fontSize: "10PX" }}>CREDITS </span>
                  <b> $0.00</b>
                </Typography>
              </Stack>
            </Stack>
            {/*bread cump */}
            <Card style={{ margin: "10px", padding: "15px" }}>
              <Grid container spacing={2}>
                <Grid item xs={5}></Grid>
                <Grid item xs={7}></Grid>
              </Grid>
            </Card>
          </div>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
