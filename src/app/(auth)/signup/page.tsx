import { AuthModal } from "@/components/auth/auth-modal";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <AuthModal initialMode="signup" defaultOpen />
    </main>
  );
}
