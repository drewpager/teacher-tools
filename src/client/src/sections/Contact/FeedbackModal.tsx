import React, { useState } from 'react';
import { Button, Box, IconButton, Fab } from '@mui/material';
import Modal from '@mui/material/Modal';
import './feedbackModal.scss';
import { ContactForm } from './ContactForm';
import { Close } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';


export const FeedbackModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Fab color="primary" aria-label="feedback" onClick={handleOpen} className="feedback-modal--button">
        <CommentIcon />
      </Fab>
      {/* <Button onClick={handleOpen} className="feedback-modal--button">Feedback</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="feedback-modal">
          <ContactForm />
          <IconButton
            onClick={handleClose}
            className="feedback-modal--close-button"
            disableFocusRipple
            disableRipple
          >
            <Close />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  )
}