"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthResetPasswordValidator } from "@/lib/server/auth";
import ActionButton from "../auth/buttons/action";
import { useTransition } from "react";
import Input from "../inputs/input";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";

type SignInSchema = z.infer<typeof AuthResetPasswordValidator>;

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(AuthResetPasswordValidator),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SignInSchema) => {
    clearErrors("root");
    startTransition(async () => {
      await authClient.requestPasswordReset(
        {
          email: data.email,
        },
        {
          onResponse: () => {
            toast.success("Enviaremos um email se essa conta existir");
          },
          onError: () => {
            setError("root", {
              message: "Erro inesperado. Tente novamente.",
            });
          },
        }
      );
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        flex flex-col
        gap-6
      "
    >
      <Input
        type="email"
        label="Email"
        error={errors.email?.message}
        placeholder="m@example.com"
        {...register("email")}
      />
      <div
        className="
          grid
          gap-2
        "
      >
        <ActionButton isPending={isPending} textPending="Enviando email">
          Alterar sua senha
        </ActionButton>
        {errors.root ? (
          <span
            className="
              text-sm text-center text-destructive font-medium
            "
          >
            {errors.root.message}
          </span>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
