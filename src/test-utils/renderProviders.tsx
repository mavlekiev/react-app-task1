import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store, type RootState } from "../../src/store/store";
import type { ReactElement } from "react";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: ReactElement,
  { ...renderOptions }: ExtendedRenderOptions = {},
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
