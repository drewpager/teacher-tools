import React, { useState, ChangeEvent } from "react";
import { Typography, Box, InputAdornment, TextField, CircularProgress } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { FieldArray, Formik, Field, Form } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  pdf: yup
    .string()
    .required('PDF File Required')
});

type Props = {
  pdf: string;
}

interface PdfUploaderProps {
  onData: (data: string) => void;
}

const initialData: Props = {
  pdf: ""
}

export const PdfUploader = ({ onData }: PdfUploaderProps) => {
  const [pdfProgress, setPdfProgress] = useState<number>(0);
  const [formData, setFormData] = useState<Props>(initialData);

  const sendDataToCreateArticle = () => {
    const data: string = formData.pdf;
    onData(data);
  };


  const handleImageUpload = async (files: FileList | null) => {

    const file = files ? files[0] : null;
    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "drewpager";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "platos-peach-pdf";

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId: string = new Date().toString();

    handleImageUpload(file!);

    function handleImageUpload(file: File) {
      var size = file ? file.size : 0;
      var sliceSize = 1000000;
      var start = 0;
      setPdfProgress(1);
      setTimeout(loop, 1);

      function loop() {
        let end = start + sliceSize;

        if (end > size) {
          end = size;
          setPdfProgress(100)
        }
        const s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 1);

          setPdfProgress((end / size) * 100)
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
      formdata.append("chunk_size", "900000");
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
        console.log("RES: ", res);
        formData.pdf = res.secure_url;
        console.log("formData PDF: ", formData.pdf)
        setFormData({ pdf: formData.pdf });
        sendDataToCreateArticle()
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

    return formData.pdf
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
    <Formik
      initialValues={{
        pdf: ""
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        values.pdf = formData.pdf;

        sendDataToCreateArticle();
        // await createLesson({
        //   variables: {
        //     input: values
        //   }
        // });

        // navigate(`../user/${viewer.id}`, { replace: true })
      }}
    >
      {({ values, errors, touched, isSubmitting, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <TextField
            type="file"
            id="pdf"
            variant='outlined'
            className='image--upload'
            helperText="Optional: Upload a PDF Article"
            sx={{ width: "100%", marginTop: 1 }}
            name="pdf"
            onChange={async (e: ChangeEvent<HTMLInputElement>) => { await handleImageUpload(e.target.files) }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LabelProgress progress={pdfProgress} />
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <PictureAsPdfIcon />
                </InputAdornment>
              )
            }}
            color="primary"
            required
          />
        </Form>
      )}
    </Formik>
  )
}