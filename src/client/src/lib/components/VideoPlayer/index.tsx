import React from 'react';
import { AdvancedVideo, responsive } from '@cloudinary/react';
import { CloudinaryVideo } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { streamingProfile, videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { auto, vp9, h264 } from "@cloudinary/url-gen/qualifiers/videoCodec";
import { limitFit, scale, fit, fill } from "@cloudinary/url-gen/actions/resize";
import { dpr } from '@cloudinary/url-gen/actions/delivery'
// import 'dotenv/config';
// import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
// import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
// import {Gravity} from "@cloudinary/url-gen/qualifiers";
// import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";

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
  // cldUrl.resize(fill())
  cldUrl.resize(limitFit().width(0.33)).delivery(dpr("1.0"));

  const sources = [
    {
      type: "mp4",
      codecs: ["avc1.4d002a"],
      transcode: videoCodec(auto())
    },
    {
      type: "webm",
      codecs: ["vp8", "vorbis"],
      transcode: videoCodec(vp9())
    },
  ];

  return ( 
    <AdvancedVideo cldVid={cldUrl} sources={sources} controls autoPlay plugins={[responsive({ steps: [200, 600, 800, 1000, 1200] })]} />
  )
};