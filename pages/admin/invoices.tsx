import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  TableContainer,
  TableHead,
  Button,
  Box,
  Pagination,
  styled,
  OutlinedInput,
  Typography,
  makeStyles,
} from "@mui/material";
import { BsTelegram } from "react-icons/bs";
import { Grid, InputLabel, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BiShow } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import MiniDrawer from "../sidebar";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { api_url, base_url } from "../api/hello";
import moment from "moment";
import Image from "next/image";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { jsPDF } from "jspdf";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  setSyntheticLeadingComments,
  setTokenSourceMapRange,
} from "typescript";
import Paper from "@mui/material/Paper";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export interface FormValues {
  status: Number;
  res: String;
  startDate: String;
  endDate: String;
  Total: String;
  sort: String;
  customer: String;
  sdata: String;
  option: String;
  firstName: String;
  recievedPay: any;
}
function usePagination(data: any, itemsPerPage: any) {
  console.log(data, "dataaaaaaaaaaaaaaaaaaaaaaaaaaa", itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  function currentData() {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page: any) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage };
}
export default function Guardians() {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [token, setToken] = useState([]);
  const [user, setUser] = useState<FormValues | any>([]);
  const [open, setOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const [share, setShare] = useState(false);
  const [invoiceId, setInvoiceId] = useState();
  const [sdata, setUserId] = useState<FormValues | any>([]);
  const [id, setId] = useState();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<any>("");
  const [dollerOpen, setDollerOpen] = useState(false);
  const [recievedPay, setRecieved] = useState<FormValues | any>([]);
  let [page, setPage] = useState(1);
  const [searchdata, setsearchdata] = useState([]);
  const [row_per_page, set_row_per_page] = useState(5);
  const [searchquery, setsearchquery] = useState("");
  const PER_PAGE = 5;
  const count = Math.ceil(user.length / PER_PAGE);
  const DATA = usePagination(user, PER_PAGE);
  const handlePageChange = (e: any, p: any) => {
    setPage(p);
    DATA.jump(p);
  };

  const handleClickOpen = (item: any) => {
    console.log(item);
    setRecieved(item);
    setDollerOpen(true);
  };
  const handleCloses = () => {
    setDollerOpen(false);
  };
  // const [open, setOpen] = useState(false);
  const closePopper = () => setOpen(false);

  const handleOpen = (id: any) => {
    setPop(true);
    setId(id);
    // handledelete(id);
  };
  const handleClose = () => setPop(false);
  const handleEmailClose = () => setShare(false);
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
      url: `${api_url}/getInvoice`,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res, "ressssss");
        setUser(res?.data.data);
        setsearchdata(res?.data.data);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    let sdate = moment(data.startDate).format("DD/MM/YYYY");
    let edate = moment(data.endDate).format("DD/MM/YYYY");
    var ids: any = [];

    if (sdata.length > 0) {
      for (let item of sdata) {
        ids.push(item?.id);
      }
    }
    let reqData = {
      status: data.status,
      startDate: sdate === "Invalid date" ? "" : sdate,
      endDate: edate === "Invalid date" ? "" : edate,
      order: data.sort,
      amount: data.Total,
      customer: ids,
    };

    console.log(sdata, "sdate");
    console.log(reqData, "requestedData");

    await axios({
      method: "POST",
      url: `${api_url}/getInvoice`,
      data: reqData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res, "ressssss");
        setUser(res?.data.data);
        reset();
        setUserId("");
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
  const handleCreate = async (id: any) => {
    console.log(id, "idddddd");
    await axios({
      method: "PUT",
      url: `${api_url}/updateInvoice/${id}`,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        getUser();
        handleCloses();
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const searchItems = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      setUser(searchdata);
    } else {
      const filterres = user.filter((item: any) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      const dtd = filterres;
      setUser(dtd);
    }
  };
  const handleShare = async (item: any) => {
    console.log(item.id, "itemmmm");
    setInvoiceId(item?.id);
    setShare(true);
  };
  const handledelete = async () => {
    let reqData = {
      userId: "2",
    };
    await axios({
      method: "DELETE",
      url: `${api_url}/deleteInvoice/${id}`,
      data: reqData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        getUser();
        handleClose();
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const handleSend = async () => {
    await axios({
      method: "GET",
      url: `${api_url}/sendInvoiceEmail/${invoiceId}`,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        setShare(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
    console.log("email send");
  };

  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  const pending = user.filter((a: any) => a.status == "pending");
  const paid = user.filter((a: any) => a.status == "paid");
  const draft = user.filter((a: any) => a.status == "draft");

  console.log(sdata, "sdata");
  const handleFilter = () => {
    getUser();
    console.log(user, "click filter");
  };

  console.log(recievedPay, "recievedPay");
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
                <Link href="/admin/addinvoice">
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
                  <span className="fields">All({user.length})</span>
                  <span className="field">Paid({paid.length})</span>
                  <span className="field">Un Paid({pending.length})</span>
                  <span className="field">Draft({draft.length})</span>
                  {/* <span className="field">Paid(0)</span> */}
                </div>
                <div className="ife">
                  <div className="filter">
                    <div className="iimg">
                      <FilterAltOutlinedIcon color="primary"></FilterAltOutlinedIcon>
                    </div>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState: any) => (
                        <div className="dd" onClick={() => handleFilter()}>
                          <span
                            className="ifliter"
                            {...bindTrigger(popupState)}
                          >
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
                                    <Stack spacing={1} sx={{ width: 300 }}>
                                      <InputLabel id="demo-select-small">
                                        Customer
                                      </InputLabel>

                                      <Autocomplete
                                        onChange={(event, value) =>
                                          setUserId(value)
                                        }
                                        open={open}
                                        onOpen={() => {
                                          if (inputValue && inputValue.length) {
                                            return setOpen(true);
                                          }
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(e, value, reason) => {
                                          setInputValue(value);

                                          if (!value) {
                                            setOpen(false);
                                          }
                                        }}
                                        multiple
                                        id="free-solo-demo"
                                        freeSolo
                                        options={user}
                                        getOptionLabel={(option: any) =>
                                          option?.name
                                        }
                                        renderInput={(params: any) => (
                                          <TextField
                                            {...params}
                                            placeholder="customer"
                                          />
                                        )}
                                      />
                                    </Stack>
                                  </Grid>

                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small">
                                        Date Range
                                      </InputLabel>
                                      <TextField
                                        InputLabelProps={{
                                          shrink: true,
                                          required: true,
                                        }}
                                        type="date"
                                        {...register("startDate")}

                                        // defaultValue={values.someDate}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <InputLabel id="demo-select-small"></InputLabel>
                                      .
                                      <TextField
                                        InputLabelProps={{
                                          shrink: true,
                                          required: true,
                                        }}
                                        type="date"
                                        {...register("endDate")}

                                        // defaultValue={values.someDate}
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
                                        id="Total"
                                        placeholder="Total"
                                        multiline
                                        {...register("Total")}
                                      />
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={12} md={3}>
                                    <Stack spacing={1}>
                                      <InputLabel htmlFor="status">
                                        Sort
                                      </InputLabel>
                                      <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        // value={status}
                                        label="Status"
                                        {...register("sort")}
                                        // onChange={handleChange}
                                      >
                                        <MenuItem value="All"></MenuItem>
                                        <MenuItem value="ASC">
                                          Date ASC
                                        </MenuItem>
                                        <MenuItem value="DESC">
                                          Date DESC
                                        </MenuItem>
                                      </Select>
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
                                        // value={status}
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
                                </Grid>
                                &nbsp; &nbsp; &nbsp;
                                <Grid container spacing={3}>
                                  <Grid item xs={3} md={3}>
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
                  &nbsp;
                  <div className="export">
                    <span className="iexport"> Import</span>
                    <div className="iemg">
                      <ExpandMoreIcon color="primary"></ExpandMoreIcon>
                    </div>
                  </div>
                  <div className="outLine">
                    <OutlinedInput
                      onChange={(e) => searchItems(e)}
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
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {DATA.currentData() &&
                            DATA.currentData().map((item: any) => (
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
                                <TableCell align="left">{item.name}</TableCell>
                                <TableCell align="left">
                                  {/* {item.generate_date_time.slice(0, 10)} */}
                                  {moment(
                                    item.createdDate,
                                    "DD/MM/YYYY"
                                  ).format("ll")}
                                </TableCell>
                                <TableCell align="left">
                                  {moment(
                                    item.invoiceDate,
                                    "DD/MM/YYYY"
                                  ).format("ll")}
                                </TableCell>

                                <TableCell align="left">
                                  $ {item.amount}
                                </TableCell>

                                <TableCell align="left">
                                  <div className="btn">
                                    <div className="idiv">
                                      <Image
                                        src="/download.svg"
                                        alt="Picture of the author"
                                        width={25}
                                        height={25}
                                      />
                                    </div>
                                    {/* <Button variant="contained" size="small">
                                      <BiShow />
                                    </Button> */}
                                    <div className="idiv">
                                      <Image
                                        onClick={() => handleShare(item)}
                                        src="/share.svg"
                                        alt="Picture of the author"
                                        width={25}
                                        height={25}
                                      />
                                    </div>
                                    {/* <Button variant="outlined" size="small">
                                      <FiEdit />
                                    </Button> */}
                                    <div className="idiv">
                                      <Image
                                        onClick={() => handleClickOpen(item)}
                                        src="/doller.svg"
                                        alt="Picture of the author"
                                        width={25}
                                        height={25}
                                      />
                                    </div>
                                    <div className="idiv">
                                      <Image
                                        onClick={() => handleOpen(item.id)}
                                        src="/deleteicon.svg"
                                        alt="Picture of the author"
                                        width={25}
                                        height={25}
                                      />
                                    </div>
                                  </div>

                                  {/* <Button
                                    variant="outlined"
                                    onClick={() => handleOpen(item.id)}
                                    size="small"
                                  >
                                    <RiDeleteBin5Fill />
                                  </Button> */}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <Stack
                        style={{
                          marginBottom: "10px",
                          marginRight: "49px",
                          marginTop: "10px",
                        }}
                        direction="row"
                        alignItems="right"
                        justifyContent="space-between"
                      >
                        <Pagination
                          count={count}
                          page={page}
                          color="primary"
                          onChange={handlePageChange}
                        />
                        <FormControl>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={5}
                            onChange={handlerowchange}
                            size="small"
                          >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </TableContainer>
                  </Card>
                </Container>
              </div>
            </div>
            <Modal
              open={share}
              onClose={handleEmailClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="ISBOX">
                <div className="Isend">
                  <div>
                    <h3 className="ehead">Send Document</h3>
                  </div>
                  <div className="Isend">
                    <h3 className="eshead">
                      How would you like to deliver this document to the
                      customer?
                    </h3>
                  </div>
                </div>
                <div className="sendEmailBox">
                  <div>
                    <Box>
                      <BsTelegram
                        onClick={handleSend}
                        className="telegram"
                      ></BsTelegram>
                    </Box>
                  </div>
                  <div>
                    <h3>Email</h3>
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal
              open={pop}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Customer
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure want to delete customer from the records.
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
            <div>
              <BootstrapDialog
                onClose={handleCloses}
                aria-labelledby="customized-dialog-title"
                open={dollerOpen}
              >
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleCloses}
                >
                  Recieve Payment
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Grid>
                    <Stack>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">
                              Customer <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              defaultValue={recievedPay.firstName}
                              type="text"
                              id="name"
                              placeholder="Customer Name..."
                              fullWidth
                              size="small"
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                    <Stack style={{ marginTop: "8px" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">
                              Received On <span className="err_str">*</span>
                            </InputLabel>
                            <OutlinedInput
                              defaultValue={moment(
                                recievedPay.invoiceDate,
                                "DD/MM/YYYY"
                              ).format("ll")}
                              type="text"
                              id="name"
                              placeholder="Phone..."
                              fullWidth
                              size="small"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">Method</InputLabel>
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              defaultValue="Cash"
                              size="small"
                            >
                              <MenuItem value="All"></MenuItem>
                              <MenuItem value="Credit Card">
                                Credit Card
                              </MenuItem>
                              <MenuItem value="Debit Card">Debit Card</MenuItem>
                              <MenuItem value="AMFX">AMFX</MenuItem>
                              <MenuItem value="Cash">Cash on Delivery</MenuItem>
                            </Select>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                    <Stack style={{ marginTop: "15px" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">Reerence</InputLabel>
                            <OutlinedInput
                              type="text"
                              id="name"
                              placeholder="Alternate Email..."
                              fullWidth
                              size="small"
                            />
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">Amount</InputLabel>
                            <OutlinedInput
                              defaultValue={recievedPay.amount}
                              type="text"
                              id="name"
                              placeholder="Alternate Email..."
                              fullWidth
                              size="small"
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Want to use credit balance $100"
                      />
                    </FormGroup>
                    <div>
                      <h5 className="apply">Apply Payment</h5>
                    </div>
                    <div className="iadiv">
                      <div className="hh">Invoice Amount:</div>
                      <div>${recievedPay.amount}</div>
                    </div>
                    <div className="iadiv">
                      <div className="hh">Total Credit Balance:</div>
                      <div>$100.00</div>
                    </div>
                    &nbsp;
                  </Grid>
                  <div className="iadiv">
                    <div className="hh">Total Amount:</div>
                    <div>$1024.00</div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    autoFocus
                    onClick={() => handleCreate(recievedPay.id)}
                  >
                    Create
                  </Button>
                </DialogActions>
              </BootstrapDialog>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
