import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Tab,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("1");

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          New Customer
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  //onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="BASIC" value="1" />
                  <Tab label="ADDRESS" value="2" />
                  <Tab label="OPTIONS" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Grid>
                  <form>
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
                              placeholder="Activity Name..."
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
                    <Stack>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">
                              Customer <span className="err_str">*</span>
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
                              Customer <span className="err_str">*</span>
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
                    <Stack>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="name">
                              Customer <span className="err_str">*</span>
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
                              Customer <span className="err_str">*</span>
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
                  </form>
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                {" "}
                <Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">
                          Customer <span className="err_str">*</span>
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
                          Customer <span className="err_str">*</span>
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
                <Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">
                          Customer <span className="err_str">*</span>
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
                          Customer <span className="err_str">*</span>
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
                <Stack>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">
                          Customer <span className="err_str">*</span>
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
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">
                          Customer <span className="err_str">*</span>
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
                    <Grid item xs={12} md={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">
                          Customer <span className="err_str">*</span>
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
              </TabPanel>
              <TabPanel value="3">OPTIONS</TabPanel>
            </TabContext>
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Grid item xs={12}>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: 150 }}
              //disabled={btnDisabled}
            >
              <b>Create</b>
              <span style={{ fontSize: "2px", paddingLeft: "10px" }}>
                {/* {spinner === true ? (
                                <CircularProgress color="inherit" />
                              ) : (
                                ""
                              )} */}
              </span>
            </Button>
          </Grid>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
