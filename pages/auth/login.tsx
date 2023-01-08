import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IconButton } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterLine } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //console.log(data);
    const reqData = { email: data.email, password: data.password };
    //console.log(reqData);
    const end_point = "userlogin";
    await axios({
      method: "POST",
      url: api_url + end_point,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        //console.log("Success:", data);
        if (data.status === 200) {
          toast.success("Login Successfull !");
          const redirect = () => {
            router.push("/dashboard");
          };
          setTimeout(redirect, 5000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.error("invalid crendentials!");
      });
  };
  return (
    <>
      <Container className="login-page">
        <header className="header-navbar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <img src="/Vector.png" style={{ width: "62px" }} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ fontSize: "32px", fontWeight: "900" }}
          >
            Educorp
          </Typography>
          <nav className="nav-bar">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  backgroundColor: "#26CEB3",
                  textDecoration: "none",
                }}
              >
                <BiArrowBack /> Back to Home
              </Button>
            </Link>
          </nav>
        </header>
      </Container>

      <section className="productive">
        <div className="productive-img">
          <img src="/loginimg.png" alt="" />{" "}
        </div>
        <div className="productive-content">
          <Container
            component="main"
            style={{
              boxShadow: "1px 1px 10px 0px",
              borderRadius: "20px",
              padding: "25px",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                gutterBottom
                style={{ fontWeight: "900" }}
              >
                <span style={{ color: "#26CEB3" }}>Login</span> to Your Account
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
                    })}
                  />
                  <Typography style={style}>
                    {errors.email && <span>Email Feild is Required **</span>}
                  </Typography>
                  <Typography style={{ marginTop: "15px" }}>
                    Password
                  </Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    placeholder="***********"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <Typography style={style}>
                    {errors.password && (
                      <span>Password Feild is Required **</span>
                    )}
                  </Typography>
                  <Grid container style={{ marginTop: "10px" }}>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me?"
                      />
                    </Grid>
                    <Grid item>
                      <Typography style={{ marginTop: "9px" }}>
                        Forgot Password?{" "}
                        <Link
                          href="/auth/forgotpassword"
                          style={{ color: "#26CEB3" }}
                        >
                          Click here
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    style={{ backgroundColor: "#26CEB3", fontWeight: "900" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1 }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Container>
          <footer>
            <Typography>
              © 2022 Educorp. All Rights Reserved{" "}
              <a
                href="http://www.polymer-project.org/"
                target="_blank"
                style={{
                  marginLeft: "15px",
                  padding: "8px",
                  border: "1px solid gray",
                  borderRadius: "50%",
                }}
              >
                <SlSocialFacebook />
              </a>{" "}
              <a
                href="http://www.polymer-project.org/"
                target="_blank"
                style={{
                  marginLeft: "15px",
                  padding: "8px",
                  border: "1px solid gray",
                  borderRadius: "50%",
                }}
              >
                <RiTwitterLine />
              </a>
              <a
                href="http://www.polymer-project.org/"
                target="_blank"
                style={{
                  marginLeft: "15px",
                  padding: "8px",
                  border: "1px solid gray",
                  borderRadius: "50%",
                }}
              >
                <RxInstagramLogo />
              </a>
            </Typography>
          </footer>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
