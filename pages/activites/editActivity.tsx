import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";
import { GridCloseIcon } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

export default function EditActivity({
  id,
  open,
  closeDialogedit,
}: {
  id: any;
  open: any;
  closeDialogedit: any;
}) {
  const router = useRouter();
  const [spinner, setshowspinner] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [opens, setOpen] = React.useState(open);
  const [type, setType] = useState<FormValues | any>("");
  const [status, setStatus] = useState<FormValues | any>("");
  const [startDate, setStartDate] = useState<FormValues | any>("");
  const [endDate, setEndDate] = useState(null);
  const [Activity, setActivityDetail] = useState<FormValues | any>("");

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<FormValues>();
  console.log(type, "type");
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // setshowspinner(true);
    // setBtnDisabled(true);
    var sDate = "";
    var eDate = "";
    if (startDate) {
      sDate = moment(startDate).format("DD/MM/YYYY");
    }
    if (endDate) {
      eDate = moment(endDate).format("DD/MM/YYYY");
    }
    console.log(Activity, "Activity");
    const reqData = {
      name: data.name,
      type: type,
      startdate: sDate ? sDate : Activity[0]?.startDate,
      enddate: eDate ? eDate : Activity[0]?.endDate,
      status: status,
      price: data.price,
    };
    // const end_point = "addactivity";
    await axios({
      method: "PUT",
      url: `${api_url}/editactivity/${id}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
        "content-type": "multipart/form-data",
      },
    })
      .then((data) => {
        //   setshowspinner(false);
        //   setBtnDisabled(false);
        closeDialogedit(false);

        toast.success("Activity Added Successfully !");
      })
      .catch((error) => {
        toast.error("Activity Allready Registred !");
        setshowspinner(false);
        setBtnDisabled(false);
      });
  };
  const getActivityDetail = async () => {
    console.log(id, "idssssssssss");
    try {
      const response = await fetch(`${api_url}/getactivitydetails/${id}`, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      const startDates = moment(res.data[0].startDate).format("DD/MM/YYYY");
      console.log(res, "responce");
      setValue("name", res.data[0].name);
      setValue("price", res.data[0].price);
      setType(res.data[0].type);
      setStatus(res.data[0].status);
      setActivityDetail(res.data);
      //   setparentid(res.data[0].parentId);
      //   setstatus(res.data[0].status);
      //   setcustType(res.data[0].typeId);
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log(Activity[0]?.startDate, "activityyyyyyy");
  const closeDialogs = () => {
    closeDialogedit(false);
    setOpen(false);
  };
  useEffect(() => {
    getActivityDetail();
  }, []);
  return (
    <BootstrapDialog
      onClose={closeDialogs}
      aria-labelledby="customized-dialog-title"
      open={opens}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={closeDialogs}>
        Edit Activity
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid>
              <Stack style={{ marginTop: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
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
                        {...register("name", {
                          required: true,
                        })}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Stack style={{ marginTop: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
              <Stack style={{ marginTop: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">
                        Ammount<span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        type="text"
                        id="price"
                        placeholder="Activity name ..."
                        fullWidth
                        size="small"
                        {...register("price", {
                          required: true,
                        })}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <DialogActions style={{ marginTop: "10px" }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ width: 150 }}
                autoFocus
                disabled={btnDisabled}
              >
                <b>Save</b>
                <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
                  {spinner === true ? <CircularProgress color="inherit" /> : ""}
                </span>
              </Button>
            </DialogActions>
          </form>
          <ToastContainer />
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
