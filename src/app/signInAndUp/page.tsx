import { Button } from "@/components/ui/button";

export default function PageSignInAndUp() {
  return (
    <section className="w-full h-screen flex justify-center items-center flex-col gap-2">
      <h1 className="text-4xl font-bold">SignInAndUp</h1>
      <Button type="button" variant="outline">
        Continuer avec Google
      </Button>
      <Button type="button" variant="outline">
        Continuer avec Email
      </Button>
    </section>
  );
}
