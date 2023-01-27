import { TableHead, styled } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, InputLabel, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Autocomplete from "@mui/material/Autocomplete";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import MiniDrawer from "../sidebar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { api_url, auth_token, base_url } from "../api/hello";
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
import ETable from "../table";
import AddNewCustomer from "../customer/addNewCustomer";
import AddCustomer from "../customer/addNewCustomer";
import AddItem from "./additem";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// const rowsss = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
// ];
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
  name: String;
  price: String;
  description: any;
  customerName: string;
  date: string;
  Customername: string;
}
const rowss = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

interface Data {
  name: string;
  price: number;
}

function createData(
  name: string,

  price: number
): Data {
  return {
    name,

    price,
  };
}

const rows = [
  createData("Cupcake", 305),
  createData("Donut", 452),
  createData("Eclair", 262),
  createData("Frozen yoghurt", 159),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
export default function Guardians() {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>({});
  const [opens, setOpens] = useState(false);
  const [userID, setUserId] = useState<FormValues | any>([]);

  const [user, setUser] = useState<FormValues | any>([]);
  const [dollerOpen, setDollerOpen] = useState(false);
  const [popup, setSecondPop] = useState(false);
  const [inputValue, setInputValue] = useState<FormValues | any>([]);
  const [newCustOpen, setnewCustOpen] = useState(false);
  const [id, setId] = useState<FormValues | any>([]);
  const [date, setDate] = useState<FormValues | any>([]);

  const [item, setItem] = useState<FormValues | any>([]);
  const [product, setProduct] = useState<FormValues | any>([]);
  const [selected, setSelected] = useState<readonly string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

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
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const dates = new Date();

    const invoiceDate = moment(data.date).format("DD/MM/YYYY");
    const createdDate = moment(dates).format("DD/MM/YYYY");

    console.log(moment(dates).format("DD/MM/YYYY"), "date");
    const requestedData = {
      itemId: selected,
      amount: price,
      status: "pending",
      createdDate: createdDate,
      createdBy: "1",
      invoiceDate: invoiceDate,
      customerId: userID.id,
    };
    console.log(requestedData, "requestedData");

    await axios({
      method: "POST",
      url: `${api_url}/createInvoice`,
      data: requestedData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        router.push("/admin/invoices");

        reset();
      })
      .catch((err) => {});
  };
  const getItem = async () => {
    await axios({
      method: "GET",
      url: `${api_url}/getItem`,

      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        setItem(res?.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    let cusId = localStorage.getItem("customerId");

    console.log(cusId, "custID");
    // if (cusId) {
    //   setOpens(false);
    // }
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
      .catch((err) => {});
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
      .catch((err) => {});
  };
  const handleSearch = (e: any) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setInputValue("");
    } else {
      const filterres =
        user &&
        user.filter((item: any) => {
          return item.firstName.includes(e.target.value.toLowerCase());
        });
      const dtd = filterres;
      setUser(dtd);
    }
  };
  const handleClickOpen = () => {
    setOpens(true);
  };
  const handleClose = (data: any) => {
    if (data === false) {
      getUser();
      setOpens(false);

      console.log(
        data,
        "......................................................x"
      );
    } else {
      setId(data);
      getUser();
      setOpens(false);

      console.log(data, "..................id");
    }
  };

  const handlePopup = (stats: any) => {
    if (stats === false) {
      getItem();
      setSecondPop(false);

      console.log(
        stats,
        "......................................................x"
      );
    } else {
      getItem();
      setSecondPop(false);
    }

    if (stats) {
      console.log(stats, "statsssssssssssssss");
    }
  };
  // const handleSave = () => {
  //   // let cusId = localStorage.getItem("customerId");
  //   console.log(moment(date).format("DD/MM/YYYY"), "date");
  //   const requestedData = {
  //     itemId: selected,
  //     amount: price,
  //     status: "pending",
  //     createdDate: "19/01/2023",
  //     createdBy: "1",
  //     invoiceDate: "28/01/2023",
  //     customerId: id,
  //   };
  //   console.log(requestedData, "requestedData");
  // };

  console.log(user, "userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="guardianBar">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bars">
                <div>
                  <span className="smallHeading">Home</span>&nbsp;
                  <span>&gt;</span> &nbsp;{" "}
                  <span className="secondHeading">Create Invoices</span>
                </div>
                <div className="cinvoice">
                  <div>
                    <span className="GItitle">CREATE INVOICES</span>
                  </div>
                  <div className="isave">
                    <BootstrapButton type="submit">
                      Save as Draft
                    </BootstrapButton>

                    <BootstrapButton type="button">
                      Save & issue
                    </BootstrapButton>
                  </div>
                  {/* <Button sx={{ margin: "7px" }} type="button">
                    Add Guardians
                  </Button> */}
                </div>
              </div>
              <div className="midBar">
                <div className="guardianList">
                  <div>Required</div>
                  <div className="aititle">
                    <div>
                      {" "}
                      <Image
                        className="iaimg"
                        src="/favicon.ico"
                        alt="Picture of the author"
                        width={65}
                        height={62}
                      />
                    </div>
                    <div className="iatitle">
                      <span className="iahead">Qatar International School</span>
                      <span className="line">
                        Qatar international school W.L.L
                      </span>
                      <span className="line">
                        United Nations St, West Bay, P.O. Box: 5697
                      </span>
                      <span className="line">Doha, Qatar</span>
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
                      </InputLabel>
                      <Autocomplete
                        style={{ width: 300 }}
                        fullWidth
                        // value={value}
                        inputValue={inputValue}
                        onChange={(event, value) => setUserId(value)}
                        // onChange={(event, newValue) => {
                        //   setValue(newValue);
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
                            placeholder="Find or create a parent"
                          />
                        )}
                        noOptionsText={
                          <Button onClick={handleClickOpen}>
                            {inputValue === "" ? (
                              "Please enter 1 or more character"
                            ) : (
                              <span>
                                Add &nbsp;<b>{inputValue}</b>&nbsp;as a new
                                parent
                              </span>
                            )}
                          </Button>
                        }
                        // {...register("Customername", {
                        //   required: true,
                        // })}
                      />
                      {/* <Typography style={style}>
                        {errors.Customername ? (
                          <span>Feild is Required **</span>
                        ) : (
                          ""
                        )}
                      </Typography> */}
                    </div>
                    <div className="invoicedateField">
                      <InputLabel htmlFor="name"></InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="# Generate If blank"
                        fullWidth
                      />
                      <InputLabel id="demo-select-small"></InputLabel>
                      &nbsp; &nbsp;
                      <TextField
                        // onChange={(e) => setDate(e.target.value)}
                        placeholder="Date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                          required: true,
                        }}
                        type="date"
                        // defaultValue={values.someDate}
                        {...register("date", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.date ? <span>Feild is Required **</span> : ""}
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
                              <TableCell component="th" scope="row">
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
                        placeholder="Please select a customer"
                      />
                    </div>
                    <div className="invoiceTotalamount">
                      <div className="sdiv">
                        <div className="sidiv">Subtotal</div>
                        <div>$ &nbsp;{price}</div>
                      </div>
                      <div className="sdiv">
                        <div className="sidiv">Total</div>
                        <div>$ &nbsp;{price}</div>
                      </div>
                      <div className="sdiv">
                        <div className="sidiv">Amount Paid</div>
                        <div>$ &nbsp;0.00</div>
                      </div>
                      <div className="sdiv">
                        <div className="sidiv">Balance Due</div>
                        <div>$ &nbsp;{price}</div>
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
                              {item.map((row: any) => {
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
                                      <span className="selectss">selected</span>
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
        </Box>
      </Box>
    </>
  );
}
