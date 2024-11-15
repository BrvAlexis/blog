"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/hooks/useAuth";
import { User, Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useFirebase } from "@/app/context/articleContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user } = useAuth();
  const { articles, deleteArticle } = useFirebase();

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
      <div className="flex flex-col space-y-4 mt-4 p-3">
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="text-muted-foreground">Vos post publiées</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((item, index) => (
            <Card key={index} className="p-3">
              <div className="flex flex-col gap-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Link href={`/dashboard/articleUser/${item.id}`}>
                  <Edit />
                </Link>
                <Button
                  className="hover:bg-red-500 hover:text-white"
                  variant="destructive"
                  onClick={() => deleteArticle(item.id)}
                >
                  <Trash />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
