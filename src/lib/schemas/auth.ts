import { z } from "zod";

const password_validator = z
  .string()
  .min(8, "A senha exige 8 caracteres mínimos.")
  .max(100, "A senha exige 100 caracteres no máximo.");

export const AuthLoginValidator = z.object({
  email: z.email("Insira um email valido."),
  password: password_validator,
});

export const AuthSingUpValidator = z.object({
  name: z
    .string()
    .min(5, "O nome exige 5 caracteres mínimos.")
    .max(30, "O nome exige 30 caracteres máximos."),
  email: z.email("Insira um email valido."),
  password: password_validator,
});
