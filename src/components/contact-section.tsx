"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
});

const socialIcons = {
  twitter: Icons.twitter,
  github: Icons.github,
  linkedin: Icons.linkedin,
} as const;

export const ContactSection = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="container-custom">
        {/* En-tête */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="mb-4">Contact</Badge>
          <h2>Contactez-nous</h2>
          <p className="text-gray-600 max-w-[600px] mx-auto">
            Vous avez une question sur la santé et la longévité ? N'hésitez pas
            à nous contacter via le formulaire ci-dessous ou les réseaux
            sociaux.
          </p>
        </div>

        {/* Contenu principal */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Formulaire */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Votre message..."
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full sm:w-auto">
                    Envoyer le message
                  </Button>
                </form>
              </Form>
            </div>

            {/* Informations de contact */}
            <div className="lg:pl-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8">
                {/* Réseaux sociaux */}
                <div className="space-y-4">
                  <h3>Suivez-nous</h3>
                  <div className="flex gap-4">
                    {["twitter", "github", "linkedin"].map((social) => (
                      <Button
                        key={social}
                        variant="outline"
                        size="icon"
                        className="hover:bg-gray-100 transition-colors"
                      >
                        {React.createElement(
                          socialIcons[social as keyof typeof socialIcons]
                        )}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-4">
                  <h3>Email</h3>
                  <a
                    href="mailto:contact@votreblog.com"
                    className="text-gray-600 hover:text-blue-600 transition-colors block"
                  >
                    contact@votreblog.com
                  </a>
                </div>

                {/* Horaires */}
                <div className="space-y-4">
                  <h3>Horaires</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Samedi - Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
