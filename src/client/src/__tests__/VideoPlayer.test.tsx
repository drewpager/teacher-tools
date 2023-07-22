import { render, screen, cleanup } from "@testing-library/react";

import { VideoPlayer } from "../lib/components/VideoPlayer";

// test("renders VideoPlayer", () => {
//   const url = "https://res.cloudinary.com/drewpager/video/upload/c_fit,w_1200/vc_auto/v1/platos-peach-video/Charlemagne_dimo2d.mp4?_a=ATAK9AA0";
//   render(<VideoPlayer url={url} />);
//   const videoPlayerElement = screen.getByTestId("video-player");
//   expect(videoPlayerElement)
// });