import {
  fireEvent,
  render,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { SignInForm } from "../components/SignIn";

describe("sign in form", () => {
  it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
    const handler = jest.fn();
    render(<SignInForm formSubmissionHandler={handler} />);

    await waitFor(() => {
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "matti");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");

      fireEvent.press(screen.getByText("Sign In"));

      expect(handler.mock.calls[0][0]).toEqual({
        username: "matti",
        password: "password",
      });
    });
  });
});
