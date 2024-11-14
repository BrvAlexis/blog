import { ModeToggle } from "@/app/components/toggle-dark-light";
import Link from "next/link";
import { User } from "lucide-react";

export default function Navbar() {
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

        <Link href="/signInAndUp">
          <span className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
            <User />
          </span>
        </Link>
      </div>
    </nav>
  );
}
