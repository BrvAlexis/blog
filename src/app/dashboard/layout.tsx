"use client";
import ProtectedRoutes from "@/app/_components/protectedroutes";
import DashboardNav from "@/app/_components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <section className="w-full h-screen">
        <DashboardNav />
        {children}
      </section>
    </ProtectedRoutes>
  );
}
