"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPlayer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@cloudinary/react");
const url_gen_1 = require("@cloudinary/url-gen");
// Import required actions and qualifiers.
const transcode_1 = require("@cloudinary/url-gen/actions/transcode");
const videoCodec_1 = require("@cloudinary/url-gen/qualifiers/videoCodec");
const resize_1 = require("@cloudinary/url-gen/actions/resize");
const material_1 = require("@mui/material");
const VideoPlayer = ({ url }) => {
    const path = new URL(url);
    const pathname = path.pathname;
    const re = new RegExp(/platos-peach-video/gm);
    const filePath = pathname.split(re);
    const fileString = filePath[1].split(".");
    // Create and configure your Cloudinary instance.
    const cldUrl = new url_gen_1.CloudinaryVideo(`platos-peach-video${fileString[0]}`, { cloudName: 'drewpager' });
    // cldUrl.resize(fill())
    cldUrl.resize((0, resize_1.fit)().width(1200));
    const sources = [
        {
            type: "mp4",
            codecs: ["avc1.4d002a"],
            transcode: (0, transcode_1.videoCodec)((0, videoCodec_1.auto)())
        },
        {
            type: "webm",
            codecs: ["vp8", "vorbis"],
            transcode: (0, transcode_1.videoCodec)((0, videoCodec_1.vp9)())
        },
    ];
    return ((0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ className: 'tt-video-wrapper' }, { children: (0, jsx_runtime_1.jsx)(react_1.AdvancedVideo, { cldVid: cldUrl, sources: sources, controls: true, autoPlay: true, plugins: [(0, react_1.responsive)({ steps: 200 })] }, void 0) }), void 0));
};
exports.VideoPlayer = VideoPlayer;
