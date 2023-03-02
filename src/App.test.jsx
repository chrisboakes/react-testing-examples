import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders page", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: "React Testing Examples",
    })
  ).toBeInTheDocument();
});
