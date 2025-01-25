import axios from "axios";
import type { ApiError, ApiResponse } from "@/types/response.types";
import { fileRoutes } from "../routes";

export const uploadFile = async (
  data: FormData,
  apiKey: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(fileRoutes.files, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data || new Error("An unknown error occurred");
  }
};

export const deleteFile = async (fileId: string): Promise<ApiResponse> => {
  try {
    const response = await axios.delete(fileRoutes.files + `/${fileId}`, {
      withCredentials: true,
    });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data || new Error("An unknown error occurred");
  }
};
