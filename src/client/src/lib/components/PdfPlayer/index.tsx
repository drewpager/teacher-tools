import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Viewer } from '../../../graphql/generated';
import sample from "../../assets/sample.pdf";
import { SkeletonComponent } from '../SkeletonComponent';
import { Chip, IconButton, Button, Box, Typography } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import "./pdfPlayer.scss";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PdfPlayer = () => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const PDFError = (error: any) => {
    return (
      <Typography variant="body2">{`Failed to load PDF: ${error}`}</Typography>
    )
  }

  const PDFSkeleton = () => {
    return (
      <>
        <SkeletonComponent variant="rectangular" width={500} height={"70vh"} />
        <SkeletonComponent variant="text" width={100} height={150} />
        <SkeletonComponent variant="rectangular" width={125} height={150} />
      </>
    )
  }

  return (
    <Box className="pdf--player-section">
      <Document
        file={sample}
        loading={<PDFSkeleton />}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          loading={<PDFSkeleton />}
          onLoadError={(error: any) => PDFError(error.message)}
        />
      </Document>
      <Box sx={{ textAlign: "center" }}>
        {/* <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p> */}
        <IconButton
          disabled={pageNumber <= 1}
          onClick={previousPage}
          disableRipple
        >
        <Button disableRipple>
          <UndoIcon /> Previous
        </Button>
        </IconButton>
        <Chip variant="outlined" className="pdfPage-chip" label={`Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`} />
        <IconButton
          disabled={numPages && pageNumber >= numPages ? true : false}
          onClick={nextPage}
          disableRipple
        >
        <Button disableRipple>
          Next <RedoIcon />
        </Button>
        </IconButton>
        {PDFError}
      </Box>
    </Box>
  )
}