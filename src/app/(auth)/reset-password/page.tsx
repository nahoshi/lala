"use client";

import CardLayout from "@/components/auth/card-layout";
import AuthLayout from "@/components/auth/layout";
import ResetPasswordForm from "@/components/forms/reset-password";

export default function ResetPassword() {
  return (
    <AuthLayout
      textFixed="Não perca o"
      texts={["seu ritmo", "seu som", "seu foco", "seu acesso"]}
    >
      <CardLayout
        title="Recupere sua senha"
        description="Use seu email para recuperar sua senha"
      >
        <ResetPasswordForm />
      </CardLayout>
    </AuthLayout>
  );
}
