import { SuccessResponse } from "@/types/response.types";
import { File } from "./file.types";

export interface AplicationList {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  application: Application[];
}

export interface Application {
  id: string;
  name: string;
  apiKey: string;
  createdAt: string;
  updatedAt: string;
  totalStorageUsed: number;
  userId: string;
  File: File[];
  totalFileSize: number;
  fileCount: number;
}

export type ApplicationResponse = SuccessResponse<{
  application: Application;
}>;

export type ApplicationListResponse = SuccessResponse<{
  application: Application[];
}>;
