import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "A senha deve ter pelo menos 8 caracteres")
  .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "Deve conter pelo menos um número")
  .regex(/[\W_]/, "Deve conter pelo menos um caractere especial");
const emailSchema = z.email("E-mail inválido");

export const LoginValidator = z.object({
  email: emailSchema,
  password: z.string().min(1, "A senha é obrigatória"),
});

export const SignUpValidator = z.object({
  name: z.string().min(5, "Nome deve ter pelo menos 5 caracteres"),
  email: emailSchema,
  password: passwordSchema,
});

export const ResetPasswordValidator = z.object({
  email: emailSchema,
});

export const SetNewPasswordValidator = z
  .object({
    password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });

export type LoginData = z.infer<typeof LoginValidator>;
export type SignUpData = z.infer<typeof SignUpValidator>;
export type ResetPasswordData = z.infer<typeof ResetPasswordValidator>;
export type SetNewPasswordData = z.infer<typeof SetNewPasswordValidator>;
