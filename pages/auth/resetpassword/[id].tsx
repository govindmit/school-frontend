import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BiArrowBack } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { RxInstagramLogo } from "react-icons/rx";
import { RiTwitterLine } from "react-icons/ri";
import { SlSocialFacebook } from "react-icons/sl";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { api_url, auth_token } from "../../api/hello";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

type FormValues = {
  password: string;
  confirmpassword: string;
};

export default function Resetpassword() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);

    const reqData = { email: data.password, password: data.confirmpassword };
    //console.log(reqData);
    const end_point = "resetpassword";
    await axios({
      method: "POST",
      url: `${api_url}${end_point}/${id}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        //console.log("Success:", data);
        if (data.status === 200) {
          toast.success("Pasword Reset Successfull Please Login !");
          const redirect = () => {
            router.push("/auth/login");
          };
          setTimeout(redirect, 5000);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
        toast.success("Enternal Server Error !");
      });
  };

  return (
    <>
      <Container className="reset-password">
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
              <Button style={{ backgroundColor: "#26CEB3" }}>
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
                  {" "}
                  Reset{" "}
                </span>
                Password
              </Typography>
              <Typography variant="body2" style={{ color: "#5F6160" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 1 }}>
                  <Typography>New Password</Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    placeholder="********"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <Typography style={style}>
                    {errors.password && (
                      <span> Password Feild is Required **</span>
                    )}
                  </Typography>
                  <Typography style={{ marginTop: "15px" }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    style={{ marginTop: "8px" }}
                    fullWidth
                    size="small"
                    placeholder="********"
                    {...register("confirmpassword", {
                      required: true,
                    })}
                  />
                  <Typography style={style}>
                    {errors.confirmpassword && (
                      <span>Confirm Password Feild is Required **</span>
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
      <ToastContainer />
    </>
  );
}
