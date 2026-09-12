"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { loginSchema, type LoginSchema } from "@/lib/validation/authSchema";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    setServerError(null);

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message || "Invalid email or password");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      {serverError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <Field className="gap-1.5">
        <FieldLabel
          htmlFor="login-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </FieldLabel>

        <FieldContent className="gap-0.5">
          <Input
            id="login-email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />

          <FieldError>{errors.email?.message}</FieldError>
        </FieldContent>
      </Field>

      <Field className="gap-1.5">
        <FieldLabel
          htmlFor="login-password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </FieldLabel>

        <FieldContent className="gap-0.5">
          <Input
            id="login-password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          <FieldError>{errors.password?.message}</FieldError>
        </FieldContent>
      </Field>

      <Button
        type="submit"
        className="h-9 w-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
