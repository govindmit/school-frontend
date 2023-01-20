import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { api_url, auth_token } from "../api/hello";

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
  name: string;
  email1: string;
  email2: string;
  number: number;
  contactName: string;
  printUs: string;
};

export default function AddNewCustomer() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [Check, setCheck] = React.useState(false);
  if (Check === true) {
    var hideshowstyle = {
      display: "block",
    };
  } else {
    var hideshowstyle = {
      display: "none",
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("hii");
    console.log(data);
  };

  React.useEffect(() => {
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
                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">
                      Customer <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Customer Name..."
                      fullWidth
                      size="small"
                      {...register("name", {
                        required: true,
                      })}
                    />
                    {errors.name && (
                      <span style={style}>Field is Required **</span>
                    )}
                  </Stack>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="This is an individual"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Stack>
            <Stack style={{ marginTop: "8px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">
                      Phone Number <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Phone..."
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
                    <InputLabel htmlFor="name">
                      Email <span className="err_str">*</span>
                    </InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Email..."
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
              </Grid>
            </Stack>
            <Stack style={{ marginTop: "15px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Status</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={1}
                        size="small"
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>InActive</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="name">Alternate Email</InputLabel>
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
                    <InputLabel htmlFor="name">Customer Type</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="small"
                        defaultValue={0}
                      >
                        <MenuItem value={0}>Individual</MenuItem>
                        <MenuItem value={1}>Impetus</MenuItem>
                        <MenuItem value={2}>Infosys</MenuItem>
                        <MenuItem value={3}>Wiprow</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack style={{ marginTop: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => setCheck(e.target.checked)}
                        />
                      }
                      label="Belongs to a parent customer"
                    />
                  </FormGroup>
                  <Stack spacing={1} style={hideshowstyle}>
                    <InputLabel htmlFor="name"></InputLabel>
                    <OutlinedInput
                      type="text"
                      id="name"
                      placeholder="Activity Name..."
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
          >
            <b>Create</b>
          </Button>
        </DialogActions>
      </form>
    </Box>
  );
}
