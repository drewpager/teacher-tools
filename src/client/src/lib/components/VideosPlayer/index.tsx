import React, { useEffect, useRef, useState, useMemo, ReactElement, ReactHTMLElement } from 'react';

import { Box, Skeleton, CircularProgress } from '@mui/material';
import './videoPlayer.scss';

interface props {
  url: string;
}

export const VideosPlayer = ({ url }: props) => {
  let path = useMemo(() => new URL(url), [url])
  let pathname = path.pathname;
  let re = new RegExp(/platos-peach-video/gm)
  let filePath = pathname.split(re)
  let fileString = filePath[1].split(".")

  const uframe = `https://player.cloudinary.com/embed/?cloud_name=drewpager&public_id=${`platos-peach-video${fileString[0]}.mp4`}&showLogo=false`

  const iframeLoading = (
    <Skeleton variant="rectangular" width="100%" height={360} />
  )
  return (
    <Box className='tt-video-wrapper'>
      <iframe
        loading="eager"
        src={uframe}
        title="Plato's Peach Video"
        width="100%"
        height="360"
        allow="autoplay; fullscreen"
        style={{ "border": "2px solid #000", "backgroundColor": "#000" }}
      >
      </iframe>
    </Box>
  )
}