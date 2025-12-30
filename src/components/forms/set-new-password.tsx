"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSetNewPasswordValidator } from "@/lib/server/auth";
import ActionButton from "../auth/buttons/action";
import { useTransition } from "react";
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import PasswordInput from "../inputs/password";

type SetNewPasswordSchema = z.infer<typeof AuthSetNewPasswordValidator>;

export interface SetNewPasswordFormProps {
  token: string;
}

export default function SetNewPasswordForm({ token }: SetNewPasswordFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SetNewPasswordSchema>({
    resolver: zodResolver(AuthSetNewPasswordValidator),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SetNewPasswordSchema) => {
    clearErrors("root");
    startTransition(async () => {
      await authClient.resetPassword(
        {
          newPassword: data.password,
          token: token,
        },
        {
          onSuccess: () => {
            toast.success("Senha alterada com sucesso", {
              duration: 5000,
              action: {
                label: "Fazer login",
                onClick: () => {
                  redirect("/login");
                },
              },
            });
          },
          onError: (ctx) => {
            if (ctx.error.status === 400) {
              setError("root", { message: "Token invalido" });
            } else {
              setError("root", {
                message: "Erro inesperado. Tente novamente.",
              });
            }
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
      <PasswordInput
        label="Nova senha"
        error={errors.password?.message}
        placeholder="Sua senha super forte"
        {...register("password")}
      />
      <PasswordInput
        label="Confirme sua nova senha"
        error={errors.confirm_password?.message}
        placeholder="Sua senha super forte de novo"
        {...register("confirm_password")}
      />
      <div
        className="
          grid
          gap-2
        "
      >
        <ActionButton isPending={isPending} textPending="Alterando sua senha">
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
