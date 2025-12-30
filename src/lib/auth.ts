import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./server/resend";
import ResetPasswordEmail from "@/components/emails/reset-password";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    crossSiteCookies: true,
    database: {
      generateId: false,
    },
  },
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.RESEND_EMAIL!,
        to: user.email,
        subject: "Alteração da sua senha",
        react: ResetPasswordEmail({
          name: user.name,
          url: url.replace("/api/auth", ""),
        }),
      });
    },
    resetPasswordTokenExpiresIn: 60 * 60 * 3,
  },
  socialProviders: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    },
  },
});
