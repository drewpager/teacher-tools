import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Chip, IconButton, Button, Box, Typography, Skeleton } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import "./pdfPlayer.scss";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

type Props = {
  pdf: string | null | undefined;
}

export const PdfPlayer = ({ pdf }: Props) => {
  const [numPages, setNumPages] = useState<number>(0);
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
        loading={(<Skeleton variant="rectangular" width={720} height={700} />)}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          loading={(<Skeleton variant="rectangular" width={720} height={700} />)}
          onLoadError={(error: any) => PDFError(error.message)}
        />
      </Document>
      <Box className="pdf-button--section">
        {(numPages > 1) ? (
          <>
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
          </>
        ) : (<></>)}
        {PDFError}
      </Box>
    </Box>
  )
}