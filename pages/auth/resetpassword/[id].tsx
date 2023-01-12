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
import { api_url, auth_token } from "../../api/hello";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Footer from "../../components/footer";
const theme = createTheme();

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  password: string;
  confirmpassword: string;
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

export default function ResetPasswordPage() {
  const router = useRouter();
  const { id } = router.query;
  //console.log(id);
  const [spinner, setShowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is Required"),
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
    console.log(JSON.stringify(data, null, 4));
    const reqData = { token: id, password: data.password };
    //console.log(reqData);
    await axios({
      method: "POST",
      url: `${api_url}resetpassword`,
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
          toast.success("Password Reset Successfully Please Login !");
          const redirect = () => {
            router.push("/");
          };
          setTimeout(redirect, 2000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("Internal Server Error !");
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
                  <span style={{ color: "#42D5CD" }}> QATAR,</span>
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
                    {...register("password")}
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
              {/* <Footer /> */}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}
