import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import MiniDrawer from "./sidebar";
// Shape of form values
interface FormValues {
  email: string;
  password: string;
  name: string;
  price: number;
  type: string;
  status: string;
  enddate: string;
  startdate: string;
  image: string;
  description: string;
  shortdescription: string;
}
interface OtherProps {
  message: string;
}
// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container component="main" style={{ backgroundColor: "white" }}>
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">
                    Activity Name <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="text"
                    id="name"
                    name="name"
                    size="small"
                    placeholder="Activity Name..."
                    fullWidth
                  />
                </Stack>
                {touched.email && errors.email && <div>{errors.email}</div>}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="price">
                    Activity Price <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="price"
                    type="price"
                    name="price"
                    size="small"
                    placeholder="Price..."
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="type">
                    Type <span className="err_str">*</span>
                  </InputLabel>
                  <FormControl>
                    <Select
                      size="small"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="Free">Free</MenuItem>
                      <MenuItem value="Paid">Paid</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="status">
                    Status <span className="err_str">*</span>
                  </InputLabel>
                  <FormControl>
                    <Select
                      size="small"
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Archive">Archive</MenuItem>
                      <MenuItem value="Draft">Draft</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="enddate">
                    End Date <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="date"
                    id="enddate"
                    name="enddate"
                    placeholder="enddate."
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="startdate">
                    Start Date <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    size="small"
                    type="date"
                    name="startdate"
                    id="startdate"
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image">
                    Upload Image <span className="err_str">*</span>
                  </InputLabel>
                  <OutlinedInput
                    type="file"
                    size="small"
                    fullWidth
                    id="image"
                    name="image"
                    placeholder="image."
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="shortdescription">
                    Short Description <span className="err_str">*</span>
                  </InputLabel>
                  <TextareaAutosize minRows={3} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="description">
                    Description <span className="err_str">*</span>
                  </InputLabel>
                  <TextareaAutosize minRows={5} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Container>
      </Box>
    </Box>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  // mapPropsToValues: (props) => {
  //   return {
  //     email: props.initialEmail || "",
  //     password: "",
  //   };
  // },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

// Use <MyForm /> wherevs
const Add = () => {
  return (
    <>
      <MyForm message="Sign up" />
    </>
  );
};
export default Add;
