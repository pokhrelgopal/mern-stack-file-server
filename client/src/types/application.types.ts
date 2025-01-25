import { SuccessResponse } from "@/types/response.types";
import { File } from "./file.types";

export interface Application {
  id: string;
  name: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
  totalStorageUsed: number;
  userId: string;
}

export interface ApplicationDetail {
  id: string;
  name: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
  totalStorageUsed: number;
  userId: string;
  File: File[];
}

export type ApplicationResponse = SuccessResponse<{
  application: Application;
}>;
export type ApplicationDetailResponse = SuccessResponse<{
  application: ApplicationDetail;
}>;
