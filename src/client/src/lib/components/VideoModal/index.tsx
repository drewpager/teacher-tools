import React, { useState } from 'react';
import { Button, Box, Typography, Fab } from '@mui/material';
import Modal from '@mui/material/Modal';
import { VideoPlayer } from '../VideoPlayer';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import './videoModal.scss';

type props = {
  video: string;
}

export const UseVideoModal = ({ video }: props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <PlayArrowIcon sx={{ height: 38, width: 38 }} onClick={handleOpen} className="modal--button" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="video-modal">
          <Box>
            <Fab aria-label="cancel" onClick={handleClose} sx={{ justifySelf: "right", mb: "5px" }}>
              {/* <CancelIcon /> */}
              X
            </Fab>
          </Box>
          <VideoPlayer url={video} />
        </Box>
      </Modal>
    </Box>
  )
}