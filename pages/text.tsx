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
}
interface OtherProps {
  message: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <Grid item xs={12} md={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="name">
            Activity Name <span className="err_str">*</span>
          </InputLabel>
          <Field
            type="text"
            name="name"
            size="small"
            placeholder="Activity Name..."
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
            {errors.name && touched.name && errors.name}
          </span>
        </Stack>
      </Grid>
      {touched.name && errors.name && <div>{errors.name}</div>}

      <Field type="text" name="price" />
      {touched.price && errors.price && <div>{errors.price}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialname?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: props.initialname || "",
      price: props.initialname || "",
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.price) {
      errors.price = "Required";
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  },
})(InnerForm);

// Use <MyForm /> wherevs
const Basic = () => (
  <div>
    <MyForm message="Sign up" />
  </div>
);

export default Basic;
