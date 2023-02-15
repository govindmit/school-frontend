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
import MiniDrawer from "../../sidebar";
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
import { api_url, auth_token } from "../../api/hello";
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
  type: typeEnum;
  image: any;
  shortdescription: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  status: statusEnum;
  startDates: string;
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

export default function EditActivity() {
  const [spinner, setshowspinner] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [type, setType] = useState<FormValues | any>("");
  const [status, setStatus] = useState<FormValues | any>("");
  const [startDate, setStartDate] = useState<FormValues | any>("");
  const [endDate, setEndDate] = useState(null);
  const [Activity, setActivityDetail] = useState<FormValues | any>("");
  const [content, setContent] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityPrice, setActivityPrice] = useState<any>("");

  const [descontent, setDesContent] = useState("");
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const { activityId } = router.query;
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    
    var sDate = "";
    var eDate = "";
    if (startDate) {
      sDate = moment(startDate).format("DD/MM/YYYY");
    }
    if (endDate) {
      eDate = moment(endDate).format("DD/MM/YYYY");
    }
   
    const reqData = {
      name: data.name,
      type: type,
      startdate: sDate ? sDate : Activity[0]?.startDate,
      enddate: eDate ? eDate : Activity[0]?.endDate,
      status: status,
      price: type === "Free"? 0 : data.price,
      shortDescription: content,
      description: descontent,
    };
   
    const end_point = "addactivity";
    await axios({
      method: "PUT",
      url: `${api_url}/editactivity/${activityId}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        //   setshowspinner(false);
        //   setBtnDisabled(false);
        toast.success("Activity Updated Successfully !");
        setTimeout(() => {
          router.push("/admin/activitylist");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Activity Allready Registred !");
        setshowspinner(false);
        setBtnDisabled(false);
      });
  };
  const getActivityDetail = async () => {
    try {
      const response = await fetch(
        `${api_url}/getactivitydetails/${activityId}`,
        {
          method: "GET",
          headers: {
            Authorization: auth_token,
          },
        }
      );
      const res = await response.json();
      const startDates = moment(res.data[0].startDate).format("DD/MM/YYYY");
      console.log(res, "responce");
       setValue("name", res.data[0]?.name);
      setValue("price", res.data[0]?.price);
      setType(res.data[0]?.type);
      setStatus(res.data[0]?.status);
      setActivityDetail(res.data);
      setContent(res.data[0]?.shortDescription);
      setDesContent(res.data[0]?.description);
      //   setparentid(res.data[0].parentId);
      //   setstatus(res.data[0].status);
      //   setcustType(res.data[0].typeId);
    } catch (error) {
      console.log("error", error);
    }
  };
  //   console.log(Activity[0]?.startDate, "activityyyyyyy");
  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };
  
  useEffect(() => {
    getActivityDetail();
  }, []);

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
                  EDIT ACTIVITY
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
                            // value={Activity[0]?.name}
                            {...register("name", {
                              required: true,
                            })}
                            onChange={(e) => setActivityName(e.target.value)}
                          />
                          {errors.name?.type === "required" && (
                              <span style={style}>
                               {activityName === ""? "Activity name is Required":""}
                              </span>
                            )}
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
                            onChange={(e) => setType(e.target.value)}
                            labelId="demo-select-small"
                            label="Status"
                            // {...register("type", {
                            //   onChange: (event) => {
                            //     setType(event.target.value);
                            //   },
                            //   required: true,
                            // })}
                            // {...register("sort")}
                          >
                            {/* <MenuItem value={sort}>
                                    <em>None</em>
                                  </MenuItem> */}
                            <MenuItem value="Free">Free</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                          </Select>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">Status</InputLabel>
                          <Select
                            defaultValue="none"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            labelId="demo-select-small"
                            id="demo-select-small"
                            label="Status"

                            // {...register("sort")}
                          >
                            {/* <MenuItem value={sort}>
                                    <em>None</em>
                                  </MenuItem> */}
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Draft">Draft</MenuItem>
                            <MenuItem value="Archive">Archive</MenuItem>
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
                            placeholderText={Activity[0]?.startDate}
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
                            placeholderText={Activity[0]?.endDate}
                            minDate={startDate}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                  {(type && type === "Paid") || type === "" ? (
                  <Stack style={{ marginTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="name">
                            Ammount<span className="err_str">*</span>
                          </InputLabel>
                          <OutlinedInput
                            type="text"
                            id="price"
                            placeholder="Activity Amount ..."
                            fullWidth
                            size="small"
                            {...register("price", {
                              required: true,
                              pattern: /^[0-9+-]+$/,
                            })}
                            onChange={(e) => setActivityPrice(e.target.value)}
                          />
                          {errors.price?.type === "required" && (
                              <span style={style}>
                               {activityPrice === ""? "Amount is Required":""}
                              </span>
                            )}
                            {errors.price?.type === "pattern" && (
                              <span style={style}>Enter Valid Amount *</span>
                            )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                     ) : (
                      ""
                    )}
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
                            value={content}
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
                            value={descontent}
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
                  >
                    <b>Save</b>
                  </Button>
                  &emsp;&emsp;
                  <Link
                    href="/admin/activitylist"
                    style={{ color: "#1A70C5", textDecoration: "none" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      sx={{ width: 150, marginTop: 5 }}
                      autoFocus
                      // disabled={btnDisabled}
                    >
                      <b>Cancel</b>
                    </Button>
                  </Link>
                </Grid>
              </form>
            </Card>
          </div>
        </Box>
      </Box>
    </>
  );
}