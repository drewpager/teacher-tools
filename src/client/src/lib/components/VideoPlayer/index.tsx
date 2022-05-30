import React from 'react';
import { AdvancedVideo } from '@cloudinary/react';
import { CloudinaryVideo } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
import { auto, vp9 } from "@cloudinary/url-gen/qualifiers/videoCodec";
import {fill} from "@cloudinary/url-gen/actions/resize";
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
  console.log(fileString[0])
  
  // Create and configure your Cloudinary instance.
  const cldUrl = new CloudinaryVideo(`platos-peach-video${fileString[0]}`, { cloudName: 'drewpager' })
  cldUrl.resize(fill().width(900).height(500));

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
    }
  ];

  return ( 
    <AdvancedVideo cldVid={cldUrl} sources={sources} controls />
  )
};