import {
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
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
// Shape of form values
interface FormValues {
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
    <Container component="main" style={{ backgroundColor: "white" }}>
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name">
                Activity Name <span className="err_str">*</span>
              </InputLabel>
              <Field type="text" name="name" placeholder="Activity Name..." />
            </Stack>
            <Stack>
              <span
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {errors.name && touched.name && errors.name}
              </span>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="price">
                Activity Price <span className="err_str">*</span>
              </InputLabel>
              <Field
                fullWidth
                id="price"
                type="price"
                name="price"
                size="small"
                placeholder="Price..."
              />
            </Stack>
            <Stack>
              <span
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {errors.price && touched.price && errors.price}
              </span>
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
            <Stack>
              <span
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {errors.name && touched.name && errors.name}
              </span>
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
                <Stack>
                  <span
                    style={{
                      color: "red",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.name && touched.name && errors.name}
                  </span>
                </Stack>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="enddate">
                End Date <span className="err_str">*</span>
              </InputLabel>
              <Field
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
              <Field
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
              <Field minRows={5} />
            </Stack>
            <Stack>
              <span
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontWeight: "bold",
                }}
              >
                {errors.description &&
                  touched.description &&
                  errors.description}
              </span>
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
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialname?: string;
  initialprice: string;
  initialdescription: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  //Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: props.initialname || "",
      price: props.initialprice || "",
      type: "",
      status: "",
      startdate: "",
      enddate: "",
      shortdescription: "",
      description: props.initialdescription || "",
      image: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Name Feild Required **";
    }
    if (!values.price) {
      errors.price = "Price Feild Required **";
    }
    if (!values.type) {
      errors.type = "Type Feild Required **";
    }
    if (!values.status) {
      errors.status = "Status Feild Required **";
    }
    if (!values.startdate) {
      errors.startdate = "Start date Feild Required **";
    }
    if (!values.enddate) {
      errors.enddate = "End date Feild Required **";
    }
    if (!values.shortdescription) {
      errors.shortdescription = "Short Desc Feild Required **";
    }
    if (!values.description) {
      errors.description = "Description Feild Required **";
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
