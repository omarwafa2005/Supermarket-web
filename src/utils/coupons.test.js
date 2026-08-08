import { beforeEach, describe, expect, it } from "vitest";
import {
  addCoupon,
  deleteCoupon,
  findCouponByCode,
  getActiveCoupons,
  getStoredCoupons,
  normalizeCouponCode,
  updateCoupon,
} from "./coupons";

describe("coupon utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("normalizes coupon codes", () => {
    expect(normalizeCouponCode(" save10 ")).toBe("SAVE10");
  });

  it("returns default coupons when storage is empty", () => {
    const coupons = getStoredCoupons();

    expect(coupons.length).toBeGreaterThan(0);
    expect(getActiveCoupons().length).toBeGreaterThan(0);
  });

  it("adds, updates, finds, and deletes coupons", () => {
    const nextCoupons = addCoupon({
      code: "BLACKFRIDAY",
      label: "15% off",
      type: "percent",
      value: 15,
      minSubtotal: 50,
      active: true,
    });

    expect(nextCoupons.some((coupon) => coupon.code === "BLACKFRIDAY")).toBe(true);
    expect(findCouponByCode("blackfriday").code).toBe("BLACKFRIDAY");

    const updatedCoupons = updateCoupon("BLACKFRIDAY", { active: false });
    expect(updatedCoupons.find((coupon) => coupon.code === "BLACKFRIDAY").active).toBe(false);

    const deletedCoupons = deleteCoupon("BLACKFRIDAY");
    expect(deletedCoupons.some((coupon) => coupon.code === "BLACKFRIDAY")).toBe(false);
  });
});