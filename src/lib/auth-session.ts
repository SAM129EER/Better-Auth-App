import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

type RequireSessionOptions = {
  requireEmailVerified?: boolean;
  redirectTo?: string;
};

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession({
  requireEmailVerified = false,
  redirectTo = "/login",
}: RequireSessionOptions = {}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect(redirectTo);
  }

  if (requireEmailVerified && !session.user.emailVerified) {
    redirect("/login?error=email-not-verified");
  }

  return session;
}
