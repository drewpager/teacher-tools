import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Chip, IconButton, Button, Box, Typography, Skeleton } from '@mui/material';
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

type Props = {
  pdf: string;
}

export const PdfPlayer = ({ pdf }: Props) => {
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

  return (
    <Box className="pdf--player-section">
      <Document
        file={pdf}
        loading={<Skeleton variant="rectangular" width={500} height={900} />}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          loading={<Skeleton variant="rectangular" width={500} height={900} />}
          onLoadError={(error: any) => PDFError(error.message)}
        />
      </Document>
      <Box className="pdf-button--section">
        <IconButton
          disableRipple
          onClick={previousPage}
          disabled={pageNumber <= 1}
        >
          <Button
            disabled={pageNumber <= 1}
            disableRipple
          >
            <UndoIcon /> Previous
          </Button>
        </IconButton>
        <Chip variant="outlined" className="pdfPage-chip" label={`Page ${pageNumber || (numPages ? 1 : '--')} of ${numPages || '--'}`} />
        <IconButton
          disableRipple
          onClick={nextPage}
          disabled={pageNumber === numPages}
        >
          <Button
            disabled={pageNumber === numPages}
            disableRipple
          >
            Next <RedoIcon />
          </Button>
        </IconButton>
        {PDFError}
      </Box>
    </Box>
  )
}