import React, { useState } from 'react';
import { Typography, Button, Box, TextField, IconButton, CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useLogInMutation, useAllUsersQuery } from '../../../graphql/generated';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sendWelcome } from '../../utils/sendWelcome';

import './signUpForm.scss';

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}


const MuiInput = ({ field, form, ...props }: any) => {
  return <TextField className="signup-input" variant="outlined" {...field} {...props} />;
}

const SignupSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Valid email required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or longer!')
    .required('Password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigation = useNavigate();

  const { data: allUsersData, loading: allUsersLoading, error: allUsersError } = useAllUsersQuery({
    variables: {
      limit: 1000,
      page: 1
    }
  });

  let users: string[] = [];
  allUsersData?.allUsers.result.map(user => users.push(user.contact))

  const [logInMutation, { data, loading, error }] = useLogInMutation({
    variables: {
      input: {
        email: "",
        password: ""
      }
    }
  })

  if (loading) {
    console.log('loading sign up');
  }

  if (error) {
    console.log(error.message)
  }

  if (data) {
    sendWelcome({ id: `${data.logIn.id}`, email: `${data.logIn.contact}` })
    navigation(`/user/${data.logIn.id}`)
    window.location.reload();
    // navigation(`/catalog/`)
  }

  return (
    <Box className='signup-form'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values: Values) => {
          await logInMutation({
            variables: {
              input: {
                email: values.email,
                password: values.password
              }
            }
          })
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            {/* <label htmlFor="email">Email</label> */}
            <Field id="email" name="email" label="Email" component={MuiInput} />
            {errors.email && touched.email ? (
              <Typography variant='h6' sx={{ color: "red" }}>{errors.email}</Typography>
            ) : users.includes(values.email) ? (
              <Typography variant='h6' sx={{ color: "red" }}>Email already active, try <Link to="/login" style={{ textDecoration: "underline", color: "red" }}>logging in</Link> instead.</Typography>
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
            <>
              <Field
                component={MuiInput}
                id="confirm-password"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: <IconButton disableFocusRipple disableTouchRipple disableRipple onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword)
                  }}>
                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                }}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Typography variant='h6' sx={{ color: "red" }}>{errors.confirmPassword}</Typography>
              ) : null}
            </>
            <Button variant="contained" type='submit' disabled={errors.confirmPassword ? true : false}>Sign Up {loading && <CircularProgress sx={{ color: "red" }} size="small" />}</Button>
            {error && <Typography variant='h6' sx={{ color: "red" }}>{error.message}</Typography>}
          </Form>
        )}
      </Formik>
    </Box>
  )
}