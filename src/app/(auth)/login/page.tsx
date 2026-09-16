import { redirect } from "next/navigation";

import { AuthModal } from "@/components/auth/auth-modal";
import { getCurrentSession } from "@/lib/auth-session";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getCurrentSession();

  if (session?.user.emailVerified) {
    redirect("/dashboard");
  }

  const { error } = await searchParams;
  const showEmailVerificationMessage = error === "email-not-verified";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      {showEmailVerificationMessage && (
        <p className="max-w-sm rounded-md border bg-muted/50 p-3 text-center text-sm text-muted-foreground">
          Verify your email before opening the dashboard.
        </p>
      )}

      <AuthModal initialMode="login" defaultOpen />
    </main>
  );
}
