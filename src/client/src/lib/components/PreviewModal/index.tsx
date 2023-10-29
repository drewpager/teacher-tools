import React, { useState } from 'react';
import { Box, Fab, IconButton, Tooltip } from '@mui/material';
import Modal from '@mui/material/Modal';
import { VideoPlayer } from '../VideoPlayer';
import PreviewIcon from '@mui/icons-material/Preview';
import CancelIcon from '@mui/icons-material/Cancel';
import './previewModal.scss';
import { Article, Lesson, Quiz } from '../../../graphql/generated';
import { ArticlePlayer } from '../ArticlePlayer';
import { QuizPlayer } from '../QuizPlayer';

type props = {
  item: Article | Quiz | Lesson;
  color: string;
}

export const UsePreviewModal = ({ item, color }: props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} disableRipple>
        <Tooltip title="Preview">
          <PreviewIcon className="preview-modal--button" sx={{ color: color }} />
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
          {(item.__typename === "Lesson" && item.video) && (
            <VideoPlayer url={item.video} />
          )}
          {(item.__typename === "Article") && (
            <ArticlePlayer article={item} />
          )}
          {(item.__typename === "Quiz") && (
            <QuizPlayer quiz={item} />
          )}
          <Box>
            <Fab aria-label="cancel" onClick={handleClose} sx={{ justifySelf: "right", mb: "5px" }}>
              X
            </Fab>
          </Box>
        </Box>
      </Modal>
    </>
  )
}