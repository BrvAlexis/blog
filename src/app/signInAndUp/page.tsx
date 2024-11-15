"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function PageSignInAndUp() {
  const { signInWithGoogle, signInWithEmail, redirectToSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("PageSignInAndUp is mounted");
    // redirectToSignIn();
  }, [redirectToSignIn]);

  return (
    <section className="w-full h-screen flex justify-center items-center flex-col gap-2">
      <h1 className="text-4xl font-bold">SignInAndUp</h1>
      <Button type="button" variant="outline" onClick={signInWithGoogle}>
        Continuer avec Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => signInWithEmail(email, password)}
      >
        Continuer avec Email
      </Button>
    </section>
  );
}
