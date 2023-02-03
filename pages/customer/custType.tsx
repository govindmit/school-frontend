import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  Box,
  Typography,
  Stack,
  Breadcrumbs,
  BoxProps,
  IconButton,
  FormControl,
  TextField,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MiniDrawer from "../sidebar";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api_url, auth_token } from "../api/hello";
import ConfirmBox from "../commoncmp/confirmbox";
import styled from "@emotion/styled";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useForm, SubmitHandler } from "react-hook-form";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return <Box sx={{}} {...other} />;
}
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

type FormValues = {
  name: string;
  ename: string;
};

export default function CustomerTypeList() {
  const [custtype, setcusttype] = useState<any>([]);
  const [All, setAll] = useState(0);
  const [searchquery, setsearchquery] = useState("");
  const [searchdata, setsearchdata] = useState([]);
  const [deleteConfirmBoxOpen, setdeleteConfirmBoxOpen] = React.useState(false);
  const [typeOpen, setTypeOpen] = React.useState(false);
  const [edittypeOpen, setedittypeOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  //open close popup boxes
  function handleTypeOpen() {
    setTypeOpen(true);
  }
  const handleClose = () => {
    setTypeOpen(false);
  };

  function handleEditCustomerTypeOpen(id: any) {
    setedittypeOpen(true);
    getTypeDet(id);
  }

  const handleEditClose = () => {
    setedittypeOpen(false);
  };

  useEffect(() => {
    getType();
  }, []);

  //get customers type
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
      setsearchdata(res.data);
      setAll(res.data.length);
    } catch (error) {
      console.log("error", error);
    }
  };

  //get customers type det
  const getTypeDet = async (id: any) => {
    const url = `${api_url}/getTypeDet/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: auth_token,
        },
      });
      const res = await response.json();
      setValue("ename", res.data[0].name);
    } catch (error) {
      console.log("error", error);
    }
  };

  // apply searching
  const handleSearch = (e: any) => {
    setsearchquery(e.target.value);
    if (e.target.value === "") {
      setcusttype(searchdata);
    } else {
      const filterres = searchdata.filter((item: any) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });
      const dtd = filterres;
      setcusttype(dtd);
    }
  };

  //delete user
  const [deleteData, setDeleteData] = useState<any>({});
  function openDelete(data: any) {
    setdeleteConfirmBoxOpen(true);
    setDeleteData(data);
  }

  async function deleteUser() {
    let reqData = { isDeleted: 1 };
    await axios({
      method: "DELETE",
      url: `${api_url}/deleteType/${deleteData.id}`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        toast.success("Customer Type Deleted Successfully !");
        setdeleteConfirmBoxOpen(false);
        getType();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const reqData = {
      name: data.name,
    };
    await axios({
      method: "POST",
      url: `${api_url}/addType`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        if (data.status === 201) {
          toast.success("Customer Type Added Successfully !");
          reset();
          handleClose();
          getType();
        }
      })
      .catch((error) => {
        toast.error("Name Allready Registred !");
      });
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <div className="guardianBar">
            {/*bread cump */}
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
                      href="/admin/dashboard"
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
                      Customer Type
                    </Link>
                  </Breadcrumbs>
                </Stack>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "#333333" }}
                >
                  CUSTOMER TYPE
                </Typography>
              </Stack>
              <Button
                className="button-new"
                variant="contained"
                size="small"
                style={{ width: "247px" }}
                onClick={handleTypeOpen}
              >
                New Customer Type
              </Button>
            </Stack>
            {/*bread cump */}
            <Card
              style={{ margin: "10px", padding: "15px" }}
              className="box-shadow"
            >
              <TableContainer>
                {/*bread cump */}
                <Stack
                  style={{ marginBottom: "10px" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    className="filter-list"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Item className="filter-active">ALL ({All})</Item>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="fimport-export-box"
                  >
                    <FormControl>
                      <TextField
                        placeholder="Search..."
                        size="small"
                        value={searchquery}
                        type="search..."
                        onInput={(e) => handleSearch(e)}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
                {/*bread cump */}
                <Table style={{ marginTop: "20px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Typography>ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>NAME</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>No of Student</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>ACTION</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {custtype &&
                      custtype.map((item: any, key: any) => {
                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            role="checkbox"
                            //key={key}
                            className="boder-bottom"
                          >
                            <TableCell padding="checkbox">
                              <Checkbox />
                            </TableCell>
                            <TableCell align="left">CUST-000{key}</TableCell>
                            <TableCell align="left">{item.name}</TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">
                              <Stack
                                className="action"
                                direction="row"
                                spacing={1}
                              >
                                <IconButton
                                  className="action-edit"
                                  onClick={() =>
                                    handleEditCustomerTypeOpen(item.id)
                                  }
                                >
                                  <FiEdit />
                                </IconButton>
                                <IconButton
                                  className="action-delete"
                                  style={{ color: "#F95A37" }}
                                  onClick={() => openDelete(item)}
                                >
                                  <RiDeleteBin5Fill />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                <Stack
                  style={{ marginBottom: "10px", marginTop: "10px" }}
                  direction="row"
                  alignItems="right"
                  justifyContent="space-between"
                ></Stack>
              </TableContainer>
            </Card>
          </div>
        </Box>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={typeOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Customer Type
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid>
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">
                        Customer Name<span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        type="text"
                        id="name"
                        fullWidth
                        size="small"
                        {...register("name", {
                          required: true,
                        })}
                      />
                      {errors.name && (
                        <span style={style}>Field is Required *</span>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ width: 150 }}
              autoFocus
            >
              <b>Create</b>
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
      {/* <BootstrapDialog
        onClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={edittypeOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleEditClose}
        >
          Edit Customer Type
        </BootstrapDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid>
              <Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="ename">
                        Customer Name<span className="err_str">*</span>
                      </InputLabel>
                      <OutlinedInput
                        type="text"
                        id="ename"
                        fullWidth
                        size="small"
                        {...register("ename", {
                          required: true,
                        })}
                      />
                      {errors.ename && (
                        <span style={style}>Field is Required *</span>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ width: 150 }}
              autoFocus
            >
              <b>Create</b>
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog> */}
      <ConfirmBox
        open={deleteConfirmBoxOpen}
        closeDialog={() => setdeleteConfirmBoxOpen(false)}
        title={deleteData?.name}
        deleteFunction={deleteUser}
      />
      <ToastContainer />
    </>
  );
}
