import { waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActWarning } from "./ActWarning";

const clipboardWriteMock = vi
  .fn()
  .mockImplementation((v) => Promise.resolve(v));

beforeEach(() => {
  Object.defineProperty(window.navigator, "clipboard", {
    value: { writeText: clipboardWriteMock },
    configurable: true,
  });
});

test("copies text", async () => {
  render(<ActWarning />);

  const button = screen.getByRole("button", {
    name: "Copy",
  });

  await userEvent.type(screen.getByLabelText("Type and copy text"), "foo bar");
  await userEvent.click(button);

  expect(clipboardWriteMock).toHaveBeenCalledWith("foo bar");
});
