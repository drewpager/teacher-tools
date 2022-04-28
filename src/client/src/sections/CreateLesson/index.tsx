import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Viewer } from '../../graphql/generated';

interface Props {
  viewer: Viewer
}

export const CreateLesson = ({ viewer }: Props) => {
  if (!viewer.id || !viewer.hasPayment) {
    return (
      <Box sx={{ margin: 5 }}>
        <Typography variant="h2">You Must Be <Link to="/login">Logged In</Link> Using an Active Account.</Typography>
        <Typography variant="h4">We require content creators to be paying users to avoid fraudulent content.</Typography>
      </Box>
    )
  } else {
    return (
      <Box sx={{ margin: 5 }}>
        <h2>Create a New Lesson!</h2>
        <TextField variant="outlined" label="Title" helperText="Max Character Count of 160" sx={{ width: "45%" }}/><br />
        <TextField variant='outlined' label="Description" multiline rows={3} helperText="Min Character Count of 160" sx={{ width: "45%", marginTop: 1 }} />
        <FormGroup sx={{ marginTop: 1 }}>
          <Typography variant="h5">Categories</Typography>
          <Typography variant="body2" style={{color: "gray"}}>Select All That Apply</Typography>
          <FormControlLabel control={<Checkbox />} label="History" />
          <FormControlLabel control={<Checkbox />} label="American History" />
        </FormGroup>
      </Box>
    )
  }
}