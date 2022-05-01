import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Viewer } from '../../graphql/generated';
import { DisplayError, categories } from '../../lib/utils';

interface Props {
  viewer: Viewer
}

const initialData = {
  title: "",
  meta: "",
  categories: [""],
  startDate: 0,
  endDate: 0,
  video: ""
}

export const CreateLesson = ({ viewer }: Props) => {
  const [formData, setFormData] = useState(initialData);
  const [checked, setChecked] = useState(
    new Array(categories.length).fill(false)
  );
  const [category, setCategory] = useState<string[]>([]);
  
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheck = (position: number, value: { name: string }) => {
    const updatedCheckedState = checked.map((item, index) => index === position ? !item : item)
    setChecked(updatedCheckedState);

    const name = value.name;
    
    const indy = category.indexOf(name);
    if (indy === -1) {
      setCategory([...category, name])
    } else {
      setCategory(category.filter((category) => category !== name))
    }
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(category);

    setFormData({
      ...formData,
      ...category
    })

    console.log(formData);
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
        <form onSubmit={handleSubmit}>
          <TextField 
            variant="outlined" 
            label="Title" 
            helperText="Max Character Count of 160" 
            sx={{ width: "45%" }} 
            value={formData.title} 
            name="title" 
            onChange={handleInputChange} 
            required
          /><br />
          <TextField variant="outlined" label="Description" multiline rows={3} helperText="Min Character Count of 160" sx={{ width: "45%", marginTop: 1 }} value={formData.meta} name="meta" onChange={handleInputChange} />
          <FormGroup sx={{ marginTop: 1 }} onChange={handleInputChange}>
            <Typography variant="h5">Categories</Typography>
            <Typography variant="body2" style={{color: "gray"}}>Select All That Apply</Typography>
            {categories.map((value, index) => (
              <FormControlLabel control={<Checkbox />} label={value.name} onChange={() => handleCheck(index, value)} checked={checked[index]} key={index} name="categories" /> 
            ))}
          </FormGroup>
          <TextField type="number | date" variant='outlined' label="Start Date" helperText="-33,000 for 33,000 BCE" sx={{ width: "45%", marginTop: 1 }} value={formData.startDate} name="startDate" onChange={handleInputChange} /><br />
          <TextField type="number | date" variant='outlined' label="End Date" helperText="1052 or 4/29/2022" sx={{ width: "45%", marginTop: 1 }} value={formData.endDate} name="endDate" onChange={handleInputChange} /><br />
          <TextField type="file" variant='outlined' helperText="Video or Lecture" sx={{ width: "45%", marginTop: 1 }} value={formData.video} name="video" onChange={handleInputChange} /><br />
          <Button sx={{ marginTop: 2 }} variant='contained' color='primary' type="submit">Submit</Button>
        </form>
      </Box>
    )
  }
}