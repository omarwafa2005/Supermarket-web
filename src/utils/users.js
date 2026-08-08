import { doc, writeBatch } from "firebase/firestore";
import { db } from "../firebase";
import { stampRecord } from "./dataSync";

const USERS_KEY = "appUsers";
const USERS_COLLECTION = "users";

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const getStoredUsers = () => {
  const users = safeParse(localStorage.getItem(USERS_KEY), []);

  return Array.isArray(users) ? users : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  void (async () => {
    try {
      const batch = writeBatch(db);

      users.forEach((user) => {
        batch.set(doc(db, USERS_COLLECTION, user.uid || user.email), stampRecord(user));
      });

      await batch.commit();
    } catch {
      // fall back to local storage only
    }
  })();

  return users;
};

export const upsertUserProfile = (profile) => {
  const users = getStoredUsers();
  const existingIndex = users.findIndex(
    (user) => user.uid === profile.uid || user.email === profile.email
  );

  const nextProfile = stampRecord({
    uid: profile.uid,
    name: profile.name || profile.displayName || profile.email.split("@")[0],
    email: profile.email,
    role: profile.role || "customer",
    createdAt: profile.createdAt || new Date().toISOString(),
    lastLoginAt: profile.lastLoginAt || new Date().toISOString(),
  });

  if (existingIndex >= 0) {
    const nextUsers = users.map((user, index) =>
      index === existingIndex ? { ...user, ...nextProfile } : user
    );

    return saveUsers(nextUsers);
  }

  return saveUsers([nextProfile, ...users]);
};

export const recordUserLogin = (user, role = "customer") => {
  if (!user) {
    return [];
  }

  return upsertUserProfile({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    role,
    lastLoginAt: new Date().toISOString(),
  });
};
