import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TableHead,
  Button,
  Box,
  styled,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import MiniDrawer from "./sidebar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Guardians() {
  const [token, setToken] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const BootstrapButton = styled(Button)({
    backgroundColor: "#1A70C5",
    color: "#FFFFFF",
    margin: "7px",
    "&:hover": {
      backgroundColor: "#1A70C5",
    },
  });

  const getUser = () => {
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
  };

  useEffect(() => {
    return getUser;
  }, []);

  const handlechange = (e: any) => {
    const results =
      user &&
      user.filter((post: any) => {
        var a;
        var b;
        // if (a === "" && b === "") {
        //   console.log("dayatatatatatattaatta");
        //   return getUser();
        // }
        if (e.target.value === "") {
          return getUser();
        } else {
          a = post.firstname
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
          b = post.email.toLowerCase().includes(e.target.value.toLowerCase());
          console.log(a, b, "AB");

          return a || b;
        }
      });
    setUser(results);
  };
  console.log(user, "usersssssss");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="guardianBar">
            <div className="bar">
              <div>
                <span className="smallHeading">Home</span>&nbsp;
                <span>&gt;</span> &nbsp;{" "}
                <span className="secondHeading">Guardians</span>
                <h1 className="Gtitle">GUARDIANS</h1>
              </div>
              <div className="searchBar">
                <Link href='/addguardians'>
                <BootstrapButton type="button" >Add Guardians</BootstrapButton>
                </Link>
                {/* <Button sx={{ margin: "7px" }} type="button">
                  Add Guardians
                </Button> */}
              </div>
            </div>
            <div className="midBar">
              <div className="guardianList">
                <div className="outLine">
                  <OutlinedInput
                    onChange={(e) => handlechange(e)}
                    id="name"
                    type="text"
                    name="name"
                    // defaultValue={user?.firstname}
                    // value={user.firstname}
                    placeholder="Search"
                    multiline
                  />
                </div>

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
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <TableCell align="left">
                                      {item.id}
                                    </TableCell>
                                  </TableCell>
                                  <TableCell align="left">
                                    {item.firstname} &nbsp; {item.lastname}
                                  </TableCell>
                                  <TableCell align="left">
                                    {item.email}
                                  </TableCell>
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
                                    <Button
                                      variant="outlined"
                                      onClick={handleOpen}
                                      size="small"
                                    >
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
              </div>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Guardian
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure want to delete “Gracie” Guardians from the
                  records.
                  <div className="kk">
                    <Button
                      className="popup"
                      // onClick={handledelete}
                      variant="text"
                    >
                      ok
                    </Button>
                    <Button className="ok" variant="text">
                      cancel
                    </Button>
                  </div>
                </Typography>
              </Box>
            </Modal>
          </div>
        </Box>
      </Box>
    </>
  );
}
