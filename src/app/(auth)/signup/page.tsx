import { redirect } from "next/navigation";

import { AuthModal } from "@/components/auth/auth-modal";
import { getCurrentSession } from "@/lib/auth-session";

export default async function SignupPage() {
  const session = await getCurrentSession();

  if (session?.user.emailVerified) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <AuthModal initialMode="signup" defaultOpen />
    </main>
  );
}
