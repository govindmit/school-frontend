import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  CircularProgress,
  DialogActions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../api/hello";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  color: "red",
  fontSize: "12px",
  fontWeight: "bold",
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
type FormValues = {
  firstName: string;
  lastName: string;
  email1: string;
  email2: string;
  number: number;
  phone2: number;
  contactName: string;
  printUs: string;
  status: number;
  type: number;
};
export default function AddNewParent(props: any) {
  const [value, setValue] = React.useState(0);
  const [spinner, setshowspinner] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [custtype, setcusttype] = React.useState<any>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const reqData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email1: data.email1,
      email2: data.email2,
      number: data.number,
      phone2: data.phone2,
      contactName: data.contactName,
      printUs: data.printUs,
      status: data.status,
      type: data.type,
    };
    await axios({
      method: "POST",
      url: `${api_url}/addUser`,
      data: reqData,
      headers: {
        Authorization: auth_token,
      },
    })
      .then((data) => {
        if (data.status === 201) {
          setshowspinner(false);
          setBtnDisabled(false);
          toast.success("Customer Added Successfully !");
          reset();
          localStorage.setItem("setpatentpopup", "true");
        }
      })
      .catch((error) => {
        toast.error("Email Allready Registred !");
        setshowspinner(false);
        setBtnDisabled(false);
      });
  };

  React.useEffect(() => {
    getType();
  }, []);

  //get type
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

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Basic" {...a11yProps(0)} />
            <Tab label="Address" {...a11yProps(1)} />
            <Tab label="Options" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="fname">
                      First Name <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="fname"
                      placeholder="fiste name..."
                      fullWidth
                      size="small"
                      defaultValue={props.parentName}
                      {...register("firstName", {
                        required: true,
                      })}
                    />
                    {errors.firstName && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lname">
                      Last Name <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="lname"
                      placeholder="last name..."
                      fullWidth
                      size="small"
                      {...register("lastName", {
                        required: true,
                      })}
                    />
                    {errors.lastName && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack style={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email">
                      Email <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="email..."
                      fullWidth
                      size="small"
                      {...register("email1", {
                        required: true,
                      })}
                    />
                    {errors.email1 && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="aemail">Alternate Email</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Alternate Email..."
                      fullWidth
                      size="small"
                      {...register("email2")}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack style={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="number">
                      Phone Number <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="number"
                      placeholder="number..."
                      fullWidth
                      size="small"
                      {...register("number", {
                        required: true,
                      })}
                    />
                    {errors.number && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Status</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={1}
                        size="small"
                        {...register("status")}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>InActive</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid>
            <Stack style={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Attention To</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Phone1..."
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Phone</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Print Us..."
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
                    <InputLabel htmlFor="name">Address 1</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Phone1..."
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Address 2</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Print Us..."
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
                    <InputLabel htmlFor="name">City</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Phone1..."
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">State</InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Print Us..."
                      fullWidth
                      size="small"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Parent Type</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="small"
                        defaultValue={0}
                        {...register("type")}
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
            <Stack>
              <Grid container spacing={2} style={{ marginTop: "15px" }}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Alternate Number</InputLabel>
                    <FormControl fullWidth>
                      <OutlinedInput
                        type="text"
                        id="name"
                        placeholder="Contact Name..."
                        fullWidth
                        size="small"
                        {...register("phone2")}
                      />
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack style={{ marginTop: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">
                      Contact Name <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Contact Name..."
                      fullWidth
                      size="small"
                      {...register("contactName", { required: true })}
                    />
                    {errors.contactName && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">
                      Print Us <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Print Us..."
                      fullWidth
                      size="small"
                      {...register("printUs", { required: true })}
                    />
                    {errors.printUs && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </TabPanel>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ width: 150 }}
            autoFocus
            disabled={btnDisabled}
          >
            <b>Create</b>
            <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
              {spinner === true ? <CircularProgress color="inherit" /> : ""}
            </span>
          </Button>
        </DialogActions>
      </form>
      <ToastContainer />
    </Box>
  );
}
