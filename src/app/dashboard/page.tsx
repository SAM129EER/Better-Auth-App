import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { requireSession } from "@/lib/auth-session";

export default async function DashboardRoute() {
  const session = await requireSession({
    requireEmailVerified: true,
  });

  return <DashboardPage session={session} />;
}
