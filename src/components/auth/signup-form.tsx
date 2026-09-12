"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema, type SignupSchema } from "@/lib/validation/authSchema";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export function SignupForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignupSchema) {
    setServerError(null);

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(error.message || "Something went wrong");
      return;
    }

    setVerificationSent(true);
  }

  if (verificationSent) {
    return (
      <div className="space-y-3 text-center text-sm">
        <p className="font-medium text-foreground">Check your inbox</p>
        <p className="text-muted-foreground">
          We sent you a verification link. Verify your email before signing in.
        </p>
      </div>
    );
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
          htmlFor="signup-name"
          className="text-sm font-medium text-foreground"
        >
          Name
        </FieldLabel>

        <FieldContent className="gap-0.5">
          <Input
            id="signup-name"
            placeholder="John Doe"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />

          <FieldError>{errors.name?.message}</FieldError>
        </FieldContent>
      </Field>

      <Field className="gap-1.5">
        <FieldLabel
          htmlFor="signup-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </FieldLabel>

        <FieldContent className="gap-0.5">
          <Input
            id="signup-email"
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
          htmlFor="signup-password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </FieldLabel>

        <FieldContent className="gap-0.5">
          <Input
            id="signup-password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            {...register("password")}
          />

          <FieldError>{errors.password?.message}</FieldError>
        </FieldContent>
      </Field>

      <Field className="gap-1.5">
        <FieldLabel
          htmlFor="signup-confirm-password"
          className="text-sm font-medium text-foreground"
        >
          Confirm Password
        </FieldLabel>

        <FieldContent className="gap-0.5">
          <Input
            id="signup-confirm-password"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            aria-invalid={!!errors.confirmPassword}
            {...register("confirmPassword")}
          />

          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </FieldContent>
      </Field>

      <Button
        type="submit"
        className="h-9 w-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
