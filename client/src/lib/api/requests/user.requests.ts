import axios from "axios";
import { LoginFormData, RegisterFormData } from "@/schemas/auth";
import { ApiError, ApiResponse } from "@/types/response.types";
import { userRoutes } from "../routes/user.routes";
import { UserResponse } from "@/types/user.types";

export const register = async (data: RegisterFormData) => {
  try {
    const response = await axios.post(userRoutes.register, data);
    return response.data as ApiResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    const err = error as ApiError;
    return err.response?.data;
  }
};

export const login = async (data: LoginFormData) => {
  try {
    const response = await axios.post(userRoutes.login, data, {
      withCredentials: true,
    });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      userRoutes.logout,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const me = async () => {
  try {
    const response = await axios.get(userRoutes.me, {
      withCredentials: true,
    });
    return response.data as UserResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const verifyUser = async (email: string, otp: string) => {
  try {
    const response = await axios.post(userRoutes.verify, { email, otp });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(userRoutes.forgotPassword, { email });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const resetPassword = async ({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) => {
  try {
    const response = await axios.post(userRoutes.resetPassword, {
      newPassword,
      token,
    });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};
