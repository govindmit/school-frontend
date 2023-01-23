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
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { api_url, auth_token } from "../api/hello";
import AddNewParent from "../customer/addNewParent";

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

export default function AddCustomerCmp() {
  const [Open, setOpen] = React.useState<any>(true);
  const [users, setUsers] = useState<any>([]);
  const [searchdata, setsearchdata] = useState<any>([]);
  const [opens, setOpens] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState([]);

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
  const option: { id: number; label: string }[] = [];
  //searching
  const handleSearch = (e: any) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setsearchdata("");
    } else {
      const filterres =
        users &&
        users.filter((item: any) => {
          return item.firstname
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
      const dtd = filterres;
      setsearchdata(dtd);
    }
  };
  searchdata &&
    searchdata.map((data: any, key: any) => {
      return option.push({
        id: data.id,
        label: data.firstname,
      });
    });

  const handleClickOpen = () => {
    setOpens(true);
  };
  const handleClose = () => {
    setOpens(false);
  };

  console.log(selected);

  return (
    <>
      <Autocomplete
        Open={Open}
        debug={true}
        options={option}
        size="small"
        renderInput={(params) => (
          <>
            <TextField {...params} placeholder="Find or create a parent" />
          </>
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
        onInputChange={handleSearch}
        onChange={(event, value: any) => setSelected(value)}
      />
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
          <AddNewParent />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
