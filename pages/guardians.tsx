import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TableHead,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from "axios";
export default function Guardians() {
  const [token, setToken] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    // fetch("https://api-school.mangoitsol.com/api/get_authorization_token")
    //   .then((response) => response.json())
    //   .then((res) => console.log(res, "tokennnn"))
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
  }, []);
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

  console.log(user, "usersssssss");
  return (
    <>
      <Container>
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
                          <Link href="/editactivity">
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
      </Container>
    </>
  );
}
