import { Typography, Box, TextField, FormGroup, FormControlLabel, Checkbox, Button, CircularProgress, InputAdornment, Input, Switch, Tooltip } from '@mui/material';
import { VideoLibrary, AddPhotoAlternate } from '@mui/icons-material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { FieldArray, Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateLessonMutation, Viewer } from '../../graphql/generated';
import { categories, DisplayError, DisplaySuccess, titleCase } from '../../lib/utils';
import { Footer } from '../../lib/components';
import theme from '../../theme';
import Moment from 'moment';
import './createLesson.scss';
import { FeedbackModal } from '../Contact/FeedbackModal';
import { SignUpPrompt } from '../SignupPrompt';
import { Helmet } from 'react-helmet';
import { styled } from '@mui/material/styles';

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
  image: "",
  creator: ""
}


const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(61, 'Title should be less than 60 characters'),
  meta: yup
    .string()
    .min(10, 'Meta should be longer')
    .required('Meta description is required'),
  category: yup
    .array().of(
      yup.string().min(1, "Please select one.")
    ).min(1, "Please select at least one category.")
    .required('Please select a category'),
  startDate: yup
    .date()
    .required('Please add a start date (YYYY-MM-DD)'),
  endDate: yup
    .string()
    .matches(/(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])|-[1-9]\d{0,11}|[1-9]\d{0,4}|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))|(present)/i)
    .transform((value, originalValue, context) => {
      // check to see if the previous transform already parsed the date
      if (context.isType(value)) return value;

      // the default coercion failed so let's try it with Moment.js instead
      value = Moment(originalValue, "YYYY-MM-DD");

      // if it's valid return the date object, otherwise return an `InvalidDate`
      return value.isValid() ? value.toDate() : new Date('');
    })
    .required('Please add an end date (YYYY-MM-DD)'),
  video: yup
    .string(),
  image: yup
    .string(),
  public: yup
    .boolean(),
});

const LockSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 2,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M22 4v-.5C22 2.12 20.88 1 19.5 1S17 2.12 17 3.5V4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h5c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-.8 0h-3.4v-.5c0-.94.76-1.7 1.7-1.7s1.7.76 1.7 1.7V4zm-2.28 8c.04.33.08.66.08 1 0 2.08-.8 3.97-2.1 5.39-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H7v-2h2c.55 0 1-.45 1-1V8h2c1.1 0 2-.9 2-2V3.46c-.95-.3-1.95-.46-3-.46C5.48 3 1 7.48 1 13s4.48 10 10 10 10-4.48 10-10c0-.34-.02-.67-.05-1h-2.03zM10 20.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 16v1c0 1.1.9 2 2 2v1.93z" /></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 25 25"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" /></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
export const CreateLesson = ({ viewer }: Props) => {
  const [formData, setFormData] = useState(initialData);
  const [errorState, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageProgress, setImageProgress] = useState<number>(0);
  const [locked, setLocked] = useState<boolean | undefined>();
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
        image: "",
        creator: `${viewer.id}`,
        public: false
      }
    }
  })

  useEffect(() => {
    if (!viewer.id) {
      navigate('/signup', { replace: true })
    }
  }, [viewer, navigate])

  if (error) {
    return (
      <>
        <DisplayError title="Failed to create Lesson!" />
      </>
    )
  }

  // TODO - Restrict Video Uploads by File Type and Size

  const handleVideoUpload = (files: FileList | null) => {

    const file = files ? files[0] : null;
    // cloud name and unsigned upload preset here:
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
      setProgress(1);
      setTimeout(loop, 1);

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
          setTimeout(loop, 1);

          setProgress((end / size) * 100)
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
      formdata.append("chunk_size", "10000000");
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

    function noop() { }

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
      setImageProgress(1);
      setTimeout(loop, 1);

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
          setTimeout(loop, 1);

          setImageProgress((end / size) * 100)
        }
      }
    }

    function send(piece: any, start: number, end: number, size: number) {
      console.log("start ", start);
      console.log("end", end);
      console.log("size", size)
      console.log("name", file!.name)

      var formdata = new FormData();
      console.log(XUniqueUploadId);

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("chunk_size", "9000000");
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

    function noop() { }

    return formData.image
  }

  const LabelProgress = ({ progress }: { progress: number }) => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress color={progress < 100 ? "primary" : "success"} variant='determinate' value={progress} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 3,
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

  return (
    <div>
      <Helmet>
        <title>{`Create Lesson | Plato's Peach`}</title>
        <meta name="description" content={`Add a new lesson to use within a lesson plan or to share publicly with other teachers.`} />
      </Helmet>
      <Box className='createLesson--page'>
        <FeedbackModal />
        <Box className='createLesson--form'>
          <h2>Create a New Video Lesson</h2>
          <Formik
            initialValues={{
              title: "",
              meta: "",
              category: [],
              startDate: "",
              endDate: "",
              video: "",
              image: "",
              creator: `${viewer.id}`,
              public: `${viewer.id}` === '116143759549242008910' ? true : false
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
                  sx={{ width: "75%" }}
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
                  sx={{ width: "75%", marginTop: 1 }}
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
                  error={touched.video && errors.video ? true : false}
                /><br />
                <TextField
                  type="file"
                  id="image"
                  variant='outlined'
                  className='image--upload'
                  helperText="Image"
                  sx={{ width: "75%", marginTop: 1 }}
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
                  sx={{ width: "75%", marginTop: 1 }}
                  value={values.meta}
                  name="meta"
                  onChange={handleChange}
                  required
                  error={touched.meta && errors.meta ? true : false}
                />
                <FormGroup sx={{ marginTop: 1 }}>
                  <Typography variant="h5">Category</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>Select All That Apply</Typography>
                  <FieldArray name="category">
                    {({ insert, remove, push }) => (
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
                            {titleCase(`${cat.name}`)}
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
                  sx={{ width: "75%", marginTop: 1 }}
                  value={values.startDate}
                  onChange={handleChange}
                  error={touched.startDate && errors.startDate ? true : false}
                  required
                /><br />
                <TextField
                  variant='outlined'
                  name="endDate"
                  label="End Date or Year"
                  helperText="YYYY-MM-DD, 1052 or Present"
                  sx={{ width: "75%", marginTop: 1 }}
                  value={values.endDate}
                  onChange={handleChange}
                  required
                  error={touched.endDate && errors.endDate ? true : false}
                /><br />
                <Box className="button--slider-lesson">
                  <Tooltip title={viewer.paymentId !== null ? "Make Private/Public" : "Public Content Restricted"}>
                    <LockSwitch checked={!locked} onChange={() => setLocked(!locked)} disabled={viewer.paymentId === null} />
                  </Tooltip>
                  <Tooltip title={viewer.paymentId !== null ? "Make Private/Public" : "Public Content Restricted"}>
                    <Typography variant="body1" color={!locked ? "error" : "success"}>{!locked ? "Private" : "Public"}</Typography>
                  </Tooltip>
                </Box>
                {errors ? setError(true) : setError(false)}
                {console.log(errors)}
                <Button sx={{ marginTop: 2 }} disabled={!values.title || !values.endDate || isSubmitting} variant='contained' color='primary' type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Footer />
    </div>
  )
}