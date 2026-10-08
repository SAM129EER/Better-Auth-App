import { requireSession } from "@/lib/auth-session";
import React from "react";

const page = async () => {
  const session = await requireSession({ requireEmailVerified: true });

  return (
    <div>
     <h1 className={"min-h-screen flex items-center justify-center text-3xl"}>Hello,{session.user?.name}</h1>
    </div>
  );
};

export default page;
