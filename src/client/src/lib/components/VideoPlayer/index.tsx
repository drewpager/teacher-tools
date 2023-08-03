import React from 'react';
import { AdvancedVideo, placeholder, responsive, lazyload } from '@cloudinary/react';
import { CloudinaryVideo } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { auto } from "@cloudinary/url-gen/qualifiers/videoCodec";
import { fit, } from "@cloudinary/url-gen/actions/resize";
import { Box } from '@mui/material';

interface props {
  url: string;
}

export const VideoPlayer = ({ url }: props) => {
  const path = new URL(url)
  const pathname = path.pathname;
  const re = new RegExp(/platos-peach-video/gm)
  const filePath = pathname.split(re)
  const fileString = filePath[1].split(".")

  // Create and configure your Cloudinary instance.
  const cldUrl = new CloudinaryVideo(`platos-peach-video${fileString[0]}`, { cloudName: 'drewpager' })
  cldUrl.resize(fit(1200, undefined));

  const sources = [
    {
      type: "mp4",
      codecs: ["avc1.4d002a"],
      transcode: videoCodec(auto())
    },
    // {
    //   type: "webm",
    //   codecs: ["vp8", "vorbis"],
    //   transcode: videoCodec(vp9())
    // },
  ];

  return (
    <Box className='tt-video-wrapper' >
      <AdvancedVideo cldVid={cldUrl} sources={sources} controls autoPlay plugins={[lazyload(), responsive({ steps: 200 }), placeholder()]} data-test-id="video-player" />
    </Box>
  )
};