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
  Menu,
  Button,
  Breadcrumbs,
  Box,
  Pagination,
  styled,
  OutlinedInput,
  Typography,
  makeStyles,
} from "@mui/material";
import { BiFilterAlt } from "react-icons/bi";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
import PopupState, {
  bindTrigger,
  bindMenu,
  bindPopover,
} from "material-ui-popup-state";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  setSyntheticLeadingComments,
  setTokenSourceMapRange,
} from "typescript";
import Paper from "@mui/material/Paper";
import { number } from "yup/lib/locale";
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
  name: String;
  description: String;
  price: String;
}
function usePagination(data: any, itemsPerPage: any) {
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
  const [sort, setSort] = useState<FormValues | any>([]);
  const [status, setStatus] = useState<FormValues | any>([]);

  const [note, setNote] = useState<FormValues | any>([]);

  const [Invoicedata, setInvoice] = useState<FormValues | any>([]);

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
    console.log(item, "itemmmmm");
    if (item.status == "paid") {
      setDollerOpen(false);
      toast.success("Already Paid!");
    } else {
      setRecieved(item);
      setDollerOpen(true);
    }
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
        setUser(res?.data.data);
        setInvoice(res?.data.data);

        setsearchdata(res?.data.data);
      })
      .catch((err) => {});
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
        ids.push(item?.customerId);
      }
    }
    let reqData = {
      status: status,
      startDate: sdate === "Invalid date" ? "" : sdate,
      endDate: edate === "Invalid date" ? "" : edate,
      order: sort,
      amount: data.Total,
      customer: ids,
    };

    await axios({
      method: "POST",
      url: `${api_url}/getInvoice`,
      data: reqData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        setUser(res?.data.data);
        // reset();
        setUserId("");
      })
      .catch((err) => {});
  };

  const generateSimplePDF = async (item: any) => {
    let requested = {
      id: item.itemId,
    };
    await axios({
      method: "POST",
      url: `${api_url}/getItembyid`,
      data: requested,

      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        // setItem(res?.data.data);
        let items = res?.data.data;
        if (res) {
          setTimeout(() => {
            var price = 0;
            for (let d of items) {
              price = price + d.price;
            }
            const doc = new jsPDF("l", "mm", "a4");
            doc.setFontSize(20);

            doc.text("Qatar International School", 40, 20);
            doc.setFontSize(10);
            doc.text("Qatar International School", 40, 25);
            doc.setFontSize(10);
            doc.text("United Nations St, West Bay, P.O. Box: 5697", 40, 30);
            doc.text("Doha, Qatar", 40, 35);
            doc.text("Telephone: 44833456", 240, 20);
            doc.text("Website:  www.qis.org", 240, 28);
            doc.text("Email:  qisfinance@qis.org", 237, 35);

            doc.setFont("courier");

            doc.setFontSize(40);

            doc.text("INVOICE", 120, 60);

            doc.setFontSize(20);

            doc.text("family ID", 30, 90);
            doc.text(`12`, 100, 90);

            doc.text("Account Number", 30, 100);
            doc.text("123", 100, 100);

            doc.text("Invoice No", 200, 90);
            doc.text(`${item.invoiceId}`, 250, 90);

            doc.text("Date", 200, 100);
            doc.text(`${item.invoiceDate}`, 250, 100);

            const head = [["ITEM", "AMOUNT"]];
            var data: any = [];
            // push each tickcet's info into a row
            // items.map((it: any) => data.push(Object.values(it)));
            {
              items && items.length > 1
                ? items.map((ticket: any) => {
                    let ticketData = [
                      ticket.name,
                      ticket.price,

                      // called date-fns to format the date on the ticket
                    ];
                    // push each tickcet's info into a row
                    data.push(ticketData);
                  })
                : data.push([
                    items && items[0]?.name,
                    items && items[0]?.price,
                  ]);
              // push each tickcet's info into a row
            }
            doc.setFontSize(20);

            autoTable(doc, {
              theme: "plain",
              margin: { top: 120, left: 50 },
              tableWidth: 500,
              styles: { fontSize: 15 },
              columnStyles: { 0: { halign: "left" } },
              head: head,
              body: data,

              didDrawCell: (data: any) => {},
            });
            if (items.length > 2) {
              doc.setFontSize(20);
              doc.text("Grand Total", 195, 163);
              doc.setFontSize(15);

              doc.text(`${price}`, 258, 163);
            } else {
              doc.setFontSize(20);
              doc.text("Grand Total", 190, 155);
              doc.setFontSize(15);

              doc.text(`${price}`, 240, 155);
            }

            doc.save("Document.pdf");
          }, 2000);
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleCancel = () => {
    handleClose();
  };
  const handleCreate = async (id: any) => {
    let requestedData = {
      note: note ? note : null,
    };
    console.log(requestedData, "requestedData");
    await axios({
      method: "PUT",
      url: `${api_url}/updateInvoice/${id}`,
      data: requestedData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        getUser();
        setNote("");
        toast.success("Payment Successfully !");

        setTimeout(() => {
          handleCloses();
        }, 1000);
      })
      .catch((err) => {});
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

    console.log(user == "", "dtddddd");
  };
  const handleShare = async (item: any) => {
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
        toast.success("Deleted Successfully !");

        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((err) => {});
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
        toast.success("Send Invoice Mail Successfully !");

        setShare(false);
      })
      .catch((err) => {});
  };

  function handlerowchange(e: any) {
    set_row_per_page(e.target.value);
  }
  const pending = Invoicedata.filter((a: any) => a.status == "pending");
  const paid = Invoicedata.filter((a: any) => a.status == "paid");
  const draft = Invoicedata.filter((a: any) => a.status == "draft");

  const handleFilter = () => {
    // getUser();
  };
  const handleAll = () => {
    getUser();
  };
  const handlePaid = () => {
    const paids = Invoicedata.filter((a: any) => a.status == "paid");

    setUser(paids);
  };
  const handlePending = () => {
    const pendings = Invoicedata.filter((a: any) => a.status == "pending");

    setUser(pendings);
  };
  const handleDraft = () => {
    const drafts = Invoicedata.filter((a: any) => a.status == "draft");

    setUser(drafts);
  };

  console.log(inputValue, "inputValue");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="guardianBar">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              style={{ padding: "8px", marginBottom: "15px" }}
            >
              <Stack>
                <Stack spacing={3}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link
                      key="1"
                      color="inherit"
                      href="/"
                      style={{ color: "#1A70C5", textDecoration: "none" }}
                    >
                      Home
                    </Link>
                    <Link
                      key="2"
                      color="inherit"
                      href="/"
                      style={{ color: "#7D86A5", textDecoration: "none" }}
                    >
                      Invoices
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  INVOICES
                </Typography>
              </Stack>
              <Link href="/admin/addinvoice">
                <Button
                  className="button-new"
                  variant="contained"
                  size="small"
                  sx={{ width: 150 }}
                  // onClick={handleNewCustomerOpen}
                >
                  New Invoice
                </Button>
              </Link>
            </Stack>
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <TableContainer>
                <Stack
                  style={{ marginBottom: "10px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    className="filter-list"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Item
                      onClick={handleAll}
                      style={{ cursor: "pointer" }}
                      className="filter-active"
                    >
                      ALL ({Invoicedata.length})
                    </Item>
                    <Item style={{ cursor: "pointer" }} onClick={handlePaid}>
                      Paid ({paid.length}){" "}
                    </Item>
                    <Item style={{ cursor: "pointer" }} onClick={handlePending}>
                      Un Paid ({pending.length}){" "}
                    </Item>
                    <Item style={{ cursor: "pointer" }} onClick={handleDraft}>
                      Draft ({draft.length}){" "}
                    </Item>
                  </Box>

                  <Stack
                    direction="row"
                    alignItems="center"
                    className="fimport-export-box"
                  >
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState: any) => (
                        <Box>
                          <MenuItem {...bindTrigger(popupState)}>
                            <div onClick={() => handleFilter()}>
                              <span>
                                <BiFilterAlt />
                              </span>
                              &nbsp; Filter
                            </div>
                          </MenuItem>
                          <Menu {...bindMenu(popupState)}>
                            <Container>
                              <Grid style={{ width: "1030px" }}>
                                <Typography variant="h5">
                                  <b>Filter</b>
                                </Typography>
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
                                          onChange={(event: any, value: any) =>
                                            setUserId(value)
                                          }
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
                                          options={Invoicedata}
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
                                          onChange={(e) =>
                                            setSort(e.target.value)
                                          }
                                          value={sort}
                                          labelId="demo-select-small"
                                          id="demo-select-small"
                                          label="Status"
                                          // {...register("sort")}
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
                                          onChange={(e) =>
                                            setStatus(e.target.value)
                                          }
                                          labelId="demo-select-small"
                                          id="demo-select-small"
                                          value={status}
                                          label="Status"
                                          // {...register("status")}
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
                              </Grid>
                            </Container>
                          </Menu>
                        </Box>
                      )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem {...bindTrigger(popupState)}>
                            Export
                            <KeyboardArrowDownIcon />
                          </MenuItem>
                          {/* <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              Logout
                            </MenuItem>
                          </Menu> */}
                        </Box>
                      )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <Box>
                          <MenuItem
                            {...bindTrigger(popupState)}
                            style={{ border: "none," }}
                          >
                            Import
                            <KeyboardArrowDownIcon />
                          </MenuItem>
                          {/* <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              My account
                            </MenuItem>
                            <MenuItem onClick={popupState.close}>
                              Logout
                            </MenuItem>
                          </Menu> */}
                        </Box>
                      )}
                    </PopupState>
                    <FormControl>
                      <OutlinedInput
                        onChange={(e) => searchItems(e)}
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Search"
                        multiline
                      />
                    </FormControl>
                  </Stack>
                </Stack>
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
                    {DATA.currentData() && DATA.currentData() ? (
                      DATA.currentData().map((item: any) => (
                        <TableRow hover tabIndex={-1} role="checkbox">
                          <TableCell padding="checkbox">
                            <Checkbox />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <TableCell align="left">{item.invoiceId}</TableCell>
                          </TableCell>
                          <TableCell align="left">{item.name}</TableCell>
                          <TableCell align="left">
                            {moment(item.createdDate, "DD/MM/YYYY").format(
                              "ll"
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {moment(item.invoiceDate, "DD/MM/YYYY").format(
                              "ll"
                            )}
                          </TableCell>

                          <TableCell align="left">$ {item.amount}</TableCell>

                          <TableCell align="left">
                            <div className="btn">
                              <div className="idiv">
                                <Image
                                  onClick={() => generateSimplePDF(item)}
                                  src="/download.svg"
                                  alt="Picture of the author"
                                  width={25}
                                  height={25}
                                />
                              </div>

                              <div className="idiv">
                                <Image
                                  onClick={() => handleShare(item)}
                                  src="/share.svg"
                                  alt="Picture of the author"
                                  width={25}
                                  height={25}
                                />
                              </div>

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
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <h3>No Record found</h3>
                    )}
                  </TableBody>
                </Table>
                {user == "" ? <h3>No Record found</h3> : ""}
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
                  Delete Invoice
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure want to delete Invoice from the records.
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
                              defaultValue={recievedPay.name}
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
                              onChange={(e) => setNote(e.target.value)}
                              type="text"
                              id="name"
                              placeholder="Enter note"
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
                    <div>${recievedPay.amount}</div>
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
            <ToastContainer />
          </div>
        </Box>
      </Box>
    </>
  );
}
