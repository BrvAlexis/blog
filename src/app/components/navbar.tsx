"use client";
import { useEffect, useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className={`
      sticky top-0 z-50 w-full flex justify-center
      ${!isScrolled ? 'pt-4' : 'pt-0'} transition-all duration-300
    `}>
      <nav className={`
        navbar flex justify-between items-center p-4 bg-white/80 dark:bg-gray-800/80 
        backdrop-blur-sm shadow-md transition-all duration-300
        ${isScrolled ? 'w-full' : 'w-2/3'}
      `}>
        <Link href="/">
          <span className="text-xl font-semibold text-gray-800 dark:text-white hover:text-indigo-500 transition-colors duration-200">
            Secrets de Longévité
          </span>
        </Link>
        <div className="navbar-left flex flex-wrap items-center justify-between">
          <div className="hidden md:flex space-x-4">
            <Link href="/articles">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                Articles
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                À propos
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                Contact
              </span>
            </Link>
          </div>
        </div>
        <div className="navbar-right flex items-center space-x-4">
          <ModeToggle />
          {user ? (
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
          ) : (
            <Link href="/signInAndUp">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                <User />
              </span>
            </Link>
          )}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 focus:outline-none"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {isMobileMenuOpen && (
        <div className={`
          absolute top-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md md:hidden
          ${isScrolled ? 'w-full' : 'w-2/3'}
        `}>
          <div className="flex flex-col space-y-2 p-4">
            <Link href="/articles">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                Articles
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                À propos
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-200">
                Contact
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
