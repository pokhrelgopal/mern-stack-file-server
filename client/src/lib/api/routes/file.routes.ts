import { baseApiUrl } from "@/constants/api";
const endpoint = "/files";
const url = baseApiUrl + endpoint;

export const fileRoutes = {
  files: url,
  file: (id: string) => `${url}/${id}`,
  applicationFiles: (applicationId: string) =>
    `${url}/application/${applicationId}`,
};
