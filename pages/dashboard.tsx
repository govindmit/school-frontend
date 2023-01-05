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
import MiniDrawer from "./sidebar";

export default function Dashboard() {
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
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        {/* <Container>
          <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox />
                    </TableCell>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>No of students</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user
                    ? user.map((item: any) => (
                        <TableRow hover tabIndex={-1} role="checkbox">
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <TableCell align="left">{item.id}</TableCell>
                          </TableCell>
                          <TableCell align="left">
                            {item.firstname} &nbsp; {item.lastname}
                          </TableCell>
                          <TableCell align="left">{item.email}</TableCell>
                          <TableCell align="left">Active</TableCell>
                          <TableCell align="left">2</TableCell>
                          <TableCell align="left">
                            <Link href={`/guardiansView/${item.id}`}>
                              <Button variant="contained" size="small">
                                <BiShow />
                              </Button>
                            </Link>
                            <Link href={`/editGuardians/${item.id}`}>
                              <Button variant="outlined" size="small">
                                <FiEdit />
                              </Button>
                            </Link>
                            <Button variant="outlined" size="small">
                              <RiDeleteBin5Fill />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Container> */}

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Hello Dashboard</h1>
        </Box>
      </Box>
    </>
  );
}
