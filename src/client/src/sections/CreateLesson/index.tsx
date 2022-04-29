import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Viewer } from '../../graphql/generated';
import { DisplayError } from '../../lib/utils';

interface Props {
  viewer: Viewer
}

export const CreateLesson = ({ viewer }: Props) => {
  // TODO - Restrict Video Uploads by File Type and Size
  const [videoUpload, setVideoUpload] = useState<File | undefined | null>();

  const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoUpload(e.target.files[0]);
    
      const uploadSize = e.target.files ? e.target.files[0].size / 1000000 : 0;

      if (uploadSize > 100) {
        setVideoUpload(undefined);
        console.log("Video Upload 2: ", videoUpload);
        return <DisplayError title="Please Confine Videos to 1GB or smaller" />
      }
    }
  }

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
        <h2>Create a New Lesson</h2>
        <TextField variant="outlined" label="Title" helperText="Max Character Count of 160" sx={{ width: "45%" }}/><br />
        <TextField variant='outlined' label="Description" multiline rows={3} helperText="Min Character Count of 160" sx={{ width: "45%", marginTop: 1 }} />
        <FormGroup sx={{ marginTop: 1 }}>
          <Typography variant="h5">Categories</Typography>
          <Typography variant="body2" style={{color: "gray"}}>Select All That Apply</Typography>
          <FormControlLabel control={<Checkbox />} label="History" />
          <FormControlLabel control={<Checkbox />} label="American History" />
          <FormControlLabel control={<Checkbox />} label="Military History" />
        </FormGroup>
        <TextField type="number | date" variant='outlined' label="Start Date" helperText="-33,000 for 33,000 BCE" sx={{ width: "45%", marginTop: 1 }} /><br />
        <TextField type="number | date" variant='outlined' label="End Date" helperText="1052 or 4/29/2022" sx={{ width: "45%", marginTop: 1 }} /><br />
        <TextField type="file" onChange={handleVideoUpload} variant='outlined' helperText="Video or Lecture" sx={{ width: "45%", marginTop: 1 }} /><br />
        <Button sx={{ marginTop: 2 }} variant='contained' color='primary'>Submit</Button>
      </Box>
    )
  }
}