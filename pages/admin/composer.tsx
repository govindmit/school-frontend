import React, { useEffect, useRef, useState } from "react";
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
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { api_url, auth_token } from "../api/hello";
import { GridCloseIcon } from "@mui/x-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import dynamic from "next/dynamic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainFooter from "../commoncmp/mainfooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

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
  subject: string;
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
  const [type, setType] = useState<FormValues | any>("");
  const [name1, setName1] = useState<FormValues | any>("");
  const [ageGroup, setAgeGroup] = useState<FormValues | any>([]);
  const [typeError, setTypeError] = useState<FormValues | any>("");
  const [customerId, setCustomerId] = React.useState<any>([]);
  const [parentid, setparentid] = React.useState("");
  const [custtype, setcusttype] = React.useState<any>([]);
  const [parentname, setparentname] = React.useState<any>([]);
  const [customerError, setCustomerError] = React.useState<any>([]);
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [descontent, setDesContent] = useState("");
  const [anyFieldError, setAnyFieldError] = useState("");
  const [subject, setSubject] = useState("");
  const [typeData, setTypeData] = React.useState<any>([]);
  const [age, setAge] = useState("");
  const [valids, setValids] = React.useState(false);

  const [users, setUsers] = useState<any>([]);
  const [opens, setOpens] = React.useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [value, setValue] = useState<any>([]);

  let allData: any = [];

  React.useEffect(() => {
    getType();
    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
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

  const setTypeId = async (id: any) => {
    setType(id);
    if (id !== null) {
      const reqData = {
        typeId: id,
      };
      await axios({
        method: "POST",
        url: `${api_url}/getuser`,
        data: reqData,
        headers: {
          Authorization: auth_token,
        },
      })
        .then((res: any) => {
          if (res.status === 200) {
            setTypeData(res?.data?.data);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const setAgegroupId = async (id: any) => {
    setAge(id);
    if (id !== null) {
      const reqData = {
        agegroup: id,
      };
      await axios({
        method: "POST",
        url: `${api_url}/getuser`,
        data: reqData,
        headers: {
          Authorization: auth_token,
        },
      })
        .then((res: any) => {
          if (res.status === 200) {
            setAgeGroup(res?.data?.data);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  value &&
    value?.map((ea: any) => {
      if (!allData.includes(ea)) {
        allData.push({
          email1: ea.email1,
          name: ea.name,
        });
      }
    });

  ageGroup &&
    ageGroup?.map((ea: any) => {
      if (!allData.includes(ea.email1)) {
        allData.push({
          email1: ea.email1,
          name: ea.name,
        });
      }
    });

  typeData &&
    typeData?.map((ea: any) => {
      if (!allData.includes(ea.email1)) {
        allData.push({
          email1: ea.email1,
          name: ea.name,
        });
      }
    });

  const filteredArr = allData.reduce((acc: any, current: any) => {
    const x = acc.find((ea: any) => ea.name === current.name);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const setSub = (e: any) => {
    setSubject(e?.target?.value);
    setValids(false);
  };

  const getUser = async () => {
    const url = `${api_url}/getuser`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setUsers(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const option: { email1: string; name: string }[] = [];
  users &&
    users.map((data: any, key: any) => {
      return option.push({
        email1: data.email1,
        name: data.name,
      });
    });

  const onSubmit: SubmitHandler<FormValues> = async (data, e: any) => {
    setValids(false);
    if (subject === "") {
      setSubjectError("Subject field is required *");
    }
    if (descontent === "") {
      setMessageError("Message field is required *");
    }
    if (filteredArr?.length === 0) {
      setAnyFieldError("Please filled any one of fields");
    }

    let reqData = {
      composer: filteredArr,
      subject: subject,
      descontent: descontent,
    };
    if (subject === "" || descontent === "") {
      console.log("@@");
    } else if (filteredArr?.length === 0) {
      setAnyFieldError("Please filled any one of fields");
    } else {
      if (descontent === "<p><br></p>") {
        setValids(false);
      }
      await axios({
        method: "POST",
        url: `${api_url}/sendcomposer`,
        data: reqData,
        headers: {
          Authorization: auth_token,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Mail sent successfully");
            setType("");
            setAge("");
            setValue([]);
            setSubject("");
            setAnyFieldError("");
            setSubjectError("");
            setMessageError("");
            setDesContent("");
            e.target.reset();
            setValids(true);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
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
                  <div className="composer-top">
                    <Stack style={{}}>
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Stack spacing={1} className="customer-name">
                            <InputLabel htmlFor="name">
                              Customer Name
                            </InputLabel>
                            <Autocomplete
                              multiple
                              size="small"
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                              // onChange={(e) => setCustomerData(e.target.value)}
                              options={option}
                              getOptionLabel={(option) => option.name || ""}
                              isOptionEqualToValue={(option, name) =>
                                option.name === value.name
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  placeholder="Search or Select Customer"
                                />
                              )}
                              noOptionsText={
                                <span style={{ color: "red" }}>
                                  The customer doesn't exist with this name.
                                </span>
                              }
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Stack>
                    <p>or</p>
                    <Stack style={{}} className="padding-top-0">
                      <Grid container spacing={2}>
                        <Grid item xs={4} md={4}>
                          <Stack spacing={1} className="customer-name">
                            <InputLabel htmlFor="name">as Type</InputLabel>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                value={type}
                                onChange={(e) => setTypeId(e?.target?.value)}
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
                          <Stack spacing={1} className="customer-name">
                            <InputLabel htmlFor="name">Age Group</InputLabel>
                            <FormControl fullWidth>
                              <Select
                                labelId="demo-simple-select-label"
                                id="ageGroup"
                                size="small"
                                value={age}
                                onChange={(e) =>
                                  setAgegroupId(e?.target?.value)
                                }
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
                  {filteredArr?.length !== 0
                    ? ""
                    : anyFieldError && (
                        <span style={style}>Please select any fields *</span>
                      )}

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
                            {...register("subject")}
                            onChange={(e) => setSub(e)}
                          />
                          {subjectError && subject === "" ? (
                            <span style={style}>
                              Subject field is Required *
                            </span>
                          ) : (
                            ""
                          )}
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
                            value={descontent}
                            modules={modules}
                            formats={formats}
                            theme="snow"
                            // value={descontent}
                            onChange={setDesContent}
                          />
                          {(messageError && descontent === "") ||
                          descontent === "<p><br></p>" ? (
                            <span style={style}>
                              {valids === false
                                ? "Message field is Required **"
                                : ""}
                            </span>
                          ) : (
                            ""
                          )}
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
          <ToastContainer />
        </Box>
      </Box>
    </>
  );
}
