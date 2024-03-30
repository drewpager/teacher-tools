import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Box } from '@mui/material';
import './videoPlayer.scss';

interface props {
  url: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export const VideoPlayer = ({ url }: props) => {
  let path = useMemo(() => new URL(url), [url])
  let pathname = path.pathname;
  let re = new RegExp(/platos-peach-video/gm)
  let filePath = pathname.split(re)
  let fileString = filePath[1].split(".")
  let cloudinaryRef = useRef();
  let videoRef: any = useRef();

  useEffect(() => {
    if (cloudinaryRef.current) return;
    cloudinaryRef.current = window.cloudinary.videoPlayer(videoRef.current, {
      cloud_name: 'drewpager',
      showLogo: false,
    });
  }, [url, videoRef, fileString, path])

  return (
    <Box className='tt-video-wrapper'>
      <video
        ref={videoRef}
        data-cld-public-id={`platos-peach-video${fileString[0]}`}
        key={`platos-peach-video${fileString[0]}`}
        controls
        crossOrigin="anonymous"
        preload="metadata"
        data-cld-colors='{ "base": "#3A70CD", "accent": "#57996A", "text": "#fff" }'
        // max-width={"100%"}
        max-height={"auto"}
        className="cld-video-player cld-fluid"
      />
      {/* {videoRef.current && console.log(videoRef.current.duration, videoRef.current.poster)} */}
    </Box>
  )
}