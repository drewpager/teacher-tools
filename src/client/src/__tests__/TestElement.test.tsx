import { render, screen, cleanup } from "@testing-library/react";
// import { VideoPlayer } from "../lib/components/VideoPlayer/index";
import { TestElement } from "../sections/TestElement/index";

test("renders TestElement", () => {
  render(<TestElement />);
  // const footerElement = screen.getByTestId("footer");
  // expect(footerElement).toBeInTheDocument();
  const testElement = screen.getByText("Hello Testing!");
  expect(testElement).toBeInTheDocument();
});
