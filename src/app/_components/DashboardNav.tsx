"use client";

import { Button } from "@/components/ui/button";
import { Plus, Settings, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/configFirebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/hooks/useAdmin";
import { useToast } from "@/hooks/use-toast";

export default function DashboardNav() {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
        </Link>
        <Link href="/dashboard/createArticle">
          <Button variant="ghost" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouvel Article</span>
          </Button>
        </Link>
      </div>
      <Button 
        variant="ghost" 
        onClick={handleSignOut}
        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Déconnexion</span>
      </Button>
    </nav>
  );
}
