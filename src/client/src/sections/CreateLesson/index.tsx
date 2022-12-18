import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, CircularProgress, InputAdornment } from '@mui/material';
import React, { ChangeEvent, useEffect, useState, MouseEvent } from 'react';
import { FieldArray, Formik, getIn, FieldProps, Field, Form  } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateLessonMutation, Viewer } from '../../graphql/generated';
import { categories, DisplayError, DisplaySuccess } from '../../lib/utils';
import { Navigate } from 'react-router-dom';
import theme from '../../theme';
import './createLesson.scss';
import { render } from 'react-dom';
// import { Cloudinary } from '@cloudinary/url-gen';
// import 'dotenv/config';

interface Props {
  viewer: Viewer
}

const initialData = {
  title: "",
  meta: "",
  category: [],
  startDate: "",
  endDate: "",
  video: "",
  image: ""
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  meta: yup
    .string()
    .min(10, 'Meta should be 10 characters')
    .required('Meta description is required'),
  category: yup
    .array().of(
      yup.string()
    ),
  startDate: yup
    .string()
    .required('Please add a Start Date'),
  endDate: yup
    .string()
    .required('Please add an End Date'),
  video: yup.string(),
  image: yup.string(),
});

export const CreateLesson = ({ viewer }: Props) => {
  const [formData, setFormData] = useState(initialData);
  const [checked, setChecked] = useState(
    new Array(categories.length).fill(false)
  );
  const [categorizer, setCategorizer] = useState<string[]>([]);
  const [errorState, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageProgress, setImageProgress] = useState<number>(0);
  const navigate = useNavigate();

  const [createLesson, { loading, error }] = useCreateLessonMutation({
    variables: {
      input: {
        title: "",
        meta: "",
        category: [],
        startDate: "",
        endDate: "",
        video: "",
        image: ""
      }
    }
  })
  
  // TODO - Restrict Video Uploads by File Type and Size

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
          setProgress(100)
        }
        const s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
          
          setProgress((end/size)*100)
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
        console.log("Here it is: ", formData.video)
        setFormData({ ...formData, video: formData.video })
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
          setImageProgress(100)
        }
        const s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);

          setImageProgress((end/size)*100)
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
        console.log(formData.image)
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

  const LabelProgress = ({ progress }: { progress: number }) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress color="primary" variant='determinate' value={progress}/>
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 2,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right',
            }}
          >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
      </Box>
    )
  }

  const checkers = ({ field }: FieldProps) => {
    return (
      <Field type="checkbox" {...field} />
    )
  }

  // const handleCheck = (position: number, value: { name: string }) => {
  //   const updatedCheckedState = checked.map((item, index) => index === position ? !item : item)
  //   setChecked(updatedCheckedState);

  //   const name = value.name;
    
  //   const indy = categorizer.indexOf(name);
  //   if (indy === -1) {
  //     setCategorizer([...categorizer, name])
  //   } else {
  //     setCategorizer(categorizer.filter((categorizer) => categorizer !== name))
  //   }

  //   setFormData({
  //     ...formData,
  //     category: [...categorizer]
  //   })
  // }

  if (!viewer.id || !viewer.hasPayment) {
    return (
      <Box className='createLesson--error'>
        <Typography variant="h3">You Must Be <Link style={{ textDecoration: 'none', color: "#F67B50" }} to="/login">Logged In</Link> Using an Active Account.</Typography>
        <Typography variant="h4">We require content creators to be paying users to avoid fraudulent content.</Typography>
      </Box>
    )
  } else {
    return (
      <Box className='createLesson--page'>
        <Box className='createLesson--form'>
        <h2>Create a New Lesson</h2>
        <Formik
          initialValues={{
            title: "",
            meta: "",
            category: [],
            startDate: "",
            endDate: "",
            video: "",
            image: ""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await createLesson({
              variables: {
                input: values
              }
            });

            navigate(`../user/${viewer.id}`, { replace: true })
          }}
        >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <TextField 
            variant="outlined" 
            label="Title" 
            helperText="Max Character Count of 160" 
            sx={{ width: "45%" }} 
            value={values.title} 
            name="title"
            onChange={handleChange}
            required
            error={errorState}
          /><br />
          <TextField 
            type="file" 
            variant='outlined'
            helperText="Video or Lecture" 
            sx={{ width: "45%", marginTop: 1 }} 
            name="video"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleVideoUpload(e.target.files)} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LabelProgress progress={progress} />
                </InputAdornment>
              )
            }}
            value={values.video} 
            required 
          /><br />
          <TextField 
            type="file" 
            variant='outlined' 
            helperText="Image" 
            sx={{ width: "45%", marginTop: 1 }} 
            name="image"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageUpload(e.target.files)} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LabelProgress progress={imageProgress} />
                </InputAdornment>
              )
            }}
            value={values.image}
            required 
            /><br />
          <TextField variant="outlined" label="Description" multiline rows={3} helperText="Min Character Count of 160" sx={{ width: "45%", marginTop: 1 }} value={values.meta} name="meta" onChange={handleChange} required />
          <FormGroup sx={{ marginTop: 1 }}>
            <Typography variant="h5">Category</Typography>
            <Typography variant="body2" style={{color: "gray"}}>Select All That Apply</Typography>
            <FieldArray name="category">
              {({ insert, remove, push }) => (
                // TODO: Render categories
                <div>
                  {categories.map((cat, index) => (
                    <label key={index}>
                      <Field type="checkbox" name={`category`} value={cat.name} />
                      {cat.name}
                    </label>
                  ))}
                </div>
              )}
            </FieldArray>
            {/* {categories.map((val, index) => (
              <FormControlLabel control={<Checkbox />} onChange={() => handleCheck(index, val)} checked={checked[index]} label={val.name} key={index} /> 
            ))} */}
          </FormGroup>
          <TextField variant='outlined' label="Start Date or Year" helperText="YYYY-MM-DD or -33,000 for 33,000 BCE" sx={{ width: "45%", marginTop: 1 }} value={values.startDate} name="startDate" onChange={handleChange} required /><br />
          <TextField variant='outlined' label="End Date or Year" helperText="YYYY-MM-DD or 1052" sx={{ width: "45%", marginTop: 1 }} value={values.endDate} name="endDate" onChange={handleChange} required /><br />
          <Button sx={{ marginTop: 2 }} disabled={!values.title || !values.endDate} variant='contained' color='primary' type="submit">Submit</Button>
          {console.log(values)}
        </Form>
        )}
        </Formik>
      </Box>
      </Box>
    )
  }
}