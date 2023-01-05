import * as React from "react";
import { Layout } from "antd";
import { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Image from "next/image";
// import "../styles/navbar.css";

const { Header, Footer, Sider, Content } = Layout;
export interface IAppProps {}

function Navbar(props: IAppProps) {
  return (
    <div className="navbar">
      <div className="navigation">
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Image
              src="/school.png"
              alt="Picture of the author"
              width={20}
              height={22}
            />
            &nbsp;
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Educorp
            </Typography>
            <nav>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                HOME
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                ABOUT
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                EVENTS
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                NEWSLETTER
              </Link>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                <Image
                  src="/Vector.png"
                  alt="Picture of the author"
                  width={14}
                  height={12}
                />
                &nbsp; SIGN IN
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
      </div>
      <div className="slider">
        <Carousel>
          <div>
            <div className="text">
              <div>
                <p className="headline">The Leader in Online Learning</p>
                <h2 className="heading">
                  Build an Incredible Learning Experience BUILD AN INCREDIBLE
                  LEARNING EXPERIENCE
                </h2>
              </div>
              <p className="paragraph">
                There are many variations of passages of lorem ipsum available
                but the majority have suffered alteration in some form by
                injected humour or randomised words which don't look even
                sightly believable
              </p>
              <p className="paragraph">
                There are many variation of passages of Lorem ipsum available
              </p>
            </div>
            <div className="image">
              <Image
                src="/slider.png"
                alt="Picture of the author"
                width={350}
                height={350}
              />
            </div>
          </div>
          <div>
            <div className="text">
              <div>
                <p className="headline">The Leader in Online Learning</p>
                <h2 className="heading">
                  Build an Incredible Learning Experience
                </h2>
              </div>
              <p className="paragraph">
                There are many variations of passages of lorem ipsum available
                but the majority have suffered alteration in some form by
                injected humour or randomised words which don't look even
                sightly believable
              </p>
              <p className="paragraph">
                There are many variation of passages of Lorem ipsum available
              </p>
            </div>
            <div className="image">
              <Image
                src="/img.png"
                alt="Picture of the author"
                width={500}
                height={350}
              />
            </div>
          </div>
          <div>
            <div className="text">
              <div>
                <p className="headline">The Leader in Online Learning</p>
                <h2 className="heading">
                  Build an Incredible Learning Experience
                </h2>
              </div>
              <p className="paragraph">
                There are many variations of passages of lorem ipsum available
                but the majority have suffered alteration in some form by
                injected humour or randomised words which don't look even
                sightly believable
              </p>
              <p className="paragraph">
                There are many variation of passages of Lorem ipsum available
              </p>
            </div>
            <div className="image">
              <Image
                src="/img.png"
                alt="Picture of the author"
                width={500}
                height={350}
              />
            </div>
          </div>
        </Carousel>
      </div>
      <div className="about">
        <div>
          <div className="aboutImage">
            <Image
              src="/about.png"
              alt="Picture of the author"
              width={450}
              height={300}
            />
          </div>
          <div className="aboutText">
            <div>
              <p style={{ color: "#20ad96" }}>About Educorp</p>
              <h1 className="aboutHeading"> Welcome To Educorp School</h1>
              <p style={{ color: "#8b8a8a" }}>
                About Educorp Welcome To Educorp School Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Natus qui, pariatur nulla,
                sint voluptatibus explicabo voluptates aliquid dolorem suscipit
                nostrum expedita itaque nesciunt autem ?
                <Link
                  variant="button"
                  color="#20ad96"
                  href="#"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Read More
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="upcomingEvent">
        <div className="1stDiv">
          <span>
            <p className="event">Fetured Events</p>
            <h2 className="eventHeading"> Join our upcoming event</h2>
          </span>
        </div>
        <div className="Div">
          <span className="date" style={{ margin: "0px" }}>
            <h2 style={{ margin: "0px" }}>02</h2>
            <p style={{ margin: "0px" }}>October 2022</p>
          </span>
          <span className="location" style={{ margin: "0px" }}>
            <h5 style={{ margin: "0px" }}>
              <Image
                src="/location.png"
                alt="Picture of the author"
                width={10}
                height={10}
              />
              &nbsp; New York, US
            </h5>
            <p className="midText" style={{ margin: "0px" }}>
              Global education fall meeting for everyone{" "}
            </p>
          </span>
          <span className="tst" style={{ margin: "0px" }}>
            <h5 className="timeSlot" style={{ margin: "0px" }}>
              10:30am - 12:30pm
            </h5>
          </span>
          <span className="time" style={{ margin: "0px" }}>
            <button style={{ margin: "0px", border: "none" }}>
              View Events
            </button>
            {/* <p style={{ margin: "0px" }}>View Events</p> */}
          </span>
        </div>

        <div className="Div">
          <span className="date" style={{ margin: "0px" }}>
            <h2 style={{ margin: "0px" }}>02</h2>
            <p style={{ margin: "0px" }}>October 2022</p>
          </span>
          <span className="location" style={{ margin: "0px" }}>
            <h5 style={{ margin: "0px" }}>
              <Image
                src="/location.png"
                alt="Picture of the author"
                width={10}
                height={10}
              />
              &nbsp; New York, US
            </h5>
            <p className="midText" style={{ margin: "0px" }}>
              Global education fall meeting for everyone{" "}
            </p>
          </span>
          <span className="tst" style={{ margin: "0px" }}>
            <h5 className="timeSlot" style={{ margin: "0px" }}>
              10:30am - 12:30pm
            </h5>
          </span>
          <span className="time" style={{ margin: "0px" }}>
            <button style={{ margin: "0px", border: "none" }}>
              View Events
            </button>
            {/* <p style={{ margin: "0px" }}>View Events</p> */}
          </span>
        </div>

        <div className="Div">
          <span className="date" style={{ margin: "0px" }}>
            <h2 style={{ margin: "0px" }}>02</h2>
            <p style={{ margin: "0px" }}>October 2022</p>
          </span>
          <span className="location" style={{ margin: "0px" }}>
            <h5 style={{ margin: "0px" }}>
              <Image
                src="/location.png"
                alt="Picture of the author"
                width={10}
                height={10}
              />
              &nbsp; New York, US
            </h5>
            <p className="midText" style={{ margin: "0px" }}>
              Global education fall meeting for everyone{" "}
            </p>
          </span>
          <span className="tst" style={{ margin: "0px" }}>
            <h5 className="timeSlot" style={{ margin: "0px" }}>
              10:30am - 12:30pm
            </h5>
          </span>
          <span className="time" style={{ margin: "0px" }}>
            <button style={{ margin: "0px", border: "none" }}>
              View Events
            </button>
            {/* <p style={{ margin: "0px" }}>View Events</p> */}
          </span>
        </div>

        <div className="Div">
          <span className="date" style={{ margin: "0px" }}>
            <h2 style={{ margin: "0px" }}>02</h2>
            <p style={{ margin: "0px" }}>October 2022</p>
          </span>
          <span className="location" style={{ margin: "0px" }}>
            <h5 style={{ margin: "0px" }}>
              <Image
                src="/location.png"
                alt="Picture of the author"
                width={10}
                height={10}
              />
              &nbsp; New York, US
            </h5>
            <p className="midText" style={{ margin: "0px" }}>
              Global education fall meeting for everyone{" "}
            </p>
          </span>
          <span className="tst" style={{ margin: "0px" }}>
            <h5 className="timeSlot" style={{ margin: "0px" }}>
              10:30am - 12:30pm
            </h5>
          </span>
          <span className="time" style={{ margin: "0px" }}>
            <button style={{ margin: "0px", border: "none" }}>
              View Events
            </button>
            {/* <p style={{ margin: "0px" }}>View Events</p> */}
          </span>
        </div>

        <span style={{ marginLeft: "45%" }}>
          <Button variant="contained" size="medium">
            View More
          </Button>
        </span>
        {/* <Button className="view" style={{ margin: "0px", border: "none" }}>
          View More
        </Button> */}
      </div>
      <div className="newsletter">
        <h5 className="newshead">Newsletter</h5>
        <div className="mainDiv">
          <h2 className="subscribe">Subscribe Our Newsletter</h2>
          <p className="newsText">
            Learn from anywhere in the world on desktop, or mobile phone with an
            Internet connection.
          </p>
        </div>
        <div className="textField">
          <TextField id="margin-dense" margin="dense" />{" "}
          <Button variant="contained" size="medium">
            Subscribe Now!{" "}
          </Button>
        </div>
      </div>
      <div className="footer">
        <div>
          <h5 className="footerHead">
            <Image
              src="/school.png"
              alt="Picture of the author"
              width={25}
              height={38}
            />{" "}
            Educorp
          </h5>

          <p className="footerParagraph">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.{" "}
          </p>
        </div>
        <div>
          <h2 className="social">Connect with Social Media</h2>
          <div className="icon">
            <span className="simg">
              <Image
                src="/fb.png"
                alt="Picture of the author"
                width={25}
                height={25}
              />
            </span>
            <span className="simg">
              <Image
                src="/twiter.png"
                alt="Picture of the author"
                width={25}
                height={25}
              />
            </span>
            <span className="simg">
              <Image
                src="/insta.png"
                alt="Picture of the author"
                width={25}
                height={25}
              />
            </span>
          </div>
        </div>
        <div className="lastContent">© 2022 Educorp. All Rights Reserved</div>
      </div>

      {/* <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>{" "} */}
    </div>
  );
}

export default Navbar;
