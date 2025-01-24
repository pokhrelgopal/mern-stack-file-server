import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  otp: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const userUpdateSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  otp: z.string().nullable().optional(),
  isVerified: z.boolean().optional(),
  resetToken: z.string().nullable().optional(),
  resetTokenExpires: z.date().nullable().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"]).optional(),
});

const verifyUserSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const setNewPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
});

const queryParamSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  page: z.string().optional(),
  limit: z.string().optional(),
});

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;
type UserUpdateData = z.infer<typeof userUpdateSchema>;
type VerifyUserData = z.infer<typeof verifyUserSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
type SetNewPasswordData = z.infer<typeof setNewPasswordSchema>;
type QueryParamData = z.infer<typeof queryParamSchema>;

export {
  registerSchema,
  loginSchema,
  userUpdateSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  setNewPasswordSchema,
  queryParamSchema,
};

export {
  type RegisterData,
  type LoginData,
  type UserUpdateData,
  type VerifyUserData,
  type ForgotPasswordData,
  type SetNewPasswordData,
  type QueryParamData,
};
