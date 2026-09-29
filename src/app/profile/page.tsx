import { requireSession } from "@/lib/auth-session";
import React from "react";

const page = async () => {
  const session = await requireSession({ requireEmailVerified: true });

  return (
    <div>
     <h1>This is Profile page </h1>
    </div>
  );
};

export default page;
