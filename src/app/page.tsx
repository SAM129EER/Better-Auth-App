import { redirect } from "next/navigation";

import { AuthModal } from "@/components/auth/auth-modal";
import { getCurrentSession } from "@/lib/auth-session";

export default async function HomePage() {
  const session = await getCurrentSession();

  if (session?.user.emailVerified) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">BetterAuth App</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Secure authentication with email, GitHub, and Google
        </p>
      </div>

      <AuthModal />
    </main>
  );
}
