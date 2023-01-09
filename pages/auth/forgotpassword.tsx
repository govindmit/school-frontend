import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BiArrowBack } from "react-icons/bi";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterLine } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token, base_url } from "../api/hello";
import axios from "axios";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  email: string;
};

export default function Forgotpassword() {
  const [emailerr, setemailerr] = React.useState("");
  const [emailsuccess, setemailsuccess] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //console.log(data);
    const reqData = {
      email: data.email,
      reset_password_page_url: `${base_url}auth/resetpassword`,
    };
    console.log(reqData);
    const end_point = "forgotpassword";
    await axios({
      method: "POST",
      url: api_url + end_point,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        console.log("Success:", data);
        setemailsuccess("Link Send Successfully Ckech Your Email ");
        setTimeout(() => {
          setemailsuccess("");
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setemailerr("Email Not Registred");
        setTimeout(() => {
          setemailerr("");
        }, 5000);
      });
  };

  return (
    <>
      <Container className="forgot-password">
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
          {" "}
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
              <Typography variant="h5" gutterBottom>
                <span style={{ color: "#26CEB3", fontWeight: "900" }}>
                  Forgot
                </span>{" "}
                Your Password
              </Typography>
              <Typography variant="body2" style={{ color: "#5F6160" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                {emailerr !== "" ? (
                  <Alert
                    severity="error"
                    style={{ marginTop: "10px", marginBottom: "10px" }}
                  >
                    This Email Not Registred!
                  </Alert>
                ) : (
                  ""
                )}
                {emailsuccess !== "" ? (
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
                      <div>Email Feild is required **</div>
                    )}
                  </Typography>
                  <Typography style={style}>
                    {errors?.email?.type === "pattern" && (
                      <div>Enter Valid Email **</div>
                    )}
                  </Typography>
                  <Button
                    style={{ backgroundColor: "#26CEB3", fontWeight: "900" }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
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
    </>
  );
}
