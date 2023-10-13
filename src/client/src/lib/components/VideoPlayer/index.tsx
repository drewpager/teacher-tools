import React, { useEffect, useRef } from 'react';
// import { AdvancedVideo, placeholder, responsive, lazyload } from '@cloudinary/react';
// import { CloudinaryVideo } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
// import { videoCodec } from "@cloudinary/url-gen/actions/transcode";
// import { auto } from "@cloudinary/url-gen/qualifiers/videoCodec";
// import { fit, } from "@cloudinary/url-gen/actions/resize";
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

export const VideoPlayer = (props: props) => {
  let { url } = props;
  let path = new URL(url)
  let pathname = path.pathname;
  let re = new RegExp(/platos-peach-video/gm)
  let filePath = pathname.split(re)
  let fileString = filePath[1].split(".")
  let cloudinaryRef = useRef();
  let videoRef: any = useRef(props);

  useEffect(() => {
    if (cloudinaryRef.current) return;
    cloudinaryRef.current = window.cloudinary.videoPlayer(videoRef.current, {
      cloud_name: 'drewpager',
    });
  }, [props, videoRef])

  return (
    <Box className='tt-video-wrapper'>
      <video 
        ref={videoRef} 
        data-cld-public-id={`platos-peach-video${fileString[0]}.mp4`}
        controls
        preload="metadata"
        data-cld-colors='{ "base": "#3A70CD", "accent": "#57996A", "text": "#fff" }'
        // onContextMenu={(e) => e.preventDefault()}
        {...props}
      />
    </Box>
  )
}

  // Create and configure your Cloudinary instance.
  // const cldUrl = new CloudinaryVideo(`platos-peach-video${fileString[0]}`, { cloudName: 'drewpager' })
  // cldUrl.resize(fit(1200, undefined));

  // const sources = [
  //   {
  //     type: "mp4",
  //     codecs: ["avc1.4d002a"],
  //     transcode: videoCodec(auto())
  //   },
    // {
    //   type: "webm",
    //   codecs: ["vp8", "vorbis"],
    //   transcode: videoCodec(vp9())
    // },
//   ];

//   return (
//     <Box className='tt-video-wrapper'>
//       <AdvancedVideo
//         cldVid={cldUrl}
//         sources={sources}
//         controls
//         onContextMenu={(e) => e.preventDefault()}
//         preload='metadata'
//         autoPlay
//         data-cld-colors='{ "base": "#0071ba", "accent": "#db8226", "text": "#fff" }'
//         className="cld-video-player cld-video-player-skin-light"
//         plugins={[lazyload(), responsive({ steps: 200 }), /* placeholder({ mode: 'blur' }) */]}
//         data-test-id="video-player" />
//     </Box>
//   )
// };