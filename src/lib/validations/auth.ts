import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({
    message: '有効なメールアドレスを入力してください',
  }),
  password: z.string().min(6, {
    message: 'パスワードは6文字以上である必要があります',
  }),
});

export const signUpSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, {
    message: 'パスワードは6文字以上である必要があります',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'パスワードが一致しません',
  path: ['confirmPassword'],
});
