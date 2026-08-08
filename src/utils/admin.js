import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SPECIAL_ADMIN_EMAILS = ["omarwafs65@gmail.com"];
const ADMIN_EMAILS_KEY = "specialAdminEmails";
const ADMIN_SETTINGS_DOC = doc(db, "settings", "adminAccess");

export const normalizeEmail = (email) =>
  email?.trim().toLowerCase() || "";

export const normalizeAdminEmails = (emails = []) => {
  const uniqueEmails = new Set();

  emails.forEach((email) => {
    const normalizedEmail = normalizeEmail(email);

    if (normalizedEmail) {
      uniqueEmails.add(normalizedEmail);
    }
  });

  return Array.from(uniqueEmails);
};

export const getStoredAdminEmails = () => {
  try {
    const storedEmails = localStorage.getItem(ADMIN_EMAILS_KEY);

    if (!storedEmails) {
      return SPECIAL_ADMIN_EMAILS;
    }

    const parsedEmails = JSON.parse(storedEmails);

    return normalizeAdminEmails(
      Array.isArray(parsedEmails) ? parsedEmails : SPECIAL_ADMIN_EMAILS
    );
  } catch {
    return SPECIAL_ADMIN_EMAILS;
  }
};

export const saveStoredAdminEmails = (emails) => {
  const nextEmails = normalizeAdminEmails(emails);
  localStorage.setItem(ADMIN_EMAILS_KEY, JSON.stringify(nextEmails));
  return nextEmails;
};

export const syncAdminEmailsToFirestore = async (emails) => {
  const nextEmails = normalizeAdminEmails(emails);

  try {
    await setDoc(
      ADMIN_SETTINGS_DOC,
      {
        emails: nextEmails,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch {
    return nextEmails;
  }

  return nextEmails;
};

export const isAdminEmail = (email, adminEmails = getStoredAdminEmails()) => {
  const normalizedEmail = normalizeEmail(email);

  return normalizeAdminEmails(adminEmails).includes(normalizedEmail);
};

export const isAdminUser = (user, adminEmails = getStoredAdminEmails()) => {
  if (!user) {
    return false;
  }

  return isAdminEmail(user.email, adminEmails);
};

export const adminDashboardPath = "/admin";
