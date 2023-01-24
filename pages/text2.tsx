import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { api_url, auth_token } from "./api/hello";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import AddNewParent from "./customer/addNewParent";
import { SubmitHandler, useForm } from "react-hook-form";

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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type FormValues = {};

export default function App() {
  const [users, setUsers] = useState<any>([]);
  const [opens, setOpens] = React.useState(false);
  const [value, setValue] = useState<any>({});
  const [inputValue, setInputValue] = useState<any>("");

  const { handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
    const reqdata = {
      parentId: value.id,
    };
    console.log("req data", reqdata);
  };

  useEffect(() => {
    getUser();
  }, []);
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
  const option: { id: number; title: string }[] = [];
  users &&
    users.map((data: any, key: any) => {
      return option.push({
        id: data.id,
        title: data.firstname,
      });
    });
  const handleClickOpen = () => {
    setOpens(true);
  };
  const handleClose = () => {
    setOpens(false);
  };

  //console.log(value);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Autocomplete
          //value={value}
          inputValue={inputValue}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={option}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Find or create a parent"
            />
          )}
          noOptionsText={
            <Button onClick={handleClickOpen}>
              {inputValue === "" ? (
                "Please enter 1 or more character"
              ) : (
                <span>
                  Add &nbsp;<b>{inputValue}</b>&nbsp;as a new parent
                </span>
              )}
            </Button>
          }
        />
        <button type="submit">save</button>
      </form>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={opens}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Parent
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <AddNewParent parentName={inputValue} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
