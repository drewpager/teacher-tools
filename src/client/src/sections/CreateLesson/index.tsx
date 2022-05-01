import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Viewer } from '../../graphql/generated';
import { categories } from '../../lib/utils';
// import { Cloudinary } from '@cloudinary/url-gen';
// import 'dotenv/config';

interface Props {
  viewer: Viewer
}

const initialData = {
  title: "",
  meta: "",
  categories: [""],
  startDate: 0,
  endDate: 0,
  video: File
}

export const CreateLesson = ({ viewer }: Props) => {
  const [formData, setFormData] = useState(initialData);
  const [checked, setChecked] = useState(
    new Array(categories.length).fill(false)
  );
  const [category, setCategory] = useState<string[]>([]);
  
  // TODO - Restrict Video Uploads by File Type and Size
  const [videoUpload, setVideoUpload] = useState<File | undefined | null>();

  // const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setVideoUpload(e.target.files[0]);
    
  //     const uploadSize = e.target.files ? e.target.files[0].size / 1000000 : 0;

  //     if (uploadSize > 100) {
  //       setVideoUpload(undefined);
  //       console.log("Video Upload 2: ", videoUpload);
  //       return <DisplayError title="Please Confine Videos to 1GB or smaller" />
  //     }
  //   }
  // }

  const handleVideoUpload = async (file: File) => {
    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "drewpager";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach";
    console.log("Cloud Name: ", YOUR_CLOUD_NAME);

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId: string = new Date().toString();

    handleVideoUpload(file);

    function handleVideoUpload(file: File) {
      var size = file ? file.size : 0;
      var sliceSize = 20000000;
      var start = 0;

      setTimeout(loop, 3);

      function loop() {
        let end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        const s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
        }
      }
    }

    function send(piece: any, start: number, end: number, size: number) {
      console.log("start ", start);
      console.log("end", end);

      var formdata = new FormData();
      console.log(XUniqueUploadId);

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("public_id", file.name);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
      };

      xhr.send(formdata);
    }

    function slice(file: File, start: number, end: number) {
      const slice = file
        ? file.slice
        : noop;

      return slice.bind(file)(start, end);
    }

    function noop() {}
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

    handleVideoUpload(new File([formData.video.prototype], formData.title, { type: "video" }));
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
          <TextField type="file" variant='outlined' helperText="Video or Lecture" sx={{ width: "45%", marginTop: 1 }} name="video" onChange={handleInputChange} /><br />
          <Button sx={{ marginTop: 2 }} variant='contained' color='primary' type="submit">Submit</Button>
        </form>
      </Box>
    )
  }
}