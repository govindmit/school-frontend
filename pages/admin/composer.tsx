import React, { useEffect, useState } from "react";
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
import AddCustomerName from "../commoncmp/getMultipleCustomer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainFooter from "../commoncmp/mainfooter";

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
  name1: string;
  type1: string;
  description: string;
  price1: number;
  startDate1: string;
  endDate1: string;
  agegroup: number;
  status1: statusEnum;
  customertype: number;
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

export default function Composer() {
  const [spinner, setshowspinner] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [type1, setType1] = useState<FormValues | any>("");
  const [name1, setName1] = useState<FormValues | any>("");
  const [price1, setPrice1] = useState<FormValues | any>("");
  const [typeError, setTypeError] = useState<FormValues | any>("");
  const [customerId, setCustomerId] = React.useState<any>([]);
  const [endDateError, setEndDateError] = useState(false);
  const [parentid, setparentid] = React.useState(0);
  const [custtype, setcusttype] = React.useState<any>([]);
  const [parentname, setparentname] = React.useState<any>([]);
  const [customerError, setCustomerError] = React.useState<any>([]);
  // const [errorMessage, setErrorMessage] = useState("");
  const [descontent, setDesContent] = useState("");
  const [subject, setSubject] = useState("");

  React.useEffect(() => {
    getType();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const Getdata = (item: any) => {
    if (item) {
      setCustomerId(item);
    } else {
      setCustomerId([]);
    }
  };

  const getType = async () => {
    const url = `${api_url}/getType`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setcusttype(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    let iddc: any = [];
    customerId?.map((ea: any) => {
      iddc.push(ea.id);
    });
    console.log(
      subject,
      "@#@$#@$#@#$#$",
      descontent,
      "$$$$$$$$",
      data,
      "@#############",
      iddc
    );
    // if (startDate1 === null || endDate1 === null) {
    //   setDateError(true);
    //   setEndDateError(true);
    // } else {
    //    const sDate = moment(startDate1).format('YYYY.MM.DD');
    //     const eDate = moment(endDate1).format('YYYY.MM.DD');
    //   // const sDate = moment(startDate1).format("DD/MM/YYYY");
    //   // const eDate = moment(endDate1).format("DD/MM/YYYY");
    //   if (type1 === "") {
    //     setTypeError("Type field is required!");
    //   } else {
    //     setTypeError("");
    //   }
    //   const reqData = {
    //     name: name1,
    //     type: type1,
    //     startdate: sDate,
    //     enddate: eDate,
    //     status: data.status1,
    //     price: price1 && price1 !== null ? price1 : "00",
    //     shortDescription: content,
    //     description: descontent,
    //   };

    //   await axios({
    //     method: "POST",
    //     url: `${api_url}/addactivity`,
    //     data: reqData,
    //     headers: {
    //       Authorization: auth_token,
    //       "content-type": "multipart/form-data",
    //     },
    //   })
    //     .then((data) => {
    //       if (data.status === 201) {
    //         toast.success("Activity Added Successfully !");
    //         router.push("/admin/activitylist");
    //       }
    //     })
    //     .catch((err) => {
    //       router.push("/admin/activitylist");
    //       toast.error(err?.response?.data?.message);
    //     });
    // }
  };

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };

  const handleType = (data: any) => {
    if (data) {
      setType1(data);
      setTypeError("");
    } else {
      setTypeError("Type field is required");
    }
  };

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
                      Composer
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  COMPOSER
                </Typography>
              </Stack>
            </Stack>
            <Card
              style={{
                margin: "10px",
                padding: "15px",
                width: "100%",
                paddingBottom: "30px",
              }}
              className="box-shadow"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  width: "60%",
                }}
              >
                <Grid>
                  {/* <div style={{display:"flex"}} className="gridview"> */}
                  <div className="composer-top">
                    <Stack style={{}}>
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Stack spacing={1} className="customer-name">
                            <InputLabel htmlFor="name">
                              Customer Name
                            </InputLabel>
                            <AddCustomerName
                              Data={Getdata}
                              PId={parentid}
                              pname={parentname}
                            />
                            {/* {customerId !== "" && customerError ? (
                            <span style={style}></span>
                          ) : (
                            customerError && (
                              <span style={style}>
                                Customer field is Required *
                              </span>
                            )
                          )} */}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                    <p>or</p>
                    <Stack style={{}} className="padding-top-0">
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">as Type</InputLabel>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                defaultValue={0}
                                {...register("customertype")}
                              >
                                <MenuItem value={0}>Individual</MenuItem>
                                {custtype &&
                                  custtype.map((data: any, key: any) => {
                                    return (
                                      <MenuItem key={key} value={data.id}>
                                        {data.name}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                    <p>or</p>
                    <Stack style={{}} className="padding-top-0">
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">Age Group</InputLabel>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={1}
                                size="small"
                                {...register("agegroup")}
                              >
                                <MenuItem value={1}>FS1</MenuItem>
                                <MenuItem value={2}>FS2</MenuItem>
                                <MenuItem value={3}>FS3</MenuItem>
                                <MenuItem value={4}>FS4</MenuItem>
                                <MenuItem value={5}>FS5</MenuItem>
                                <MenuItem value={6}>FS6</MenuItem>
                                <MenuItem value={7}>FS7</MenuItem>
                                <MenuItem value={8}>FS8</MenuItem>
                                <MenuItem value={9}>FS9</MenuItem>
                                <MenuItem value={10}>FS10</MenuItem>
                                <MenuItem value={11}>FS11</MenuItem>
                                <MenuItem value={12}>FS12</MenuItem>
                                <MenuItem value={13}>FS13</MenuItem>
                              </Select>
                            </FormControl>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                  </div>
                  {/* </div> */}
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Subject<span className="err_str"></span>
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            id="subject"
                            fullWidth
                            size="small"
                            onChange={(e) => setSubject(e?.target?.value)}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Message<span className="err_str"></span>
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
                    <b>Send</b>
                  </Button>
                </Grid>
              </form>
            </Card>
          </div>
          <MainFooter />
        </Box>
      </Box>
    </>
  );
}
