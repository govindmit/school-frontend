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
import { api_url, auth_token } from "./api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {
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
  password: string;
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

export default function LoginPage() {
  const router = useRouter();
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
    const reqData = { email: data.email, password: data.password };
    //console.log(reqData);

    await axios({
      method: "POST",
      url: `${api_url}userlogin`,
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
          toast.success("Login Successfull !");
          const redirect = () => {
            router.push("/dashboard");
          };
          setTimeout(redirect, 2000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("invalid crendentials!");
        setShowspinner(false);
        setBtnDisabled(false);
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
            <header className="header-navbar">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <img src="/svg-icon/svgicon.png" />
              </IconButton>
            </header>
            <header className="header-navbar">
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
            <Box sx={{ width: "100%" }}>
              <Stack>
                <Typography
                  style={{
                    fontSize: "50px",
                    fontWeight: "900",
                    color: "#333333",
                    lineHeight: "46px",
                  }}
                >
                  WELCOME
                  <span style={{ color: "#42D5CD" }}>QATAR,</span>
                </Typography>
                <Typography style={{ fontSize: "32px", fontWeight: "900" }}>
                  CUSTOMER SELF SERVICE
                </Typography>
              </Stack>
              <Stack>
                <Typography>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration.
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Lorem Ipsum is simply dummy text of the printing"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="When an unknown printer took a galley of type and scrambled"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="It was popularised in the 1960s with the"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Lorem Ipsum is simply dummy text of the printing"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="When an unknown printer took a galley of type and scrambled"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="It was popularised in the 1960s with the"
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
            <header className="header-navbar">
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
              style={{
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <Typography
                style={{
                  fontSize: "46px",
                  fontWeight: "900",
                  color: "#333333",
                }}
              >
                <span style={{ color: "#42D5CD" }}>LOGIN &nbsp;</span>
                NOW!
              </Typography>
              <Typography variant="body2" style={{ color: "#5F6160" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      <div>Email Field is required **</div>
                    )}
                  </Typography>

                  <Typography style={style}>
                    {" "}
                    {errors?.email?.type === "pattern" && (
                      <div>Please Enter Valid Email **</div>
                    )}
                  </Typography>
                  <Typography style={{ marginTop: "15px" }}>
                    Password
                  </Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="***********"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <Typography style={style}>
                    {errors.password && (
                      <span>Password Field is Required **</span>
                    )}
                  </Typography>
                  <Grid container style={{ marginTop: "10px" }}>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox defaultChecked color="primary" />}
                        label="Remember me?"
                      />
                    </Grid>
                    <Grid item>
                      <Typography style={{ marginTop: "9px" }}>
                        Forgot Password?{" "}
                        <Link
                          href="/auth/forgotPassword"
                          style={{ color: "#26CEB3" }}
                        >
                          Click here
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    style={{ backgroundColor: "#1A70C5", fontWeight: "900" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
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
