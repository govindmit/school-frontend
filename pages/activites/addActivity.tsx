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
  Menu,
} from "@mui/material";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

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

export default function AddActivity({
  open,
  closeDialog,
}: {
  open: any;
  closeDialog: any;
}) {
  const router = useRouter();
  const [spinner, setshowspinner] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [opens, setOpen] = React.useState(open);
  const [type, setType] = useState<FormValues | any>(null);
  const [status, setStatus] = useState<FormValues | any>(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  console.log(errors, "errorssss");
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setshowspinner(true);
    setBtnDisabled(true);
    const sDate = moment(startDate).format("DD/MM/YYYY");
    const eDate = moment(endDate).format("DD/MM/YYYY");

    const reqData = {
      name: data.name,
      type: data.type,
      startdate: sDate,
      enddate: eDate,
      status: data.status,
      price: data.price,
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
          setshowspinner(false);
          setBtnDisabled(false);
          closeDialog(false);

          toast.success("Activity Added Successfully !");
        }
      })
      .catch((error) => {
        toast.error("Activity Allready Registred !");
        setshowspinner(false);
        setBtnDisabled(false);
      });
  };

  const closeDialogs = () => {
    closeDialog(false);
    setOpen(false);
  };
  const style = {
    color: "red",
    fontSize: "12px",
    fontWeight: "bold",
  };
  return (
    <BootstrapDialog
      onClose={closeDialog}
      aria-labelledby="customized-dialog-title"
      open={opens}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={closeDialogs}>
        New Activity
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
                      <Typography style={style}>
                        {errors.name && <span>Name Feild is Required **</span>}
                      </Typography>
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
                        labelId="demo-select-small"
                        label="Status"
                        {...register("type", {
                          onChange: (e) => {
                            setType(e.target.value);
                          },
                          required: true,
                        })}
                      >
                        <MenuItem value="Free">Free</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                      </Select>
                      <Typography style={style}>
                        {errors.type && <span>Type Feild is Required **</span>}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                      <Typography style={style}>
                        {errors.status && (
                          <span>status Feild is Required **</span>
                        )}
                      </Typography>
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
                        placeholderText="Start Date"
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
                        placeholderText="End Date"
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
                        id="amount"
                        placeholder="Activity name ..."
                        fullWidth
                        size="small"
                        {...register("price", {
                          required: true,
                        })}
                      />
                      <Typography style={style}>
                        {errors.price && (
                          <span>Amount Feild is Required **</span>
                        )}
                      </Typography>
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
