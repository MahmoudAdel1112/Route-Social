import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' }),
  rePassword: z.string().min(1, { message: 'Please confirm your password' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Please select a gender' }) }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"], // path of error
});
