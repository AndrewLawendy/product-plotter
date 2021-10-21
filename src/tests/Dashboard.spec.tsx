/**
 * @jest-environment jsdom
 */

// import dependencies
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Dashboard from "../components/Dashboard";

test("dimension zone", () => {
  const card = render(<Dashboard />);
});
