import * as z from "zod";

const registerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long"),
});

const verifyEmailSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const OtpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
  email: z.string().email("Invalid email address"),
});
const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Fullname must be at least 3 characters")
    .max(50, "Fullname must not exceed 40 characters"),
});

type UpdateProfileType = z.infer<typeof updateProfileSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
type LoginFormData = z.infer<typeof loginSchema>;
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type OtpFormData = z.infer<typeof OtpSchema>;

export {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  OtpSchema,
  updateProfileSchema,
  verifyEmailSchema,
};

export {
  type RegisterFormData,
  type ResetPasswordFormData,
  type LoginFormData,
  type ForgotPasswordFormData,
  type OtpFormData,
  type VerifyEmailFormData,
  type UpdateProfileType,
};
