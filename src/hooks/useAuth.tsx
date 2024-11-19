"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/configFirebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { Skeleton } from "@/components/ui/skeleton";

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope("profile");
providerGoogle.addScope("email");
providerGoogle.setCustomParameters({
  prompt: "select_account",
});

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuthError = (error: any) => {
    console.error("Erreur d'authentification:", error);
    setError(error.message);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, providerGoogle);

      if (result.user) {
        console.log("Google Sign In Result:", {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        });

        if (!result.user.photoURL || !result.user.displayName) {
          const googleUser = GoogleAuthProvider.credentialFromResult(result);
          if (googleUser) {
            await updateProfile(result.user, {
              displayName:
                result.user.displayName || result.user.email?.split("@")[0],
              photoURL:
                result.user.photoURL ||
                `https://ui-avatars.com/api/?name=${
                  result.user.email?.split("@")[0]
                }`,
            });
          }
        }

        setUser(result.user);
      }

      setError(null);
      router.push("/dashboard");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setError(null);
      router.push("/dashboard");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      setError(null);
      router.push("/");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const refreshedUser = auth.currentUser;
        if (refreshedUser) {
          await refreshedUser.reload();
          setUser(refreshedUser);
          console.log("Updated user data:", {
            displayName: refreshedUser.displayName,
            email: refreshedUser.email,
            photoURL: refreshedUser.photoURL,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const redirectToSignIn = () => {
    router.push(user ? "/dashboard" : "/signInAndUp");
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signOut,
    redirectToSignIn,
    LoadingSkeleton: () => (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ),
  };
};
