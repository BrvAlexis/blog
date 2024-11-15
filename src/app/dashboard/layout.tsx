"use client";
import ProtectedRoutes from "../components/protectedroutes";
import DashboardNav from "../components/DashboardNav";

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
