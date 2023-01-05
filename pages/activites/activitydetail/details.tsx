import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function View() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("https://api-school.mangoitsol.com/api/get_authorization_token")
      .then((response) => response.json())
      .then((res) =>
        fetch("https://api-school.mangoitsol.com/api/getuser", {
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })
          .then((response) => response.json())
          .then((res) => setUser(res.data))
          .catch((err: any) => {
            console.log(err);
          })
      )
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Container component="main">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </Card>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <div>
                <Typography className="heading" style={{ textAlign: "left" }}>
                  ACTIVITY INFO
                </Typography>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "35ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      label="Name"
                      id="filled-size-normal"
                      defaultValue="Normal"
                      variant="filled"
                    />
                    <TextField
                      label="Last Name"
                      id="filled-size-normal"
                      defaultValue="Normal"
                      variant="filled"
                    />
                    <TextField
                      label="Email Address"
                      id="filled-size-normal"
                      defaultValue="Normal"
                      variant="filled"
                    />
                    <TextField
                      label="Mobile Number"
                      id="filled-size-normal"
                      defaultValue="Normal"
                      variant="filled"
                    />
                    <TextField
                      label="Status"
                      id="filled-size-normal"
                      defaultValue="Normal"
                      variant="filled"
                    />
                    <TextField
                      label="Address"
                      id="filled-size-normal"
                      defaultValue="Normal"
                      variant="filled"
                    />
                  </div>
                </Box>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
