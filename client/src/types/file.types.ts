import { SuccessResponse } from "@/types/response.types";

export interface File {
  id: string;
  name: string;
  path: string;
  size: number;
  url: string;
  type: string;
  applicationId: string;
  createdAt: Date;
  updatedAt: Date;
}
