import { Button } from "@/components/ui/button";
import { Plus, Settings, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
// import { auth } from "../../firebase/configFirebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Button variant="ghost">
            <Settings className="w-4 h-4" />
          </Button>
        </Link>
        <Link href="/dashboard/createArticle">
          <Button variant="ghost">
            <Plus className="w-4 h-4" />
          </Button>
        </Link>
      </div>
      <Button variant="ghost" onClick={handleSignOut}>
        <LogOut className="w-4 h-4" />
      </Button>
    </nav>
  );
}
