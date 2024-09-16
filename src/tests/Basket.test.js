import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Basket from "../components/Basket";

import theme from "../config/theme";

const mockStore = configureStore([]);

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate, // Return the mock function
}));

describe("Basket Component", () => {
  let store;

  beforeEach(() => {
    // Define an initial state for the store
    store = mockStore({
      basket: {
        items: [
          { id: 1, name: "Apple", price: 2.0, quantity: 2 },
          { id: 2, name: "Banana", price: 1.5, quantity: 3 },
        ],
      },
    });

    // Clear the mockNavigate call history
    mockNavigate.mockClear();
  });

  test("renders basket items correctly", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Basket />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    // Use more flexible matchers to check for basket items
    expect(screen.getByText(/Apple/i)).toBeInTheDocument();
    expect(screen.getByText(/Banana/i)).toBeInTheDocument();

    // Check for quantity (use regex to match the number)
    const appleQuantity = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "span" && content === "2"
    );
    const bananaQuantity = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "span" && content === "3"
    );

    expect(appleQuantity).toBeInTheDocument();
    expect(bananaQuantity).toBeInTheDocument();

    // Check if total price is rendered
    expect(screen.getByText(/Total:\s*\$\s*8.50/)).toBeInTheDocument();
  });

  test("adds an item to the basket", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Basket />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    // Simulate clicking the '+' button for the Apple item
    const addButton = screen.getAllByRole("button", { name: "+" })[0];
    fireEvent.click(addButton);

    // Check that quantity has increased
    const updatedAppleQuantity = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "span" && content === "3"
    );
    expect(updatedAppleQuantity).toBeInTheDocument();
  });

  test("removes an item from the basket", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Basket />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    // Simulate clicking the '-' button for the Banana item
    const removeButton = screen.getAllByRole("button", { name: "-" })[1];
    fireEvent.click(removeButton);

    // Check that quantity has decreased
    const updatedBananaQuantity = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "span" && content === "2"
    );
    expect(updatedBananaQuantity).toBeInTheDocument();
  });

  test("proceeds to checkout", () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Basket />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    // Simulate clicking the 'Proceed to Checkout' button
    const checkoutButton = screen.getByText(/Proceed to Checkout/i);
    fireEvent.click(checkoutButton);

    // Ensure the page navigates to checkout
    expect(mockNavigate).toHaveBeenCalledWith("/success");
  });
});
