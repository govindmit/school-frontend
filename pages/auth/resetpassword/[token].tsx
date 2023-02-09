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
import { useForm } from "react-hook-form";
import { api_url, auth_token } from "../../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthHeader from "../../commoncmp/authheader";
import AuthRightTemplate from "../../commoncmp/authrighttemplate";
import Footer from "../../commoncmp/footer";
const theme = createTheme();

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [spinner, setShowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is Required").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Password should have at least 8 character and contain one uppercase, one lowercase, one number and one special character"
    ),
    confirmpassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password does not match"
      ),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors }: any = formState;
  async function onSubmit(data: any) {
    setShowspinner(true);
    setBtnDisabled(true);
    const reqData = { token: token, password: data.password };
    await axios({
      method: "POST",
      url: `${api_url}/resetpassword`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setShowspinner(false);
          setBtnDisabled(false);
          toast.success("Password Reset Successfully Please Login !");
          const redirect = () => {
            router.push("/");
          };
          setTimeout(redirect, 3000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Reset passowrd link Expired !");
        setShowspinner(false);
        setBtnDisabled(false);
      });
  }

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
            <AuthHeader />
            <AuthRightTemplate />
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
                height: 405,
                width: 400,
                marginTop: 6,
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
                <span style={{ color: "#42D5CD" }}>RESET </span>
                PASSWORD
              </Typography>
              <Typography variant="body2" style={{ color: "#5F6160" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 3 }}>
                  <Typography>New Password</Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="********"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <Typography style={style}>
                    {errors.password?.message}
                  </Typography>
                  <Typography style={{ marginTop: "15px" }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    type="password"
                    placeholder="********"
                    {...register("confirmpassword", {
                      required: true,
                    })}
                  />
                  <Typography style={style}>
                    {errors.confirmpassword?.message}
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
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
