"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../inputs/input";
import { AuthSignUpValidator } from "@/lib/server/auth";
import { authClient } from "@/lib/authClient";
import SpotifyButton from "../auth/buttons/spotify";
import { useTransition } from "react";
import ActionButton from "../auth/buttons/action";
import PasswordInput from "../inputs/password";

type SignUpSchema = z.infer<typeof AuthSignUpValidator>;

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(AuthSignUpValidator),
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: SignUpSchema) => {
    clearErrors();
    startTransition(async () => {
      await authClient.signUp.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            if (
              ctx.error.status === 422 ||
              ctx.error.code === "USER_ALREADY_EXISTS"
            ) {
              alert("a");
              setError("email", {
                type: "manual",
                message: "Este e-mail já está em uso.",
              });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        disabled={isPending}
        className="
          flex flex-col
          gap-4
        "
      >
        <Input
          type="text"
          label="Nome"
          error={errors.name?.message}
          placeholder="Seu melhor nome"
          {...register("name")}
        />
        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          placeholder="m@example.com"
          {...register("email")}
        />
        <PasswordInput
          label="Senha"
          error={errors.password?.message}
          placeholder="Sua melhor senha"
          {...register("password")}
        />
        <div
          className="
            flex flex-col
            gap-2
          "
        >
          <ActionButton isPending={isPending} textPending="Criando sua conta">
            Cadastrar
          </ActionButton>
          <SpotifyButton>Cadastrar com spotify</SpotifyButton>
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
      </fieldset>
    </form>
  );
}
