import CardLayout from "@/components/auth/card-layout";
import AuthLayout from "@/components/auth/layout";
import SetNewPasswordForm from "@/components/forms/set-new-password";

export interface SetNewPasswordProps {
  params: Promise<{ token: string }>;
}

export default async function SetNewPassword({ params }: SetNewPasswordProps) {
  const { token } = await params;

  return (
    <AuthLayout
      textFixed="Sua música"
      texts={["mais segura", "bem guardada", "está de volta", "te espera"]}
    >
      <CardLayout
        title="Altere sua senha"
        description="Insira sua nova senha e a confirme"
      >
        <SetNewPasswordForm token={token} />
      </CardLayout>
    </AuthLayout>
  );
}
