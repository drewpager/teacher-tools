import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { QuizCreate } from '../QuizCreate';
import './modal.scss';
import { Viewer } from '../../graphql/generated';

type Props = {
  viewer: Viewer
}

export const UseModal = ({ viewer }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
    <Button onClick={handleOpen} sx={{ color: "white" }}>Add Assessment Questions</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <QuizCreate viewer={viewer} />
      </Box>
    </Modal>
  </Box>
  )
}