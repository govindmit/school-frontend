import {
  Card,
  Button,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  CardContent,
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import MiniDrawer from "../sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import {
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
} from "@mui/material";
import "react-quill/dist/quill.snow.css";

import { useRouter } from "next/router";
import { api_url, auth_token } from "../api/hello";
import "react-toastify/dist/ReactToastify.css";
import { GridCloseIcon } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

//dialog box
const BootstrapDialog = styled(Dialog)(({ theme }) => ({}));
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
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
          <GridCloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

enum typeEnum {
  Free = "Free",
  Paid = "Paid",
}

enum statusEnum {
  Active = "Active",
  Archive = "Archive",
  Draft = "Draft",
}

type FormValues = {
  name: string;
  type: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  status: statusEnum;
};
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function AddNewActivity() {
  const [spinner, setshowspinner] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [type, setType] = useState<FormValues | any>("");
  const [typeError, setTypeError] = useState<FormValues | any>("");
  const [status, setStatus] = useState<FormValues | any>(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [content, setContent] = useState("");
  const [descontent, setDesContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // setshowspinner(true);
    // setBtnDisabled(true);
    const sDate = moment(startDate).format("DD/MM/YYYY");
    const eDate = moment(endDate).format("DD/MM/YYYY");
    console.log(type === "", ".................................h");
    if (type === "") {
      setTypeError("Type field is required");
    } else {
      setTypeError("");
    }
    const reqData = {
      name: data.name,
      type: data.type,
      startdate: sDate,
      enddate: eDate,
      status: data.status,
      price: data.price,
      shortdescription: content,
      description: descontent,
    };
    const end_point = "addactivity";

    console.log(reqData, "reqdata");
    await axios({
      method: "POST",
      url: `${api_url}/addactivity`,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        if (data.status === 201) {
          router.push("/admin/activitylist");

          toast.success("Activity Added Successfully !");
        }
      })
      .catch((error) => {
        toast.error("Activity Allready Registred !");
      });
  };

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const handleType = (data: any) => {
    if (data) {
      setType(data);
      setTypeError("");
    } else {
      setTypeError("Type field is required");
    }
  };
  console.log(typeError, "typeErrosr");
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
                      Activities
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  VIEW ACTIVITY
                </Typography>
              </Stack>
            </Stack>
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                  <Stack style={{ marginTop: "10px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Activity Name <span className="err_str">*</span>
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            id="name"
                            placeholder="Activity name ..."
                            fullWidth
                            size="small"
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Type</InputLabel>
                          <Select
                            defaultValue="none"
                            value={type}
                            id="type"
                            labelId="demo-select-small"
                            label="Status"
                            onChange={(e) => handleType(e.target.value)}
                            // {...register("type", {
                            //   onChange: (e) => {
                            //     setType(e.target.value);
                            //   },
                            //   required: true,
                            // })}
                          >
                            <MenuItem value="Free">Free</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                          </Select>
                          <Typography style={style}>
                            {typeError ? <span>{typeError}</span> : ""}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Status</InputLabel>
                          <Select
                            defaultValue="none"
                            // onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Status"
                            {...register("status", {
                              onChange: (e) => {
                                setStatus(e.target.value);
                              },
                              required: true,
                            })}
                          >
                            <MenuItem value="Upcoming">Upcoming</MenuItem>
                            <MenuItem value="Past">Past</MenuItem>
                            <MenuItem value="Current">Current</MenuItem>
                          </Select>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Start Date</InputLabel>
                          <DatePicker
                            className="myDatePicker"
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                            placeholderText="Start Date"
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">End Date*</InputLabel>
                          <DatePicker
                            className="myDatePicker"
                            selected={endDate}
                            onChange={(date: any) => setEndDate(date)}
                            name="startDate"
                            dateFormat="MM/dd/yyyy"
                            placeholderText="End Date"
                            minDate={startDate}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Ammount<span className="err_str">*</span>
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            id="amount"
                            placeholder="Amount ..."
                            fullWidth
                            size="small"
                          />
                          {/* <Typography style={style}>
                            {errors.price && (
                              <span>Amount Feild is Required **</span>
                            )}
                          </Typography> */}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Short Description<span className="err_str">*</span>
                          </InputLabel>
                          <QuillNoSSRWrapper
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            onChange={setContent}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Description<span className="err_str">*</span>
                          </InputLabel>
                          <QuillNoSSRWrapper
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            onChange={setDesContent}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ width: 150, marginTop: 5 }}
                    autoFocus
                    disabled={btnDisabled}
                  >
                    <b>Save</b>
                  </Button>
                </Grid>
              </form>
            </Card>
          </div>
        </Box>
      </Box>
    </>
  );
}
