import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import { AuthContext } from "../context/AuthContext";

const renderWithAuth = (authValue) =>
  render(
    <AuthContext.Provider value={authValue}>
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <div>secret admin area</div>
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

describe("ProtectedAdminRoute", () => {
  it("renders admin content for allowed users", () => {
    renderWithAuth({
      user: { email: "boss@example.com" },
      loading: false,
      adminEmails: ["boss@example.com"],
    });

    expect(screen.getByText("secret admin area")).toBeInTheDocument();
  });

  it("redirects non-admin users away from admin area", () => {
    renderWithAuth({
      user: { email: "guest@example.com" },
      loading: false,
      adminEmails: ["boss@example.com"],
    });

    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.queryByText("secret admin area")).not.toBeInTheDocument();
  });
});