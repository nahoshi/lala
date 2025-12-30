import CardLayout from "@/components/auth/card-layout";
import AuthLayout from "@/components/auth/layout";
import SignUpForm from "@/components/forms/sign-up";

export default function SignUp() {
  return (
    <AuthLayout
      textFixed="Sua nova"
      texts={["jornada", "batida", "história", "paixão", "vibe"]}
    >
      <CardLayout
        title="Bem vindo"
        description="Faça seu registro e dance com as ondas"
        footer={{
          text: "Possui uma conta?",
          linkText: "Fazer login",
          LinkHref: "/login",
        }}
      >
        <SignUpForm />
      </CardLayout>
    </AuthLayout>
  );
}
