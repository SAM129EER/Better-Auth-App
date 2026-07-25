"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

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

    router.push("/");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {serverError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <Field>
        <FieldLabel>Name</FieldLabel>

        <FieldContent>
          <Input
            placeholder="John Doe"
            {...register("name")}
          />

          <FieldError>{errors.name?.message}</FieldError>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>

        <FieldContent>
          <Input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
          />

          <FieldError>{errors.email?.message}</FieldError>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Password</FieldLabel>

        <FieldContent>
          <Input
            type="password"
            placeholder="********"
            {...register("password")}
          />

          <FieldError>{errors.password?.message}</FieldError>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Confirm Password</FieldLabel>

        <FieldContent>
          <Input
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
          />

          <FieldError>
            {errors.confirmPassword?.message}
          </FieldError>
        </FieldContent>
      </Field>

      <Button
        className="w-full cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}