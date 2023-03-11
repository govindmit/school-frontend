import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../helper/config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import AuthHeader from "./commoncmp/authheader";
import AuthRightTemplate from "./commoncmp/authrighttemplate";
import Footer from "./commoncmp/footer";
// import commmonfunctions from "../commonFunctions/commmonfunctions";
import commmonfunctions from "../commonFunctions/commmonfunctions";
const theme = createTheme();
const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email1: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [spinner, setShowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  React.useEffect(() => {
    const logintoken = localStorage.getItem("QIS_loginToken");
    if (logintoken === undefined || logintoken === null) {
      router.push("/");
    } else {
      router.push("/userprofile");
    }
    commmonfunctions.VerifyLoginUser().then(res => {
      if (res.exp * 1000 < Date.now()) {
        localStorage.removeItem('QIS_loginToken');
        localStorage.removeItem('QIS_User');
        router.push("/");
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setShowspinner(true);
    setBtnDisabled(true);
    const reqData = { email1: data.email1, password: data.password };
    await axios({
      method: "POST",
      url: `${api_url}/userlogin`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setShowspinner(false);
          setBtnDisabled(false);
          toast.success("Login Successful !");
          reset();
          const loginToken = res.data.loginToken;
          const role = res.data.data.role_id;
          const QIS_User = res.data.data.name;
          localStorage.setItem("QIS_loginToken", loginToken);
          localStorage.setItem("QIS_User", QIS_User);
          const redirect = () => {
            if (role === 1) {
              router.push("/admin/dashboard");
            }else if (role === 2) {
              router.push("/user/dashboard");
            }  else {
              router.push("/userprofile");
            }
          };
          setTimeout(redirect, 3000);
        }
      })
      .catch((error) => {
        toast.error("invalid crendentials!");
        setShowspinner(false);
        setBtnDisabled(false);
      });
  };
  return (
    <>
      <Head>
        <title>QATAR INTERNATIONAL SCHOOL - QIS</title>
        <link rel="shortcut icon" href="/public/svg-icon/qatar-logo.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            className="header-main"
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
              className="width-full"
              sx={{
                height: 415,
                width: 380,
                marginTop: 5,
                marginLeft: 11,
              }}
            >
              <Typography
                style={{
                  fontSize: "40px",
                  fontWeight: "900",
                  color: "#333333",
                }}
              >
                <span style={{ color: "#42D5CD" }}>LOGIN &nbsp;</span>
                NOW!
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: "#5F6160",
                  fontSize: "18px",
                  marginBottom: "20px",
                }}
              >
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
                    {...register("email1", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />

                  <Typography style={style}>
                    {errors?.email1?.type === "required" && (
                      <div>Email Field is required *</div>
                    )}
                  </Typography>

                  <Typography style={style}>
                    {" "}
                    {errors?.email1?.type === "pattern" && (
                      <div>Please Enter Valid Email *</div>
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
                      <span>Password Field is Required *</span>
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
                    style={{
                      backgroundColor: "#1A70C5",
                      fontWeight: "500",
                      fontSize: "18px",
                      textTransform: "capitalize",
                      marginTop: "20px",
                    }}
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
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
