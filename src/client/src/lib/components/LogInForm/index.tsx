import React, { useState } from 'react';
import { Typography, Button, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Field, Form, FormikHelpers, replace } from 'formik';
import * as Yup from 'yup';
import { useLogInMutation } from '../../../graphql/generated';
import { useNavigate } from 'react-router-dom';

import './logInForm.scss';
import { refresh } from '@cloudinary/url-gen/qualifiers/artisticFilter';

interface Values {
  email: string;
  password: string;
}

const MuiInput = ({ field, form, ...props }: any) => {
  return <TextField className="signup-input" variant="outlined" {...field} {...props} />;
}

const SignupSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Enter Your Email Address.'),
  password: Yup.string()
    .min(8, 'Your Password Would Be 8 Characters or longer!')
    .required('Enter Your Password.')
});

export const LogInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const navigation = useNavigate();

  const [logIn, { data: logInData, loading, error }] = useLogInMutation({
    variables: {
      input: {
        email: "",
        password: ""
      }
    }
  })

  return (
    <Box className='signup-form'>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values) => {
          logIn({
            variables: {
              input: {
                email: values.email,
                password: values.password
              }
            }
          })
          if (loading) {
            console.log("loading")
          }

          if (error) {
            setSubmissionError(error.message);
          }

          if (logInData) {
            navigation(`/user/${logInData.logIn.id}`);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {/* <label htmlFor="email">Email</label> */}
            <Field id="email" name="email" label="Email" component={MuiInput} />
            {errors.email && touched.email ? (
              <Typography variant='h6' sx={{ color: "red" }}>{errors.email}</Typography>
            ) : null}
            <Field
              component={MuiInput}
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: <IconButton disableFocusRipple disableTouchRipple disableRipple onClick={() => {
                  setShowPassword(!showPassword)
                }}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              }}
            />
            {errors.password && touched.password ? (
              <Typography variant='h6' sx={{ color: "red" }}>{errors.password}</Typography>
            ) : null}
            <Button variant="contained" type='submit' disabled={errors.password ? true : false}>Login {loading && <CircularProgress sx={{ color: "red" }} />}</Button>
            {!!submissionError ? (
              <Typography variant='h6' sx={{ color: "red" }}>{submissionError}</Typography>
            ) : null}
          </Form>
        )}
      </Formik>
    </Box>
  )
}