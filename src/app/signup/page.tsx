import { SignupForm } from "@/components/auth/signup-form";
import { SocialLogins } from "@/components/auth/social-logins";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-8 shadow-sm">
        <h1 className="mb-2 text-center text-3xl font-bold">Create Account</h1>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Sign up to get started
        </p>

        <SocialLogins />

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
            or
          </span>
        </div>

        <SignupForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
