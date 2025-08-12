import { render, screen } from "@testing-library/react";
import { VideoPlayer } from "../lib/components/VideoPlayer";

test("renders VideoPlayer with Cloudinary attributes", () => {
  const url =
    "https://res.cloudinary.com/drewpager/video/upload/c_fit,w_1200/vc_auto/v1/platos-peach-video/Charlemagne_dimo2d.mp4?_a=ATAK9AA0";
  render(<VideoPlayer url={url} />);
  const video = screen.getByTestId("video-player");
  expect(video).toBeInTheDocument();
  expect(video).toHaveAttribute(
    "data-cld-public-id",
    "platos-peach-video/Charlemagne_dimo2d"
  );
});