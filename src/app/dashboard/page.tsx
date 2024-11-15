"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold uppercase flex items-center gap-2">
            Dashboard
          </CardTitle>
          <CardDescription className="text-muted-foreground flex items-center gap-2">
            {user?.email || "Guest"}
          </CardDescription>
          <CardContent>
            <ul className="flex flex-col gap-4">
              {user?.photoURL && (
                <li>
                  <Image
                    src={user?.photoURL}
                    alt={`Photo de profil de ${user?.email}`}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </li>
              )}
              <li className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  <User />
                </span>
                <span className="text-sm">{user?.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Inscrit le{" "}
                  {user?.metadata.creationTime
                    ? new Intl.DateTimeFormat("fr-FR", {
                        dateStyle: "full",
                      }).format(new Date(user.metadata.creationTime))
                    : "inconnu"}
                </span>
              </li>
            </ul>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
}
