import { db } from "../firebase";
import { doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { stampRecord } from "./dataSync";

const COUPONS_KEY = "storeCoupons";
const COUPONS_DOC = doc(db, "settings", "coupons");

const DEFAULT_COUPONS = [
  {
    code: "SAVE10",
    label: "10% off",
    type: "percent",
    value: 10,
    minSubtotal: 0,
    active: true,
    description: "Flat 10 percent off for any cart.",
  },
  {
    code: "WELCOME20",
    label: "$20 off",
    type: "fixed",
    value: 20,
    minSubtotal: 100,
    active: true,
    description: "Works on larger baskets only.",
  },
];

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const normalizeCouponCode = (code) =>
  code?.trim().toUpperCase() || "";

export const normalizeCoupon = (coupon) =>
  stampRecord({
    code: normalizeCouponCode(coupon.code),
    label: coupon.label?.trim() || normalizeCouponCode(coupon.code),
    type: coupon.type === "fixed" ? "fixed" : "percent",
    value: Number(coupon.value) || 0,
    minSubtotal: Math.max(Number(coupon.minSubtotal) || 0, 0),
    active: coupon.active !== false,
    description: coupon.description?.trim() || "",
    createdAt: coupon.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

export const getStoredCoupons = () => {
  const storedCoupons = safeParse(localStorage.getItem(COUPONS_KEY), null);

  if (!Array.isArray(storedCoupons) || storedCoupons.length === 0) {
    localStorage.setItem(COUPONS_KEY, JSON.stringify(DEFAULT_COUPONS));

    return DEFAULT_COUPONS.map(normalizeCoupon);
  }

  return storedCoupons.map(normalizeCoupon);
};

export const saveCoupons = (coupons) => {
  const nextCoupons = coupons.map(normalizeCoupon);
  localStorage.setItem(COUPONS_KEY, JSON.stringify(nextCoupons));

  void (async () => {
    try {
      const batch = writeBatch(db);
      batch.set(COUPONS_DOC, {
        coupons: nextCoupons,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      await batch.commit();
    } catch {
      // fall back to local storage only
    }
  })();

  return nextCoupons;
};

export const syncCouponsToFirestore = async (coupons) => {
  const nextCoupons = coupons.map(normalizeCoupon);

  try {
    await setDoc(
      COUPONS_DOC,
      {
        coupons: nextCoupons,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch {
    return nextCoupons;
  }

  return nextCoupons;
};

export const hydrateCouponsFromFirestore = async () => {
  try {
    const snapshot = await getDoc(COUPONS_DOC);

    if (snapshot.exists()) {
      const nextCoupons = (snapshot.data()?.coupons || []).map(normalizeCoupon);

      if (nextCoupons.length > 0) {
        localStorage.setItem(COUPONS_KEY, JSON.stringify(nextCoupons));
        return nextCoupons;
      }
    }
  } catch {
    // fall back to local storage
  }

  return getStoredCoupons();
};

export const getActiveCoupons = () =>
  getStoredCoupons().filter((coupon) => coupon.active);

export const findCouponByCode = (code) =>
  getActiveCoupons().find(
    (coupon) => coupon.code === normalizeCouponCode(code)
  );

export const addCoupon = (coupon) => {
  const coupons = getStoredCoupons();
  const nextCoupon = normalizeCoupon(coupon);
  const existingIndex = coupons.findIndex(
    (item) => item.code === nextCoupon.code
  );

  const nextCoupons =
    existingIndex >= 0
      ? coupons.map((item, index) =>
          index === existingIndex ? { ...item, ...nextCoupon } : item
        )
      : [nextCoupon, ...coupons];

  return saveCoupons(nextCoupons);
};

export const updateCoupon = (couponCode, updates) => {
  const coupons = getStoredCoupons();
  const normalizedCode = normalizeCouponCode(couponCode);

  return saveCoupons(
    coupons.map((coupon) =>
      coupon.code === normalizedCode
        ? normalizeCoupon({ ...coupon, ...updates, code: coupon.code })
        : coupon
    )
  );
};

export const deleteCoupon = (couponCode) => {
  const normalizedCode = normalizeCouponCode(couponCode);
  const coupons = getStoredCoupons().filter(
    (coupon) => coupon.code !== normalizedCode
  );

  return saveCoupons(coupons);
};