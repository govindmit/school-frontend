import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

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

export default function AddNewCustomer() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Basic" {...a11yProps(0)} />
          <Tab label="Options" {...a11yProps(1)} />
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
                  />
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
                    Account <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Account..."
                    fullWidth
                    size="small"
                  />
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
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Stack style={{ marginTop: "15px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">
                    Status <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Activity Name..."
                    fullWidth
                    size="small"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">
                    Alternate Email <span className="err_str">*</span>
                  </InputLabel>
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
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">
                    Customer Type <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="name"
                    placeholder="Customer Name..."
                    fullWidth
                    size="small"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          <Stack style={{ marginTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Belongs to a parent customer"
                  />
                </FormGroup>
                <Stack spacing={1}>
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
                    placeholder="Activity Name..."
                    fullWidth
                    size="small"
                  />
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
                    placeholder="Activity Name..."
                    fullWidth
                    size="small"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </TabPanel>
      <DialogActions>
        <Button variant="contained" size="small" sx={{ width: 150 }} autoFocus>
          <b>Create</b>
        </Button>
      </DialogActions>
    </Box>
  );
}
