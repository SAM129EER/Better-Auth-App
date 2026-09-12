"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { SocialLogins } from "@/components/auth/social-logins";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AuthMode = "login" | "signup";

type AuthModalProps = {
  initialMode?: AuthMode;
  defaultOpen?: boolean;
};

export function AuthModal({
  initialMode = "login",
  defaultOpen = false,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <Dialog defaultOpen={defaultOpen}>
      <div className="flex gap-3">
        <DialogTrigger
          render={<Button size="lg" />}
          onClick={() => setMode("login")}
        >
          Sign In
        </DialogTrigger>
        <DialogTrigger
          render={<Button size="lg" variant="outline" />}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </DialogTrigger>
      </div>

      <DialogContent className="gap-5 rounded-2xl p-7 sm:max-w-[440px]">
        <DialogHeader className="items-center pr-8 text-center">
          <DialogTitle className="text-xl tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="max-w-xs">
            {mode === "login"
              ? "Sign in to your account"
              : "Sign up to get started"}
          </DialogDescription>
        </DialogHeader>

        <SocialLogins />

        <div className="relative py-1">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-popover px-3 text-sm text-muted-foreground">
            or
          </span>
        </div>

        {mode === "login" ? <LoginForm /> : <SignupForm />}

        <div className="text-center text-sm text-muted-foreground">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 font-medium"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
