import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, InputLabel, OutlinedInput, Stack } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { api_url, auth_token } from "../../../api/hello";
import { ToastContainer, toast } from "react-toastify";
const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};
type FormValues = {
  message: string;
  status: number;
  updatedBy: number;
};

export default function DeleteFormDialog({
  id,
  open,
  closeDialog,
}: {
  id: any;
  open: any;
  closeDialog: any;
}) {
  const [opens, setOpen] = React.useState(open);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const reqData = {
      message: data.message,
      status: 3,
      updatedBy: 1,
    };
    await axios({
      method: "put",
      url: `${api_url}/editCreditNotes/${id}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        if (data) {
          toast.success("Credit Notes Updated Successfully !");
          reset();
          closeDialogs();
        }
      })
      .catch((error) => {
        toast.error(" Internal Server Error !");
      });
  };
  const closeDialogs = () => {
    closeDialog(false);
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={closeDialog} className="delete-popup">
        <DialogTitle>Delete Credit Notes</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent style={{ paddingBottom: "0" }}>
            <DialogContentText>
              Are you sure want to Delete <b>“Credit Notes”</b> from the
              records.
            </DialogContentText>
            <Grid>
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1} style={{ marginTop: "15px" }}>
                      <InputLabel htmlFor="name">Add Note</InputLabel>
                      <OutlinedInput
                        className="comment"
                        type="text"
                        id="name"
                        fullWidth
                        {...register("message", {
                          required: true,
                          validate: (value) => {
                            return !!value.trim();
                          },
                        })}
                      />
                      {errors.message?.type === "required" && (
                        <span style={style}>Field is Required *</span>
                      )}
                      {errors.message?.type === "validate" && (
                        <span style={style}>Name can't be blank *</span>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button type="submit" style={{ color: "#66BB6A" }}>
              ok
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer />
    </>
  );
}
