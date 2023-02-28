import { Breadcrumbs, Card, TableHead, styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { InputLabel, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import MiniDrawer from "../../sidebar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { api_url, auth_token, base_url } from "../../api/hello";
import moment from "moment";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Button, OutlinedInput } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddCustomer from "../../customer/addNewCustomer";
import AddItem from "../additem";
import Link from "next/link";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainFooter from "../../commoncmp/mainfooter";
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
  name: String;
  price: String;
  description: any;
  customerName: string;
  date: string;
  Customername: string;
}
type Order = "asc" | "desc";


export default function Guardians() {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [opens, setOpens] = useState(false);
  const [userID, setUserId] = useState<FormValues | any>([]);
  const [sdates, setDates] = useState<FormValues | any>([]);
  const [Invoicedates, setInvoiceDate] = useState(null);
  const [value, setValue] = useState<any>({ id: null, title: null });
  const [user, setUser] = useState<FormValues | any>([]);
  const [dollerOpen, setDollerOpen] = useState(false);
  const [popup, setSecondPop] = useState(false);
  const [inputValue, setInputValue] = useState<FormValues | any>([]);
  const [id, setId] = useState<FormValues | any>([]);
  const [error, setError] = useState<FormValues | any>([]);
  const [invoiceno, setInvoiceNo] = useState();
  const [invoice, setInvoice] = useState<FormValues | any>([]);
  const [item, setItem] = useState<FormValues | any>([]);
  const [product, setProduct] = useState<FormValues | any>([]);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const { invoiceId } = router.query;

  setSecondPop;
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const arr = [];

    arr.push(id);
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    getItem();
  };

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const BootstrapButton = styled(Button)({
    backgroundColor: "#1A70C5",
    color: "#FFFFFF",
    margin: "7px",
    "&:hover": {
      backgroundColor: "#1A70C5",
    },
  });

  const handleCloses = () => {
    setDollerOpen(false);
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
  const onclose = () => {
    setSecondPop(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    var itemId: any[] = [];
    const dates = new Date();
    var invoiceDatesss = "";
    if (Invoicedates) {
      invoiceDatesss = moment(Invoicedates).format("DD/MM/YYYY");
    } else {
      invoiceDatesss = invoice[0]?.invoiceDate;
    }

    for (let row of product) {
      itemId.push(row.id);
    }
    const createdDate = moment(dates).format("DD/MM/YYYY");
    const requestedData = {
      itemId: itemId,
      amount: price,
      status: "pending",
      createdDate: invoice[0]?.createdDate,
      createdBy: "1",
      invoiceDate: invoiceDatesss,
      customerId: userID.id ? userID.id : invoice[0]?.customerId,
      invoiceNo: invoiceno ? invoiceno : invoice[0]?.invoiceId,
      updatedAt: createdDate,
      updatedBy: "1",
    };
    await axios({
      method: "POST",
      url: `${api_url}/editInvoice/${invoiceId}`,
      data: requestedData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success("Invoice updated Successfully !");
        setTimeout(() => {
          router.push("/admin/invoices");
        }, 1000);
      })
      .catch((err) => {
        if (err) {
          setError(err?.response?.data?.message);
        }
        // console.log(err.response.data.message, "error");
      });
    // console.log(requestedData, "requestedData");
  };
  const getItem = async () => {
    await axios({
      method: "GET",
      url: `${api_url}/getItems`,

      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        setItem(res?.data.data);
      })
      .catch((err) => { });
  };

  var option: { id: number; title: string }[] = [];
  user &&
    user.map((data: any, key: any) => {
      return option.push({
        id: data.id,
        title: data.name,
      });
    });
  useEffect(() => {
    let cusId = localStorage.getItem("customerId");
    invoiceDataById();
    // if (cusId) {
    //   setOpens(false);
    // }

    getItems();
    getUser();
    getItem();
  }, []);

  const searchItems = (e: any) => {
    if (e.target.value === "") {
      // setUsers(searchdata);
      getItem();
    } else {
      const filterres = item.filter((item: any) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      const dtd = filterres;
      setItem(dtd);
    }
  };
  const handleItem = () => {
    setDollerOpen(true);
  };
  const getItems = async () => {
    invoiceDataById();
  };

  const handleCreate = async () => {
    let requested = {
      id: selected,
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
        setProduct(res?.data.data);
        handleCloses();
      })
      .catch((err) => { });
  };
  var price = 0;
  for (let d of product) {
    price = price + d.price;
  }
  const handleNew = () => {
    setSecondPop(true);
  };

  const getUser = async () => {
    await axios({
      method: "POST",
      url: `${api_url}/getuser`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        setUser(res?.data.data);
      })
      .catch((err) => { });
  };

  const handleClickOpen = () => {
    setOpens(true);
  };
  const handleClose = (data: any) => {
    if (data === false) {
      getUser();
      setOpens(false);
      let gg = user.filter((a: any) => a.id === 47);
    } else {
      setId(data);
      getUser();
      setTimeout(() => {
        setOpens(false);
      }, 3000);
    }
  };
  let gg = user.filter((a: any) => a.id === id);

  const handlePopup = (stats: any) => {
    if (stats === false) {
      getItem();
      setSecondPop(false);
    } else {
      getItem();
      setSecondPop(false);
    }
  };

  const invoiceDataById = async () => {
    await axios({
      method: "POST",
      url: `${api_url}/getInvoice/${invoiceId}`,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((res) => {
        setInvoice(res?.data.data);
        setValue({
          id: res?.data.data[0].id,
          title: res?.data.data[0].name,
        });
        if (res) {
          let requested = {
            id: res?.data.data[0]?.itemId,
          };
          axios({
            method: "POST",
            url: `${api_url}/getItembyid`,
            data: requested,

            headers: {
              "content-type": "multipart/form-data",
            },
          })
            .then((res) => {
              setProduct(res?.data.data);
            })
            .catch((err) => { });
        }
        setUser(res?.data.data);
        setInvoiceNo(res?.data?.invoiceNo);
      })
      .catch((err) => { });
  };

  const handleDraft = async () => {
    var itemId: any[] = [];
    const dates = new Date();
    var invoiceDatesss = "";
    if (Invoicedates) {
      invoiceDatesss = moment(Invoicedates).format("DD/MM/YYYY");
    } else {
      invoiceDatesss = invoice[0]?.invoiceDate;
    }

    for (let row of product) {
      itemId.push(row.id);
    }
    const createdDate = moment(dates).format("DD/MM/YYYY");
    const requestedData = {
      itemId: itemId,
      amount: price,
      status: "draft",
      createdDate: invoice[0]?.createdDate,
      createdBy: 1,
      invoiceDate: invoiceDatesss,
      customerId: userID.id ? userID.id : invoice[0]?.customerId,
      invoiceNo: invoiceno ? invoiceno : invoice[0]?.invoiceId,
      updatedAt: createdDate,
      updatedBy: 1,
    };
    console.log(requestedData, "requestedData");
    await axios({
      method: "POST",
      url: `${api_url}/editInvoice/${invoiceId}`,
      data: requestedData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success("Invoice updated Successfully !");
        setTimeout(() => {
          router.push("/admin/invoices");
        }, 1000);
      })
      .catch((err) => {
        if (err) {
          setError(err?.response?.data?.message);
        }
        // console.log(err.response.data.message, "error");
      });
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="guardianBar">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        Edit Invoices
                      </Link>
                    </Breadcrumbs>
                  </Stack>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ fontWeight: "bold", color: "#333333" }}
                  >
                    EDIT INVOICES
                  </Typography>
                </Stack>
                <div className="cinvoice">
                  <div>
                    <BootstrapButton
                      onClick={handleDraft}
                      type="button"
                      className="grey-button"
                    >
                      Save as Draft
                    </BootstrapButton>

                    <BootstrapButton type="submit">
                      Save & issue
                    </BootstrapButton>
                  </div>
                </div>
              </Stack>
              <div className="midBar">
                <div className="guardianList" style={{ padding: "50px" }}>
                  <div className="required" style={{ textAlign: "right" }}>
                    {/* <Typography style={style}>
                      {errors.date ? (
                        <span>Invoice Date Feild is Required **</span>
                      ) : error != "" ? (
                        <span></span>
                      ) : (
                        ""
                      )}
                    </Typography> */}
                  </div>
                  <div className="aititle">
                    <div className="iatitle flex">
                      <div className="invoive-img">
                        {" "}
                        <Image
                          className="iaimg"
                          src="/favicon.ico"
                          alt="Picture of the author"
                          width={65}
                          height={62}
                        />
                      </div>
                      <div className="invoice-name-detail">
                        <span className="iahead">
                          Qatar International School
                        </span>
                        <span className="line">
                          Qatar international school W.L.L
                        </span>
                        <span className="line">
                          United Nations St, West Bay, P.O. Box: 5697
                        </span>
                        <span className="line">Doha, Qatar</span>
                      </div>
                    </div>
                    <div className="itele">
                      <span className="Tline">Telephone: 443434343</span>
                      <span className="Tline">Website: www.qis.org</span>
                      <span className="Tline">Email: qisfinance@qis.org</span>
                    </div>
                  </div>
                  <div className="icenter">
                    <div className="invoice">
                      <span className="iainvoice">Invoice</span>
                    </div>
                  </div>
                  <div className="ickks">
                    <div className="ickk">
                      <InputLabel htmlFor="name">
                        Customer <span className="err_str">*</span>
                        <div
                          className="required"
                          style={{ textAlign: "right" }}
                        ></div>
                      </InputLabel>
                      <Autocomplete
                        style={{ width: 300 }}
                        fullWidth
                        inputValue={inputValue}
                        // onChange={(event, value) => setUserId(value)}
                        //onChange={(event, value) => handleChange(value)}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
                        // }}
                        // defaultValue={{
                        //   name: `${gg[0]?.name}`,
                        // }}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        options={user}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Find or create a customer"
                          />
                        )}
                        noOptionsText={
                          <Button onClick={handleClickOpen}>
                            {inputValue === "" ? (
                              "Please enter 1 or more character"
                            ) : (
                              <span>
                                Add &nbsp;<b>{inputValue}</b>&nbsp;as a customer
                              </span>
                            )}
                          </Button>
                        }
                      // {...register("Customername", {
                      //   onChange: (event) => {
                      //     setUserId(event);
                      //   },
                      //   required: true,
                      // })}
                      />
                      <Typography style={style}>
                        <span>
                          {error === "customer field is required" ? error : ""}{" "}
                        </span>
                      </Typography>
                    </div>
                    <div className="invoicedateField">
                      &nbsp; &nbsp;
                      <DatePicker
                        className="myDatePicker"
                        selected={Invoicedates}
                        // onChange={(date: any) => setInvoiceDate(date)}
                        //onChange={(date: any) => handleDate(date)}
                        name="Date"
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Date"
                        // filterDate={filterDays}
                        minDate={new Date()}
                      />
                      <Typography style={style}>
                        {/* <span>{Dateerror ? Dateerror : ""} </span> */}
                      </Typography>
                    </div>
                  </div>
                  <div className="invoiceItem">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Rate</TableCell>
                            <TableCell>Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {product.map((row: any) => (
                            <TableRow
                              key={row.name}
                            // sx={{
                            //   "&:last-child td, &:last-child th": { border: 0 },
                            // }}
                            >
                              <TableCell >
                                {row.name}
                              </TableCell>
                              <TableCell>1</TableCell>
                              <TableCell>{row.price}</TableCell>
                              <TableCell>{row.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    &nbsp;&nbsp;
                    <div>
                      <BootstrapButton
                        className="itembtn"
                        onClick={handleItem}
                        type="button"
                      >
                        Add items
                      </BootstrapButton>
                    </div>
                    <Typography style={style}>
                      {/* <span>{itemError ? itemError : ""} </span> */}
                    </Typography>
                  </div>
                  &nbsp;&nbsp;
                  <div className="invoiceSubTotal">
                    <div>
                      <InputLabel id="demo-select-small">Notes:</InputLabel>
                      <OutlinedInput
                        className="invoiceNote"
                        size="medium"
                        type="text"
                        id="name"
                      />
                    </div>
                    <div className="invoiceTotalamount">
                      <div className="sdiv">
                        <div className="sidiv">Subtotal</div>
                        <div>$ &nbsp;{price}.00</div>
                      </div>
                      <div className="sdiv">
                        <div className="total">
                          <div className="sidiv">Total</div>
                          <div>$ &nbsp;{price}</div>
                        </div>

                        <div className="amount">
                          <div className="sidiv">Amount Paid</div>
                          <div>$ &nbsp;0.00</div>
                        </div>
                      </div>
                      <div className="sdiv">
                        <div className="sidiv">Balance Due</div>
                        <div>$ &nbsp;{price}.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    Add Items
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Box sx={{ width: "100%" }}>
                      <div className="hhh">
                        <div className="invoiceInput">
                          <OutlinedInput
                            onChange={(e) => searchItems(e)}
                            type="text"
                            id="name"
                            placeholder="Search"
                            fullWidth
                            size="small"
                          />
                        </div>
                        <div>
                          <Button onClick={handleNew}>New</Button>
                        </div>
                      </div>
                      <Paper sx={{ width: "100%", mb: 2 }}>
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 550 }}
                            aria-labelledby="tableTitle"
                            size="small"
                          >
                            <TableBody>
                              {item &&
                                item.map((row: any) => {
                                  const isItemSelected = isSelected(row.id);
                                  const labelId = `enhanced-table-checkbox-${row.id}`;

                                  return (
                                    <TableRow
                                      hover
                                      onClick={(event) =>
                                        handleClick(event, row.id)
                                      }
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
                                      key={row.name}
                                      selected={isItemSelected}
                                    >
                                      <TableCell padding="checkbox"></TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                      >
                                        <div className="table">
                                          <div>{row.name}</div>
                                          <div>{row.price}</div>
                                        </div>
                                      </TableCell>
                                      {isItemSelected ? (
                                        <span className="selectss">
                                          selected
                                        </span>
                                      ) : (
                                        <span className="plus">+</span>
                                      )}
                                      {/* <TableCell align="right">{row.protein}</TableCell> */}
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        {item == "" ? <h3>No records found</h3> : ""}
                      </Paper>
                      <div>
                        {selected.length > 0 ? (
                          <Typography
                            sx={{ flex: "1 1 100%" }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                          >
                            {selected.length} selected
                          </Typography>
                        ) : (
                          <Typography
                            sx={{ flex: "1 1 100%" }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                          ></Typography>
                        )}
                      </div>
                    </Box>{" "}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      autoFocus
                      onClick={handleCreate}
                    >
                      Create
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </div>
            </form>
            {popup ? <AddItem start={true} closeD={handlePopup} /> : ""}

            {opens ? <AddCustomer open={true} closeDialog={handleClose} /> : ""}
          </div>
          <MainFooter />
        </Box>
      </Box >
    </>
  );
}
