import { beforeEach, describe, expect, it } from "vitest";
import {
  getStoredAdminEmails,
  isAdminEmail,
  isAdminUser,
  normalizeAdminEmails,
  saveStoredAdminEmails,
} from "./admin";

describe("admin utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("normalizes and deduplicates admin emails", () => {
    expect(
      normalizeAdminEmails([
        " A@EXAMPLE.com ",
        "a@example.com",
        "b@example.com",
      ])
    ).toEqual(["a@example.com", "b@example.com"]);
  });

  it("reads and writes stored admin emails", () => {
    saveStoredAdminEmails(["admin@example.com", "ADMIN@example.com"]);

    expect(getStoredAdminEmails()).toEqual(["admin@example.com"]);
  });

  it("checks admin access by email or user object", () => {
    const admins = ["boss@example.com"];

    expect(isAdminEmail("BOSS@example.com", admins)).toBe(true);
    expect(isAdminUser({ email: "boss@example.com" }, admins)).toBe(true);
    expect(isAdminUser({ email: "guest@example.com" }, admins)).toBe(false);
  });
});