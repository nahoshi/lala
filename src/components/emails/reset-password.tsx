import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  url: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https:/localhost:3000";

export const ResetPasswordEmail = ({ name, url }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Body className="bg-gray-100">
          <Preview>
            Você solicitou a alteração da senha da sua conta Lala.
          </Preview>
          <Container className="max-w-lg my-7.5 mx-auto bg-white">
            <Section className="p-6">
              <Row>
                <Column align="center">
                  <Img
                    src="https://i.ibb.co/ptYsPXr/audio-waveform-1.png"
                    alt="Lala logo"
                    width={40}
                    height={40}
                  />
                </Column>
              </Row>
            </Section>
            <Section className="w-full">
              <Row>
                <Column className="border-b border-gray-200 w-5/12" />
                <Column className="border-b border-purple-500 w-2/12" />
                <Column className="border-b border-gray-200 w-5/12" />
              </Row>
            </Section>
            <Section className="px-5 py-2.5">
              <Text className="leading-normal">Olá {name},</Text>
              <Text className="leading-normal">
                Alguém solicitou recentemente a alteração da senha da sua conta
                Lala. Se foi você, pode definir uma nova senha aqui:
              </Text>
              <Button
                className="bg-purple-500 font-semibold mx-auto rounded-md text-sm text-white text-center block max-w-52 py-3.5 px-2"
                href={url}
              >
                Alterar sua senha
              </Button>
              <Text className="leading-normal">
                Se você não usar este link dentro de 3 horas, ele expirará.{" "}
                <Link href={`${baseUrl}/reset-password`}>
                  Clique aqui para obter um novo link de redefinição de senha.
                </Link>
              </Text>
              <Text className="leading-normal">
                Obrigado,
                <br />
                Lala time de suporte
              </Text>
            </Section>
          </Container>

          <Section className="max-w-lg mx-auto">
            <Row>
              <Text className="text-center text-gray-500">
                © 2025 Lala, Todos os direitos reservados.
              </Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

ResetPasswordEmail.PreviewProps = {
  name: "Risia laila",
  url: baseUrl,
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;
