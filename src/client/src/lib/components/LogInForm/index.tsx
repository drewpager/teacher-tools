import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Field, Form, FormikErrors, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLogInMutation, useAllUsersQuery } from '../../../graphql/generated';
import { useNavigate } from 'react-router-dom';

import './logInForm.scss';

interface Values {
  email: string;
  password: string;
}

const MuiInput = ({ field, form, ...props }: any) => {
  return <TextField className="signup-input" variant="outlined" {...field} {...props} />;
}

export const LogInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailData, setEmailData] = useState<string[]>([]);
  const navigation = useNavigate();

  const { data, loading, error } = useAllUsersQuery({
    variables: {
      page: 1,
      limit: 1000
    }
  })

  useEffect(() => {
    const allEmails = data?.allUsers?.result?.map((user) => user.contact)
    if (allEmails?.length) {
      setEmailData(allEmails)
    }
  }, [data])

  const SignupSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .oneOf([...emailData], 'Email not found, sign up instead.')
      .required('Enter Your Email Address.'),
    password: Yup.string()
      .min(8, 'Your Password Would Be 8 Characters or longer!')
      .required('Enter Your Password.')
  });

  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] = useLogInMutation({
    variables: {
      input: {
        email: "",
        password: ""
      }
    }
  })

  if (logInLoading) {
    console.log("loading")
  }

  if (logInError) {
    console.log("Error message: ", logInError.message);
  }

  if (logInData) {
    navigation(`/user/${logInData.logIn.id}`);
    window.location.reload();
  }

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
            <Button variant="contained" type='submit' disabled={errors.password || errors.email ? true : false}>Login {logInLoading && <CircularProgress sx={{ color: "red" }} size="small" />}</Button>
            {logInError && <Typography variant='h6' sx={{ color: "red" }}>{logInError.message}</Typography>}
          </Form>
        )}
      </Formik>
    </Box>
  )
}