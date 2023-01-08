import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, CircularProgress, InputAdornment, Input } from '@mui/material';
import { VideoLibrary, AddPhotoAlternate } from '@mui/icons-material';
import React, { ChangeEvent, useState } from 'react';
import { FieldArray, Formik, Field, Form  } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateLessonMutation, Viewer } from '../../graphql/generated';
import { categories, DisplayError, DisplaySuccess } from '../../lib/utils';
import theme from '../../theme';
import Moment from 'moment';
import './createLesson.scss';

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
    .required('Title is required')
    .max(61, 'Title should be less than 60 characters'),
  meta: yup
    .string()
    .min(150, 'Meta should be 160 characters or longer')
    .required('Meta description is required'),
  category: yup
    .array().of(
      yup.string().min(1, "Please select at least one category.")
    ).min(2, "Please select at least two categories.")
    .required('Please select a category'),
  startDate: yup  
    .date()
    .required('Please add a start date'),
  endDate: yup
    .date().transform((value, originalValue, context) => {
      // check to see if the previous transform already parsed the date
      if (context.isType(value)) return value;

      // the default coercion failed so let's try it with Moment.js instead
      value = Moment(originalValue, "YYYY-MM-DD");

      // if it's valid return the date object, otherwise return an `InvalidDate`
      return value.isValid() ? value.toDate() : new Date('');
    })
    .required('Please add an end date'),
  video: yup
    .string()
    .required('A video or lecture is required, please upload.'),
  image: yup
    .string(),
});

export const CreateLesson = ({ viewer }: Props) => {
  const [formData, setFormData] = useState(initialData);
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

    return formData.video
  }

  const handleImageUpload = async (files: FileList | null) => {

    const file = files ? files[0] : null;
    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "drewpager";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach-image";

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

    return formData.image
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
            values.video = formData.video;
            values.image = formData.image;

            await createLesson({
              variables: {
                input: values
              }
            });

            navigate(`../user/${viewer.id}`, { replace: true })
          }}
        >
        {({ values, errors, touched, isSubmitting, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          {/* {errors.title ? (<h5>{errors.title}</h5>) : null} */}
          <TextField 
            variant="outlined" 
            label="Title" 
            helperText={errors.title ? `${errors.title}` : "Add a Lesson Title (Max Character Count of 160)"}
            sx={{ width: "45%" }} 
            value={values.title} 
            name="title"
            onChange={handleChange}
            required
            error={touched && errors.title ? true : false}
          />
          <br />
          <TextField 
            type="file"
            id="video" 
            variant='outlined'
            helperText={errors.video ? `${errors.video}` : "Upload a Video or Lecture"}
            className='file--upload'
            sx={{ width: "45%", marginTop: 1 }} 
            name="video"
            onChange={async (e: ChangeEvent<HTMLInputElement>) => { setFieldValue("video", await handleVideoUpload(e.target.files)) }} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LabelProgress progress={progress} />
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <VideoLibrary />
                </InputAdornment>
              )
            }}
            required 
            error={errors.video || touched.video ? true : false}
          /><br />
          <TextField 
            type="file"
            id="image" 
            variant='outlined' 
            helperText="Image" 
            sx={{ width: "45%", marginTop: 1 }} 
            name="image"
            onChange={async (e: ChangeEvent<HTMLInputElement>) => { setFieldValue("image", await handleImageUpload(e.target.files)) }} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LabelProgress progress={imageProgress} />
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <AddPhotoAlternate />
                </InputAdornment>
              )
            }}
            color="primary"
            required 
            /><br />
          <TextField 
            variant="outlined" 
            label="Description" 
            multiline rows={3} 
            helperText="Min Character Count of 160" 
            sx={{ width: "45%", marginTop: 1 }} 
            value={values.meta} 
            name="meta" 
            onChange={handleChange} 
            required 
            error={touched.meta && errors.meta ? true : false}
          />
          <FormGroup sx={{ marginTop: 1 }}>
            <Typography variant="h5">Category</Typography>
            <Typography variant="body2" style={{color: "gray"}}>Select All That Apply</Typography>
            <FieldArray name="category">
              {({ insert, remove, push }) => (
                // TODO: Render categories
                <div className="field--checkboxes">
                  {categories.map((cat, index) => (
                    <label 
                      key={index} 
                      className="field--checkboxes-label"
                    >
                      <Field 
                        type="checkbox" 
                        name="category" 
                        value={cat.name} 
                        className="field--checkbox"
                        error={touched.category && errors.category ? true : false}
                      />
                      {cat.name}
                    </label>
                  ))}
                </div>
              )}
            </FieldArray>
          </FormGroup>
          <TextField 
            variant='outlined' 
            name="startDate"
            label="Start Date or Year" 
            helperText={errors.startDate ? `${errors.startDate}` : "Add a time period start date as YYYY-MM-DD or -33,000 for 33,000 BCE"}
            sx={{ width: "45%", marginTop: 1 }} 
            value={values.startDate}  
            onChange={handleChange}
            error={touched.startDate && errors.startDate ? true : false}
            required 
          /><br />
          <TextField 
            variant='outlined' 
            name="endDate"
            label="End Date or Year" 
            helperText="YYYY-MM-DD or 1052" 
            sx={{ width: "45%", marginTop: 1 }} 
            value={values.endDate} 
            onChange={handleChange} 
            required
            error={touched.endDate && errors.endDate ? true : false} 
          /><br />
          {errors ? setError(true) : setError(false)}
          {console.log(errors)}
          <Button sx={{ marginTop: 2 }} disabled={!values.title || !values.endDate || errorState || isSubmitting } variant='contained' color='primary' type="submit">Submit</Button>
        </Form>
        )}
        </Formik>
      </Box>
      </Box>
    )
  }
}