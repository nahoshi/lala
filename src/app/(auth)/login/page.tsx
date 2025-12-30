import LoginForm from "@/components/forms/login";
import CardLayout from "@/components/auth/card-layout";
import AuthLayout from "@/components/auth/layout";

export default function Login() {
  return (
    <AuthLayout
      textFixed="Onde a música"
      texts={["te encontra", "ganha vida", "faz sentido", "se renova", "mora"]}
    >
      <CardLayout
        title="Bem vindo de volta"
        description="Faça login para poder me escutar"
        footer={{
          text: "Não possui uma conta?",
          linkText: "Registre-se",
          LinkHref: "/sign-up",
        }}
      >
        <LoginForm />
      </CardLayout>
    </AuthLayout>
  );
}
