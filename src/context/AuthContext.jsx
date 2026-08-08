import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { auth, db } from "../firebase";
import {
  getStoredAdminEmails,
  isAdminEmail,
  normalizeAdminEmails,
  saveStoredAdminEmails,
  syncAdminEmailsToFirestore,
} from "../utils/admin";
import { hydrateProductsFromFirestore } from "../utils/products";
import { hydrateOrdersFromFirestore } from "../utils/orders";
import { hydrateAdminEmailsFromFirestore } from "../utils/admin";
import { hydrateCouponsFromFirestore } from "../utils/coupons";
import { recordUserLogin, upsertUserProfile } from "../utils/users";

export const AuthContext =
  createContext();

const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [adminEmails, setAdminEmails] =
    useState(() => getStoredAdminEmails());

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  useEffect(() => {
    void hydrateProductsFromFirestore();
    void hydrateOrdersFromFirestore();
    void hydrateAdminEmailsFromFirestore();
    void hydrateCouponsFromFirestore();
  }, []);

  useEffect(() => {
    const adminDocRef = doc(db, "settings", "adminAccess");

    const unsubscribe = onSnapshot(
      adminDocRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          return;
        }

        const nextEmails = normalizeAdminEmails(
          snapshot.data()?.emails || []
        );

        if (nextEmails.length > 0) {
          setAdminEmails(nextEmails);
          saveStoredAdminEmails(nextEmails);
        }
      },
      () => {
        setAdminEmails(getStoredAdminEmails());
      }
    );

    return unsubscribe;
  }, []);

  const updateAdminEmails = async (emails) => {
    const nextEmails = normalizeAdminEmails(emails);

    setAdminEmails(nextEmails);
    saveStoredAdminEmails(nextEmails);
    await syncAdminEmailsToFirestore(nextEmails);

    return nextEmails;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(
        userCredential.user,
        {
          displayName: name,
        }
      );

      setUser({
        ...userCredential.user,
        displayName: name,
      });

      const role = isAdminEmail(email, adminEmails)
        ? "admin"
        : "customer";

      upsertUserProfile({
        uid: userCredential.user.uid,
        name,
        email,
        role,
        lastLoginAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async (
    email,
    password
  ) => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const role = isAdminEmail(email, adminEmails)
        ? "admin"
        : "customer";

      recordUserLogin(userCredential.user, role);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        adminEmails,
        updateAdminEmails,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;