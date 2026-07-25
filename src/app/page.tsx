"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">BetterAuth App</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Secure authentication with email, GitHub, and Google
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/login">
            <Button size="lg" className="cursor-pointer">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="cursor-pointer">
              Sign Up
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="w-full max-w-lg rounded-xl border p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back!
          </p>
        </div>

        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name}
                className="size-14 rounded-full border"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {session.user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold truncate">{session.user.name}</p>
              <p className="text-sm text-muted-foreground truncate">{session.user.email}</p>
            </div>
          </div>

          <div className="space-y-2 border-t pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-xs truncate ml-4 max-w-[200px]">{session.user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Verified</span>
              <span>{session.user.emailVerified ? "✅ Yes" : "❌ No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span>{new Date(session.user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <Button
          className="mt-6 w-full cursor-pointer"
          variant="destructive"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </main>
  );
}
