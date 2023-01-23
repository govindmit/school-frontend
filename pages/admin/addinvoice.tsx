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
  makeStyles,
} from "@mui/material";
import { BsTelegram } from "react-icons/bs";
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
import { useForm, SubmitHandler } from "react-hook-form";
import {
  setSyntheticLeadingComments,
  setTokenSourceMapRange,
} from "typescript";
import Paper from "@mui/material/Paper";

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
      url: `${api_url}getInvoice`,
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
      url: `${api_url}getInvoice`,
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
  const searchItems = (e: any) => {
    console.log(e.target.value, "eeeeeeeeeeeeee");
    if (e.target.value === "") {
      // setUsers(searchdata);
      getUser();
    } else {
      const filterres = user.filter((item: any) => {
        return item.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
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
      url: `${api_url}deleteInvoice/${id}`,
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
      url: `${api_url}sendInvoiceEmail/${invoiceId}`,
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

  const pending = user.filter((a: any) => a.status == "pending");
  const paid = user.filter((a: any) => a.status == "paid");
  const draft = user.filter((a: any) => a.status == "draft");

  console.log(sdata, "sdata");
  const handleFilter = () => {
    getUser();
    console.log(user, "click filter");
  };
  console.log(sdata, "sdataaaaaaaaaaaaaa");
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
                <span className="secondHeading">Create Invoices</span>
                <h1 className="Gtitle">CREATE INVOICES</h1>
              </div>
              <div className="searchBar">
                <Link href="/admin/addinvoice">
                  <BootstrapButton type="button"> Invoice</BootstrapButton>
                </Link>
                {/* <Button sx={{ margin: "7px" }} type="button">
                    Add Guardians
                  </Button> */}
              </div>
            </div>
            <div className="midBar">
              <div className="guardianList"></div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
