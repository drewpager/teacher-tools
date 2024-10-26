import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Chip, IconButton, Button, Box, Typography, Skeleton, Fab, Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import PreviewIcon from '@mui/icons-material/Preview';
import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
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

  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1.0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const zoomIn = () => setScale((prevScale) => prevScale + 0.1);
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));

  const PDFPreview = (
    <>
      <IconButton onClick={handleOpen} disableRipple>
        <Tooltip title="PDF Viewer">
          <PreviewIcon className="preview-modal--button" sx={{ color: "#000" }} />
        </Tooltip>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="preview-modal">
          <Box>
            <IconButton
              onClick={handleClose}
              disableRipple
              className="close--modal-button"
            >
              <CancelIcon />
            </IconButton>
          </Box>
          <Box className="pdf-button--section">
            <>
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
                  <IconButton disableRipple sx={{ color: "#000" }}>
                    <ZoomInIcon onClick={zoomIn} />
                  </IconButton>
                  <IconButton disableRipple sx={{ color: "#000" }}>
                    <ZoomOutIcon onClick={zoomOut} />
                  </IconButton>
                </>
              ) : (<></>)}
              {PDFError}
            </>
          </Box>
          <Box className="pdf--viewer-section">
            <Document
              file={pdf}
              loading={(<Skeleton variant="rectangular" width={720} height={700} />)}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page
                pageNumber={pageNumber}
                loading={(<Skeleton variant="rectangular" width={720} height={700} />)}
                onLoadError={(error: any) => PDFError(error.message)}
                scale={scale}
              />
            </Document>
          </Box>
        </Box>
      </Modal>
    </>
  )

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
        <>
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
          {PDFPreview}
          {PDFError}
        </>
      </Box>
    </Box>
  )
}