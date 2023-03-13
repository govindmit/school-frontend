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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import MiniDrawer from "../sidebar";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { api_url, auth_token, base_url } from "../../helper/config";
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
import AddNewCustomer from "./customer/addNewCustomer";
import commmonfunctions from "../../commonFunctions/commmonfunctions";
import { AddLogs } from "../../helper/activityLogs";

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
}

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
export default function AddItem({
  start,
  closeD,
}: {
  start: any;
  closeD: any;
}) {
  let localUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>({});
  const [opens, setOpens] = useState(false);

  const [popup, setSecondPop] = useState(start);
  const [id, setId] = useState<FormValues | any>([]);

  const [item, setItem] = useState<FormValues | any>([]);
  const [product, setProduct] = useState<FormValues | any>([]);
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [userUniqueId, setUserUniqId] = useState<any>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

  useEffect(() => {
    commmonfunctions.VerifyLoginUser().then(res => {
      setUserUniqId(res?.id)
    });
  }, []);


  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const BootstrapButton = styled(Button)({
    backgroundColor: "#1A70C5",
    color: "#FFFFFF",
    margin: "7px",
    "&:hover": {
      backgroundColor: "#1A70C5",
    },
  });

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
    closeD(false);
    setSecondPop(false);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    let reqData = {
      name: data.name,
      price: data.price,
      description: data.description,
    };

    await axios({
      method: "POST",
      url: `${api_url}/createItem`,
      data: reqData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        AddLogs(userUniqueId,`Item Added  id - (${(res?.data?.data?.insertId)})`);
        getItem();
        reset();
        toast.success("Item Added Successfully !");
        setTimeout(() => {
          closeD(res);
        }, 2000);
      })
      .catch((err) => { });
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

  return (
    <>
      <BootstrapDialog
        onClose={onclose}
        aria-labelledby="customized-dialog-title"
        open={popup}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onclose}>
          New Item
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers className="dialogss">
            <Grid>
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={14}>
                    <Stack spacing={1}>
                      <div className="display">
                        <div className="label">
                          <InputLabel htmlFor="name">Name :</InputLabel>
                        </div>
                        <div>
                          <OutlinedInput
                            type="text"
                            id="name"
                            placeholder="Name"
                            fullWidth
                            {...register("name", {
                              required: true,
                            })}
                          />
                          <Typography style={style}>
                            {errors.name ? (
                              <span>Feild is Required **</span>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </div>
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={14}>
                    <Stack spacing={1}>
                      <div className="display">
                        <div className="label">
                          <InputLabel htmlFor="name">Price :</InputLabel>
                        </div>
                        <div>
                          <OutlinedInput
                            type="number"
                            id="name"
                            placeholder="price"
                            fullWidth
                            {...register("price", {
                              required: true,
                            })}
                          />
                          <Typography style={style}>
                            {errors.price ? (
                              <span>Feild is Required **</span>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </div>
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={14}>
                    <Stack spacing={1}>
                      <div className="display">
                        <div className="label">
                          <InputLabel htmlFor="name">Description :</InputLabel>
                        </div>
                        <div>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            fullWidth
                            {...register("description", {
                              required: true,
                            })}
                          />
                          <Typography style={style}>
                            {errors.price ? (
                              <span>Feild is Required **</span>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </div>
                      </div>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" autoFocus>
              Create
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      <ToastContainer />
    </>
  );
}
