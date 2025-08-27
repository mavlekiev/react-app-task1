import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../../components/Modal";
import { expect, vi } from "vitest";

describe("Modal", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    document.body.innerHTML = "";
    onClose.mockClear();
  });

  test("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>,
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  test("renders children when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>,
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("calls onClose when Escape key is pressed", async () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Modal Content</p>
      </Modal>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when clicking outside modal", async () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Content</div>
      </Modal>,
    );

    const modalContent = screen.getByTestId("modal-content");
    const backdrop = modalContent.closest(".fixed");
    if (!backdrop) {
      throw new Error("Backdrop (.fixed) not found");
    }

    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  test("manages focus: first focusable element gets focus on open", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <button>Close</button>
      </Modal>,
    );
    const button = screen.getByRole("button", { name: /Close/i });
    expect(button).toHaveFocus();
  });

  test("renders in portal (document.body)", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Portal Test</p>
      </Modal>,
    );
    expect(document.body.lastElementChild).toHaveTextContent("Portal Test");
  });
});
