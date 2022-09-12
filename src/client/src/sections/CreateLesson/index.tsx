import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material';
import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCreateLessonMutation, Viewer } from '../../graphql/generated';
import { categories, DisplayError, DisplaySuccess } from '../../lib/utils';
import { Navigate } from 'react-router-dom';
// import { Cloudinary } from '@cloudinary/url-gen';
// import 'dotenv/config';

interface Props {
  viewer: Viewer
}

const initialData = {
  id: "",
  title: "",
  meta: "",
  category: [""],
  startDate: "",
  endDate: "",
  video: "",
  image: ""
}

export const CreateLesson = ({ viewer }: Props) => {
  const [formData, setFormData] = useState(initialData);
  const [checked, setChecked] = useState(
    new Array(categories.length).fill(false)
  );
  const [categorizer, setCategorizer] = useState<string[]>([]);
  const [errorState, setError] = useState<boolean>(false);
  const [buttonError, setButtonError] = useState<boolean>(false);

  useEffect(() => {
    // console.log("Categorizer: ", categorizer);
    // console.log("Checked: ", checked);
    if (!formData.title.length && !formData.endDate.length) {
      setButtonError(true);
    } else {
      setButtonError(false);
    }
  }, [formData, categorizer, checked])

  const [createLesson, { 
    data: Mutation,
    loading: createLessonLoading, 
    error: createLessonError 
  }] = useCreateLessonMutation({
    variables: {
      input: formData
    }
  });
  
  // TODO - Restrict Video Uploads by File Type and Size
  const [videoUpload, setVideoUpload] = useState<File | undefined>();

  const handleVideoUpload = (files: FileList | null) => {

    const file = files ? files[0] : null;
    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "drewpager";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach";

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId: string = new Date().toString();

    handleVideoUpload(file!);

    function handleVideoUpload(file: File) {
      var size = file ? file.size : 0;
      var sliceSize = 10000000;
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
      const regex = /\s+|\W+/gm;
      const publicId = formData.title.replaceAll(regex, "-");
      console.log("PublicID: ", publicId)
      console.log("start ", start);
      console.log("end", end);

      var formdata = new FormData();
      console.log(XUniqueUploadId);

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("chunk_size", "6000000");
      formdata.append("public_id", publicId);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        console.log("Cloudinary Response: ", this.responseText);
        const res = JSON.parse(this.response); 
        console.log("URL: ", res.secure_url)
        formData.video = res.secure_url;
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

    console.log("Form Data: ", formData)
  }

  const handleImageUpload = (files: FileList | null) => {

    const file = files ? files[0] : null;
    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "drewpager";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach";

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId: string = new Date().toString();

    handleImageUpload(file!);

    function handleImageUpload(file: File) {
      var size = file ? file.size : 0;
      var sliceSize = 10000000;
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
      formdata.append("chunk_size", "6000000");
      formdata.append("public_id", file!.name);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        const res = JSON.parse(this.response); 
        formData.image = res.url;
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
      [name]: value
    });

     if (!e.target.value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleCheck = (position: number, value: { name: string }) => {
    const updatedCheckedState = checked.map((item, index) => index === position ? !item : item)
    setChecked(updatedCheckedState);

    const name = value.name;
    
    const indy = categorizer.indexOf(name);
    if (indy === -1) {
      setCategorizer([...categorizer, name])
    } else {
      setCategorizer(categorizer.filter((categorizer) => categorizer !== name))
    }

    setFormData({
      ...formData,
      category: [...categorizer]
    })
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData({
      ...formData,
      ...categorizer,
      ...videoUpload
    })

    if (formData.video && formData.category) {
      createLesson({
        variables: {
          input: formData
        }
      });
    }
  }

  if (createLessonError) {
    return (
      <>
        <DisplayError title={`${createLessonError}`} />
        {console.log(formData)}
      </>
    )
  }

  if (Mutation && Mutation.createLesson) {
    const { id } = Mutation.createLesson;
    return (
      <>
        <Navigate to={`/lesson/${id}`} />
        <DisplaySuccess title="Success!" />
      </>
    )
  }

  if (createLessonLoading) {
    return (
      <Box sx={{ margin: 50 }}>
        <CircularProgress color="primary" />
      </Box>
    )
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
            error={errorState}
          /><br />
          <TextField type="file" variant='outlined' helperText="Video or Lecture" sx={{ width: "45%", marginTop: 1 }} name="video" onChange={(e: ChangeEvent<HTMLInputElement>) => handleVideoUpload(e.target.files)} required /><br />
          <TextField type="file" variant='outlined' helperText="Image" sx={{ width: "45%", marginTop: 1 }} name="image" onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageUpload(e.target.files)} required /><br />
          <TextField variant="outlined" label="Description" multiline rows={3} helperText="Min Character Count of 160" sx={{ width: "45%", marginTop: 1 }} value={formData.meta} name="meta" onChange={handleInputChange} required />
          <FormGroup sx={{ marginTop: 1 }}>
            <Typography variant="h5">Category</Typography>
            <Typography variant="body2" style={{color: "gray"}}>Select All That Apply</Typography>
            {categories.map((val, index) => (
              <FormControlLabel control={<Checkbox />} onChange={() => handleCheck(index, val)} checked={checked[index]} label={val.name} key={index} /> 
            ))}
          </FormGroup>
          <TextField variant='outlined' label="Start Date or Year" helperText="YYYY-MM-DD or -33,000 for 33,000 BCE" sx={{ width: "45%", marginTop: 1 }} value={formData.startDate} name="startDate" onChange={handleInputChange} required /><br />
          <TextField variant='outlined' label="End Date or Year" helperText="YYYY-MM-DD or 1052" sx={{ width: "45%", marginTop: 1 }} value={formData.endDate} name="endDate" onChange={handleInputChange} required /><br />
          <Button sx={{ marginTop: 2 }} disabled={buttonError} variant='contained' color='primary' type="submit">Submit</Button>
        </form>
      </Box>
    )
  }
}