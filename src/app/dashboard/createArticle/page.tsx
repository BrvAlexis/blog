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
    try {
      let imageUrl = "";
      if (file) {
        const imageRef = ref(storage, `articlesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      }
      await addArticle({
        ...formData,
        image: imageUrl,
        authorId: user?.uid as string,
        authorName: user?.displayName as string,
        createdAt: new Date().toISOString(),
      });
      setImagePreview(undefined);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
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
          <Input
            type="file"
            accept="image/gif, image/jpeg, image/png, image/webp"
            id="image"
            className="cursor-pointer"
            {...register("image", { onChange: handleChange })}
          />
          {imagePreview && (
            <img
              className="w-full h-full object-cover"
              src={imagePreview}
              alt="Image Preview"
            />
          )}

          <Label htmlFor="category">Category</Label>
          <Textarea id="category" {...register("category")} />

          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <div className="flex items-center justify-between">
            <Button type="button" variant="outline">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit">
              <Link href="/dashboard">Create Article</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
