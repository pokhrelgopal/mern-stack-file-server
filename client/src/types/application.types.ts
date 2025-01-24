import { SuccessResponse } from "@/types/response.types";

export interface Application {
  id: string;
  name: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
  totalStorageUsed: number;
  userId: string;
}

export type ApplicationResponse = SuccessResponse<{
  application: Application;
}>;
