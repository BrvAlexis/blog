"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) router.push("/signInAndUp");
  }, [user, router, loading]);

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return children;
}
