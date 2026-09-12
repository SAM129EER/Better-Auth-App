import { AuthModal } from "@/components/auth/auth-modal";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <AuthModal initialMode="login" defaultOpen />
    </main>
  );
}
