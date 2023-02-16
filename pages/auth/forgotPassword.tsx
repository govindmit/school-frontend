import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import Head from "next/head";
import AuthHeader from "../commoncmp/authheader";
import AuthRightTemplate from "../commoncmp/authrighttemplate";
import Footer from "../commoncmp/footer";
const theme = createTheme();

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email1: string;
};

export default function ForgotPasswordPage() {
  const [emailerr, setemailerr] = React.useState("");
  const [emailSuccess, setemailSuccess] = React.useState("");
  const [spinner, setShowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setShowspinner(true);
    setBtnDisabled(true);
    const reqData = { email1: data.email1 };
    await axios({
      method: "POST",
      url: `${api_url}/forgotpassword`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          setShowspinner(false);
          setBtnDisabled(false);
          setemailSuccess("Link Send Successfully Ckech Your Email ");
          reset();
          setTimeout(() => {
            setemailSuccess("");
          }, 5000);
        }
      })
      .catch((error) => {
        setShowspinner(false);
        setBtnDisabled(false);
        setemailerr("Email Not Registred");
        setTimeout(() => {
          setemailerr("");
        }, 5000);
      });
  };

  return (
    <>
      <Head>
        <title>QATAR INTERNATIONAL SCHOOL - QIS</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              background: "#F0F3FF",
            }}
          >
            <AuthHeader />
            <AuthRightTemplate />
          </Grid>
          <Grid
            className="headre-right-main"
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div style={{ width: "100%" }}></div>
            <Box
              sx={{
                height: 360,
                width: 400,
                marginTop: 12,
                marginLeft: 11,
              }}
            >
              <Typography
                style={{
                  fontSize: "35px",
                  fontWeight: "900",
                  color: "#333333",
                }}
              >
                <span style={{ color: "#26CEB3" }}>Forgot</span> Your Password
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#5F6160", marginBottom: "15px" }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                {emailerr !== "" ? (
                  <Alert
                    severity="error"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    The email is Not Registered with us !
                  </Alert>
                ) : (
                  ""
                )}
                {emailSuccess !== "" ? (
                  <Alert
                    severity="success"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    Reset Password Link Send Successfully.
                  </Alert>
                ) : (
                  ""
                )}
                <Box sx={{ mt: 1 }}>
                  <Typography>Email Address</Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    placeholder="Email Address..."
                    {...register("email1", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                  <Typography style={style}>
                    {errors?.email1?.type === "required" && (
                      <div>Email field is required *</div>
                    )}
                  </Typography>
                  <Typography style={style}>
                    {errors?.email1?.type === "pattern" && (
                      <div>Please Enter Valid Email *</div>
                    )}
                  </Typography>
                  <Button
                    style={{ backgroundColor: "#1A70C5", fontWeight: "900" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={btnDisabled}
                  >
                    Submit
                    <Typography
                      style={{ fontSize: "2px", paddingLeft: "10px" }}
                    >
                      {spinner === true ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        ""
                      )}
                    </Typography>
                  </Button>
                  <Stack style={{ alignItems: "end" }}>
                    <Link
                      href="/"
                      style={{
                        color: "#1A70C5",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      <BiArrowBack /> Back to Login
                    </Link>
                  </Stack>
                </Box>
              </form>
            </Box>
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
