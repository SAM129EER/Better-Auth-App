"use client";

import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthInputProps = ComponentProps<typeof Input> & {
  icon?: LucideIcon;
};

export function AuthInput({
  icon: Icon,
  className,
  type,
  ...props
}: AuthInputProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className="relative">
      {Icon ? (
        <Icon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground md:size-4" />
      ) : null}

      <Input
        type={inputType}
        className={cn(Icon && "pl-12", isPassword && "pr-12", className)}
        {...props}
      />

      {isPassword ? (
        <button
          type="button"
          onClick={() => setVisible((value) => !value)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="size-5 md:size-4" />
          ) : (
            <Eye className="size-5 md:size-4" />
          )}
        </button>
      ) : null}
    </div>
  );
}
