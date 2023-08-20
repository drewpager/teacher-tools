import React, { useState } from 'react';
import { Typography, Button, Box, Divider, TextField, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

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

  return (
    <Box className='signup-form'>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
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
            {touched.password && !errors.password ? (
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
            ) : null}
            <Button variant="contained" type='submit' disabled={errors.confirmPassword ? true : false}>Sign Up</Button>
          </Form>
        )}
        {/* <TextField className="signup-input" id="outlined-basic" label="Email" variant="outlined" />
        <TextField className="signup-input" id="outlined-basic" label="Password" variant="outlined" onChange={() => setPasswordConfirm(true)} />
        {passwordConfirm ? <TextField className="signup-input" id="outlined-basic" label="Confirm Password" variant="outlined" /> : null} */}
      </Formik>
    </Box>
  )
}