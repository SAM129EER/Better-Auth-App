"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import {SessionType} from "@/types/session-type"

type DashboardPageProps = {
  session: SessionType;
};

export function DashboardPage({ session }: DashboardPageProps) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/login");
          router.refresh();
        },
      },
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="w-full max-w-lg rounded-xl border p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back!</p>
        </div>

        <div className="space-y-4 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-4">
            {session.user.image ? (
              // OAuth avatars come from arbitrary provider hosts, so keep this as
              // a plain image instead of expanding Next image remote patterns.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
                className="size-14 rounded-full border"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {session.user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-semibold">{session.user.name}</p>
              <p className="truncate text-sm text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </div>

          <div className="space-y-2 border-t pt-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="ml-4 max-w-50 truncate font-mono text-xs">
                {session.user.id}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email Verified</span>
              <span>{session.user.emailVerified ? "Yes" : "No"}</span>
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
