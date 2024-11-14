"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/configFirebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const providerGoogle = new GoogleAuthProvider();
const providerEmail = new EmailAuthProvider();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      setUser(result.user);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithEmail = async () => {
    try {
      const result = await signInWithPopup(auth, providerEmail);
      setUser(result.user);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const redirectToSignIn = () => {
    if (user) {
      router.push("/");
    } else {
      router.push("/signInAndUp");
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    redirectToSignIn,
  };
};
