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
import { Grid, InputLabel, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import MiniDrawer from "../sidebar";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { api_url, base_url } from "../api/hello";
import moment from "moment";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MenuItem from "@mui/material/MenuItem";
import { useForm, SubmitHandler } from "react-hook-form";

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
export interface FormValues {
  status: Number;
  res: String;
}
export default function Guardians() {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [token, setToken] = useState([]);
  const [user, setUser] = useState<FormValues | any>([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();

  const [search, setSearch] = useState();
  const [id, setId] = useState();
  const [error, setError] = useState<any>("");

  const handleOpen = (id: any) => {
    setOpen(true);
    setId(id);
    // handledelete(id);
  };
  const handleClose = () => setOpen(false);

  const BootstrapButton = styled(Button)({
    backgroundColor: "#1A70C5",
    color: "#FFFFFF",
    margin: "7px",
    "&:hover": {
      backgroundColor: "#1A70C5",
    },
  });

  const getUser = async () => {
    await axios({
      method: "POST",
      url: `https://api-school.mangoitsol.com/api/getInvoiceByUserId`,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res, "ressssss");
        setUser(res?.data.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    let reqData = {
      status: data.status,
    };

    await axios({
      method: "POST",
      url: `https://api-school.mangoitsol.com/api/getInvoiceByUserId`,
      data: reqData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res, "ressssss");
        setUser(res?.data.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleCancel = () => {
    handleClose();
  };
  const handledelete = () => {};
  // useEffect(() => {
  //   return getUser;
  // }, []);

  // const handlechange = (e: any) => {
  //   const results =
  //     user &&
  //     user.filter((post: any) => {
  //       var a;
  //       var b;
  //       if (e.target.value) {
  //         a = post.firstName
  //           .toLowerCase()
  //           .includes(e.target.value.toLowerCase());
  //         b = post.amount.toLowerCase().includes(e.target.value.toLowerCase());

  //         return a || b;
  //       }
  //     });

  //   if (results.length > 0 && e.target.value) {
  //     setError("");
  //     setUser(results);
  //   } else if (results.length === 0 && e.target.value) {
  //     let data = 1;
  //     return setError(data);
  //   } else {
  //     getUser();
  //     setError("");
  //   }
  // };
  // const handleChange = (event: any) => {
  //   setStatus(event.target.value);
  // };

  // const InactiveRecords = user.filter((a: any) => a.status == 0);
  // const activeRecords = user.filter((a: any) => a.status == 1);
  console.log(user, "user");
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
                <span className="secondHeading">Invoices</span>
                <h1 className="Gtitle">INVOICES</h1>
              </div>
              <div className="searchBar">
                <Link href="/addguardians">
                  <BootstrapButton type="button">New Invoice</BootstrapButton>
                </Link>
                {/* <Button sx={{ margin: "7px" }} type="button">
                    Add Guardians
                  </Button> */}
              </div>
            </div>
            <div className="midBar">
              <div className="guardianList">
                <div className="hh">
                  <span className="fields">All(0)</span>
                  <span className="field">Drafts(0)</span>
                  <span className="field">Outstanding(0)</span>
                  <span className="field">Past Due(0)</span>
                  {/* <span className="field">Paid(0)</span> */}
                </div>
                <div className="ife">
                  <div className="filter">
                    <div className="iimg">
                      <FilterAltOutlinedIcon color="primary"></FilterAltOutlinedIcon>
                    </div>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <div>
                          <span
                            className="ifliter"
                            {...bindTrigger(popupState)}
                          >
                            {" "}
                            FILTER
                          </span>
                          <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                          >
                            <Typography sx={{ p: 2 }}>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                  <Grid
                                    className="filterdd"
                                    item
                                    xs={12}
                                    md={3}
                                  >
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small">
                                        Customer
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={status}
                                        label="Status"
                                        {...register("status")}
                                        // onChange={handleChange}
                                      >
                                        <MenuItem value="All"></MenuItem>
                                        <MenuItem value="pending">
                                          Pending
                                        </MenuItem>
                                        <MenuItem value="paid">Paid</MenuItem>
                                      </Select>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small">
                                        Date Range
                                      </InputLabel>
                                      <OutlinedInput
                                        fullWidth
                                        id="status"
                                        name="contact"
                                        placeholder="Start Date"
                                        multiline
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small"></InputLabel>
                                      .
                                      <OutlinedInput
                                        fullWidth
                                        id="status"
                                        name="contact"
                                        placeholder="End Date"
                                        multiline
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small">
                                        Total
                                      </InputLabel>
                                      <OutlinedInput
                                        fullWidth
                                        id="status"
                                        name="contact"
                                        placeholder="Total"
                                        multiline
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={2}>
                                    <Stack spacing={1}>
                                      <InputLabel htmlFor="type">
                                        Balance
                                      </InputLabel>
                                      <OutlinedInput
                                        fullWidth
                                        id="type"
                                        type="type"
                                        name="email"
                                        placeholder="Balance"
                                        multiline
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <InputLabel htmlFor="status">
                                        Date Type
                                      </InputLabel>
                                      <OutlinedInput
                                        fullWidth
                                        id="status"
                                        name="contact"
                                        placeholder="EndDate..."
                                        multiline
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <InputLabel htmlFor="status">
                                        Sort
                                      </InputLabel>
                                      <OutlinedInput
                                        fullWidth
                                        id="status"
                                        name="contact"
                                        placeholder="Chasing..."
                                        multiline
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small">
                                        Status
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={status}
                                        label="Status"
                                        {...register("status")}
                                        // onChange={handleChange}
                                      >
                                        <MenuItem value="All"></MenuItem>
                                        <MenuItem value="pending">
                                          Pending
                                        </MenuItem>
                                        <MenuItem value="paid">Paid</MenuItem>
                                      </Select>
                                    </Stack>
                                  </Grid>
                                  <br></br>
                                  &nbsp;
                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <Button
                                        onClick={popupState.close}
                                        variant="contained"
                                        type="submit"
                                      >
                                        Apply Filter
                                      </Button>
                                    </Stack>
                                  </Grid>
                                </Grid>
                              </form>
                            </Typography>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                  </div>

                  <div className="export">
                    <span className="iexport"> EXPORT</span>
                    <div className="iemg">
                      <ExpandMoreIcon color="primary"></ExpandMoreIcon>
                    </div>
                  </div>
                  <div className="outLine">
                    <OutlinedInput
                      id="name"
                      type="text"
                      name="name"
                      // defaultValue={user?.firstname}
                      // value={user.firstname}
                      placeholder="Search"
                      multiline
                    />
                  </div>
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
                            <TableCell>INVOICE</TableCell>
                            <TableCell>CUSTOMER</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>EXPECTED PAYMENT DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>BALANCE</TableCell>
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user &&
                            user.map((item: any) => (
                              <TableRow hover tabIndex={-1} role="checkbox">
                                <TableCell padding="checkbox">
                                  <Checkbox />
                                </TableCell>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  padding="none"
                                >
                                  <TableCell align="left">{item.id}</TableCell>
                                </TableCell>
                                <TableCell align="left">
                                  {item.firstName} &nbsp; {item.lastName}
                                </TableCell>
                                <TableCell align="left">
                                  {/* {item.generate_date_time.slice(0, 10)} */}
                                  {moment(
                                    item.generate_date_time,
                                    "DD/MM/YYYY"
                                  ).format("ll")}
                                </TableCell>
                                <TableCell className="active" align="left">
                                  {moment(
                                    item.invoice_pay_date_time,
                                    "DD/MM/YYYY"
                                  ).format("ll")}
                                </TableCell>

                                <TableCell align="left">
                                  $ {item.amount}
                                </TableCell>
                                <TableCell align="left">000111</TableCell>

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
                                    onClick={() => handleOpen(item.id)}
                                    size="small"
                                  >
                                    <RiDeleteBin5Fill />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
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
                      onClick={handledelete}
                      variant="text"
                    >
                      ok
                    </Button>
                    <Button
                      onClick={handleCancel}
                      className="ok"
                      variant="text"
                    >
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
