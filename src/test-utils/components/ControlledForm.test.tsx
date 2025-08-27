vi.mock("../../store/store", () => {
  return {
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
  };
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestProviders } from "../TestProviders";
import ControlledForm from "../../components/ControlledForm";

vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual("react-hook-form");
  return {
    ...actual,
    useForm: () => ({
      register: vi.fn(),
      handleSubmit: (cb: (data: unknown) => void) => (e: Event) => {
        e.preventDefault();
        cb(mockData);
      },
      watch: () => "Password1!",
      formState: { errors: {}, isValid: true },
    }),
  };
});

import { useAppDispatch, useAppSelector } from "../../store/store";
import { expect, vi } from "vitest";

const mockData = {
  name: "John",
  age: 25,
  email: "john@example.com",
  password: "Password1!",
  confirmPassword: "Password1!",
  gender: "male",
  country: "United States",
  acceptTc: true,
  image: [new File([""], "test.png", { type: "image/png" })],
};

const renderWithProviders = (ui: React.ReactNode) => {
  return render(<TestProviders>{ui}</TestProviders>);
};

describe("ControlledForm", () => {
  const onClose = vi.fn();

  test("renders all required fields", () => {
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      "United States",
    ]);

    renderWithProviders(<ControlledForm onClose={onClose} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Upload Image")).toBeInTheDocument();
    expect(screen.getByLabelText("Accept T&C")).toBeInTheDocument();
  });

  test("displays password strength", () => {
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      "United States",
    ]);
    renderWithProviders(<ControlledForm onClose={onClose} />);
    expect(screen.getByText(/Strength: Strong/i)).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const dispatch = vi.fn();

    (useAppDispatch as ReturnType<typeof vi.fn>).mockReturnValue(dispatch);
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      "United States",
    ]);

    renderWithProviders(<ControlledForm onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(dispatch).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
