import { renderWithProviders } from "../renderProviders";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UncontrolledForm from "../../components/UncontrolledForm";
import { expect, vi } from "vitest";

describe("UncontrolledForm", () => {
  const onClose = vi.fn();

  test("renders all fields", () => {
    renderWithProviders(<UncontrolledForm onClose={onClose} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Male" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Female" })).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Upload Image")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /Accept T&C/i }),
    ).toBeInTheDocument();
  });

  test("shows error on invalid submit", async () => {
    renderWithProviders(<UncontrolledForm onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/Name must start with uppercase letter/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Age must be a number/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test("submits valid data", async () => {
    renderWithProviders(<UncontrolledForm onClose={onClose} />);

    await userEvent.type(screen.getByLabelText("Name"), "John");
    await userEvent.type(screen.getByLabelText("Age"), "25");
    await userEvent.type(screen.getByLabelText("Email"), "john@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "Password1!");
    await userEvent.type(
      screen.getByLabelText("Confirm Password"),
      "Password1!",
    );
    await userEvent.click(screen.getByRole("radio", { name: "Male" }));
    await userEvent.type(screen.getByLabelText("Country"), "United States");
    await userEvent.click(
      screen.getByRole("checkbox", { name: /Accept T&C/i }),
    );

    const file = new File([""], "test.png", { type: "image/png" });
    const input = screen.getByLabelText("Upload Image") as HTMLInputElement;
    Object.defineProperty(input, "files", { value: [file] });
    fireEvent.change(input);

    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(onClose).toHaveBeenCalled();
  });
});
