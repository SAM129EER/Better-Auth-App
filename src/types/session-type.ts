import { authClient } from "@/lib/auth-client";

export type SessionType = NonNullable<
  Awaited<ReturnType<typeof authClient.getSession>>["data"]
>;