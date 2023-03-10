import {
  Button,
  CardContent,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Table,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api_url, auth_token } from "../../../api/api";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import commmonfunctions from "../../../../commonFunctions/commmonfunctions";
import { AddLogs } from "../../../../helper/activityLogs";


type FormValues = {
  message: string;
  status: number;
  amount: number;
  updatedBy: number;
  customerId: number;
  amountMode: number;
  creditRequestId: number;
};
const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};
export default function ApproveCompForm({
  id,
  roleid,
  closeDialog,
  custId,
  creditReqId,
}: {
  id: any;
  roleid: any;
  closeDialog: any;
  custId: any;
  creditReqId: any;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  
  const [userUniqueId, setUserUniqId] = React.useState<any>();

  React.useEffect(() => {
    commmonfunctions.VerifyLoginUser().then(res => {
      setUserUniqId(res?.id)
    });
  }, []);



  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const reqData = {
      amount: data.amount,
      message: data.message,
      status: roleid === 1 ? 4 : 1,
      customerId: custId,
      amountMode: 1,
      creditRequestId: creditReqId,
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
          AddLogs(userUniqueId,`Edit Credit Notes id - (${(id)})`);
          toast.success("Credit Notes Updated Successfully !");
          reset();
          closeDialogs();
          router.push("/admin/creditnotes/creditnoteslist");
        }
      })
      .catch((error) => {
        toast.error(" Internal Server Error !");
      });
  };
  const closeDialogs = () => {
    closeDialog(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography
                variant="h5"
                style={{
                  fontWeight: "bold",
                  color: "#333333",
                }}
              >
                How much you want to credit back?
              </Typography>
            </Stack>
          </Stack>
          <Table style={{ marginTop: "20px" }}>
            <Stack>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">AMOUNT</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      fullWidth
                      placeholder="$ 100.5"
                      size="small"
                      {...register("amount", {
                        required: true,
                      })}
                    />
                    {errors.amount?.type === "required" && (
                      <span style={style}>Field is Required *</span>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={12} className="delete-popup">
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">
                      Your comments on this request{" "}
                    </InputLabel>
                    <OutlinedInput
                      className="comment"
                      type="text"
                      id="name"
                      fullWidth
                      size="small"
                      {...register("message", {
                        required: true,
                      })}
                    />
                    {errors.message?.type === "required" && (
                      <span style={style}>Field is Required *</span>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    <b>SAVE</b>
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#F95A37",
                    }}
                    onClick={closeDialogs}
                  >
                    <b>CANCEL</b>
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Table>
        </CardContent>
      </form>
      <ToastContainer />
    </>
  );
}
