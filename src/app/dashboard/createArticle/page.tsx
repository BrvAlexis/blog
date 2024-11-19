"use client";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/configFirebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFirebase } from "@/app/context/articleContext";
import { articleSchema } from "@/schema/schemas";
import { DataFormType } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateArticle() {
  const [file, setFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const { user } = useAuth();
  const router = useRouter();
  const { addArticle } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<DataFormType>({
    resolver: yupResolver(articleSchema),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    console.log("Début de la soumission", formData);

    if (!user) {
      setError("Vous devez être connecté pour créer un article");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = "";
      if (file) {
        const imageRef = ref(
          storage,
          `articlesImages/${Date.now()}-${file.name}`
        );
        const uploadResult = await uploadBytes(imageRef, file);
        console.log("Upload réussi:", uploadResult);
        imageUrl = await getDownloadURL(imageRef);
        console.log("URL de l'image:", imageUrl);
      }

      const articleData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: imageUrl,
        authorId: user.uid,
        authorName: user.displayName || "Anonyme",
        createdAt: new Date().toISOString(),
      };

      console.log("Données à envoyer:", articleData);
      await addArticle(articleData);
      console.log("Article créé avec succès");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erreur complète:", error);
      setError(error.message || "Erreur lors de la création de l'article");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Titre</Label>
          <Input type="text" id="title" {...register("title")} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <Label htmlFor="image">Image</Label>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png, image/webp"
            id="image"
            className="cursor-pointer"
            onChange={handleChange}
          />
          {imagePreview && (
            <img
              className="w-full h-full object-cover"
              src={imagePreview}
              alt="Aperçu de l'image"
            />
          )}

          <Label htmlFor="category">Catégorie</Label>
          <Textarea id="category" {...register("category")} />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <div className="flex items-center justify-between mt-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard">Annuler</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer l'article"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
