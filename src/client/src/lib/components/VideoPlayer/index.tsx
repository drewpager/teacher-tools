import React from 'react';
import {AdvancedVideo} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import {fill} from "@cloudinary/url-gen/actions/resize";
// import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
// import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
// import {Gravity} from "@cloudinary/url-gen/qualifiers";
// import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";

export const VideoPlayer = () => {

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'drewpager'
    }
  }); 

  // Use the video with public ID, 'docs/walking_talking'.
  const myVideo = cld.video('platos-peach-video/walking_talking_hi6xha');

  // Apply the transformation.
  myVideo.resize(fill().width(900).height(500));   
  return (
      <AdvancedVideo cldVid={myVideo} controls />
  )
};