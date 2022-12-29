import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { Inter } from "@next/font/google";
import { BiArrowBack } from "react-icons/bi";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterLine } from "react-icons/ri";
import { RxInstagramLogo } from "react-icons/rx";
const inter = Inter({ subsets: ["latin"] });
export default function forgotpassword() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <>
      <Container>
        <header>
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
            <Button
              style={{
                backgroundColor: "#26CEB3",
              }}
            >
              <BiArrowBack /> Back to Home
            </Button>
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
              boxShadow: "1px 1px 12px 0px",
              borderRadius: "25px",
              padding: "30px",
            }}
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                <span style={{ color: "#26CEB3", fontWeight: "900" }}>
                  Forgot
                </span>{" "}
                Your Password
              </Typography>
              <Typography variant="body2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Typography>Email Address</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <Button
                  style={{ backgroundColor: "#26CEB3" }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Container>
          <footer>
            <p>
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
            </p>
          </footer>
        </div>
      </section>
    </>
  );
}