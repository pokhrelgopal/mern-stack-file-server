import { SuccessResponse } from "@/types/response.types";

export interface User {
  id: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  resetToken: string | null;
  resetTokenExpires: string | null;
}

export type UserResponse = SuccessResponse<{
  user: User;
}>;
