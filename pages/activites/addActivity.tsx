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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setshowspinner(true);
    setBtnDisabled(true);
    const reqData = {
      name: data.name,
      type: data.type,
      description: data.description,
      shortdescription: data.shortdescription,
      image: data.image[0],
      startdate: data.startDate,
      enddate: data.endDate,
      status: data.status,
      price: data.price,
    };
    const end_point = "addactivity";
    await axios({
      method: "POST",
      url: api_url + end_point,
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
          toast.success("Activity Added Successfully !");
          const redirect = () => {
            router.push("/activites/activitylist");
          };
          setTimeout(redirect, 2000);
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
                      <InputLabel htmlFor="name">Activity Name <span className="err_str">*</span></InputLabel>
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
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">Type</InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="Phone..."
                        fullWidth
                        size="small"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">Status</InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="Address1..."
                        fullWidth
                        size="small"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Stack style={{ marginTop: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">Start Date</InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="City..."
                        fullWidth
                        size="small"
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">End Date*</InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="State..."
                        fullWidth
                        size="small"
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
              <Stack style={{ marginTop: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">Ammount<span className="err_str">*</span></InputLabel>
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
