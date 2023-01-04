import {
  Button,
  Container,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  TextareaAutosize,
} from "@mui/material";

import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

interface OtherProps {
  message: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message } = props;
  return (
    <>
      <Container
        maxWidth="sm"
        component="main"
        style={{ backgroundColor: "white" }}
      >
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">
                  Activity Name <span className="err_str">*</span>
                </InputLabel>
                <OutlinedInput
                  id="name"
                  type="name"
                  name="name"
                  placeholder="Activity Name..."
                  fullWidth
                />
              </Stack>
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
                  placeholder="Price..."
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="type">
                  Type <span className="err_str">*</span>
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="type"
                  type="type"
                  name="type"
                  placeholder="Type.."
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="status">
                  Status <span className="err_str">*</span>
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="status"
                  name="status"
                  placeholder="Status..."
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
                  id="startdate"
                  type="startdate"
                  name="startdate"
                  placeholder="startdate"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="enddate">
                  End Date <span className="err_str">*</span>
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  id="enddate"
                  name="enddate"
                  placeholder="enddate."
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
                Add Activity
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
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
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || "",
      password: "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Required";
    }
    return errors;
  },

  handleSubmit: (values, e) => {
    // do submitting things
  },
})(InnerForm);

// Use <MyForm /> wherevs
const ActivityDetails = () => (
  <div>
    <MyForm message="Sign up" />
  </div>
);

export default ActivityDetails;
