import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  FormGroup,
  IconButton,
  Stack,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import Head from "next/head";
const theme = createTheme();

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email: string;
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [emailerr, setemailerr] = React.useState("");
  const [emailSuccess, setemailSuccess] = React.useState("");
  const [spinner, setShowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setShowspinner(true);
    setBtnDisabled(true);
    //console.log(data);
    const reqData = { email: data.email };
    //console.log(reqData);
    await axios({
      method: "POST",
      url: `${api_url}forgotpassword`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        //console.log("Success:", data);
        if (data.status === 200) {
          setShowspinner(false);
          setBtnDisabled(false);
          console.log("Success:", data);
          setemailSuccess("Link Send Successfully Ckech Your Email ");
          setTimeout(() => {
            setemailSuccess("");
          }, 5000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
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
              //backgroundImage: "url(https://source.unsplash.com/random)",
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
            <header className="header-navbar1">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <img src="/svg-icon/svgicon.png" />
              </IconButton>
            </header>
            <header className="header-navbar2">
              <IconButton></IconButton>
              <nav className="nav-bar">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <img src="/svg-icon/Vector.png" />
                </IconButton>
              </nav>
            </header>
            <Box
              sx={{
                height: 400,
                width: 450,
              }}
              style={{ marginLeft: "20%" }}
            >
              <Stack>
                <Typography
                  style={{
                    fontSize: "40px",
                    fontWeight: "900",
                    color: "#333333",
                    lineHeight: "46px",
                  }}
                >
                  WELCOME
                  <span style={{ color: "#42D5CD" }}>QATAR,</span>
                </Typography>
                <Typography style={{ fontSize: "25px", fontWeight: "900" }}>
                  CUSTOMER SELF SERVICE
                </Typography>
              </Stack>
              <Stack>
                <Typography style={{ fontSize: "14px", marginTop: "10px" }}>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                </Typography>
                <FormGroup style={{ marginTop: "10px" }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    //label="Lorem Ipsum is simply dummy text of the printing"
                    label={
                      <Box component="div" fontSize={14}>
                        Lorem Ipsum is simply dummy text of the printing
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    //label="When an unknown printer took a galley of type and scrambled"
                    label={
                      <Box component="div" fontSize={14}>
                        When an unknown printer took a galley of type and
                        scrambled
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    //label="It was popularised in the 1960s with the"
                    label={
                      <Box component="div" fontSize={14}>
                        It was popularised in the 1960s with the
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    //label="Lorem Ipsum is simply dummy text of the printing"
                    label={
                      <Box component="div" fontSize={14}>
                        Lorem Ipsum is simply dummy text of the printing
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    //label="When an unknown printer took a galley of type and scrambled"
                    label={
                      <Box component="div" fontSize={14}>
                        When an unknown printer took a galley of type and
                        scrambled
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    //label="It was popularised in the 1960s with the"
                    label={
                      <Box component="div" fontSize={14}>
                        It was popularised in the 1960s with the
                      </Box>
                    }
                  />
                </FormGroup>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <header className="header-navbar1">
              <Typography></Typography>
              <nav className="nav-bar">
                <Link
                  href="/"
                  style={{
                    color: "#1A70C5",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  <BiArrowBack /> Back to Home
                </Link>
              </nav>
            </header>
            <Box
              sx={{
                height: 400,
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
                    This Email Not Registered!
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
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                  <Typography style={style}>
                    {errors?.email?.type === "required" && (
                      <div>Email field is required **</div>
                    )}
                  </Typography>
                  <Typography style={style}>
                    {errors?.email?.type === "pattern" && (
                      <div>Please Enter Valid Email **</div>
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
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
