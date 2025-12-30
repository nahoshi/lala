"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSignInValidator } from "@/lib/server/auth";
import { authClient } from "@/lib/authClient";
import SpotifyButton from "../auth/buttons/spotify";
import ActionButton from "../auth/buttons/action";
import { useTransition } from "react";
import Input from "../inputs/input";
import PasswordInput from "../inputs/password";
import Link from "next/link";

type SignInSchema = z.infer<typeof AuthSignInValidator>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(AuthSignInValidator),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SignInSchema) => {
    clearErrors("root");
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            if (ctx.error.status === 401) {
              setError("root", { message: "Email ou senha incorretos." });
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
          gap-1
        "
      >
        <PasswordInput
          label="Senha"
          error={errors.password?.message}
          placeholder="Sua melhor senha"
          {...register("password")}
        />
        <Link
          href="/reset-password"
          className="
            inline-block
            text-chart-4 text-sm text-end
            underline-offset-4 hover:underline
          "
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <div
        className="
          flex flex-col
          gap-2
        "
      >
        <ActionButton isPending={isPending} textPending="Entrando na sua conta">
          Entrar
        </ActionButton>
        <SpotifyButton>Entrar com spotify</SpotifyButton>
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
