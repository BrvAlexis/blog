"use client";
import { ModeToggle } from "@/app/components/toggle-dark-light";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoogleAuthProvider } from "firebase/auth";

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope("profile");
providerGoogle.addScope("email");

export default function Navbar() {
  const { user, loading, signOut, LoadingSkeleton } = useAuth();

  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <nav className="navbar flex justify-between items-center p-4 bg-white dark:bg-gray-800">
      <div className="navbar-left flex items-center space-x-4">
        <Link href="/">
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            HealthBlog
          </span>
        </Link>
        <Link href="/articles">
          <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Articles
          </span>
        </Link>
        <Link href="/about">
          <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            À propos
          </span>
        </Link>
        <Link href="/contact">
          <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            Contact
          </span>
        </Link>
      </div>
      <div className="navbar-right flex items-center space-x-4">
        <ModeToggle />
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    user.photoURL ??
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.email?.split("@")[0] || "U"
                    )}`
                  }
                  alt={user.displayName || user.email || "Avatar utilisateur"}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.email?.split("@")[0] || "U"
                    )}`;
                  }}
                />
                <AvatarFallback>
                  {user.displayName?.[0]?.toUpperCase() ||
                    user.email?.[0]?.toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/dashboard">Tableau de bord</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={signOut}>Déconnexion</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!user && (
          <Link href="/signInAndUp">
            <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <User />
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
