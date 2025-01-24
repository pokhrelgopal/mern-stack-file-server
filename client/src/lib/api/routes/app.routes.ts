import { baseApiUrl } from "@/constants/api";
const endpoint = "/applications";
const url = baseApiUrl + endpoint;

export const applicationRoutes = {
  applications: url,
  application: (id: string) => `${url}/${id}`,
  userApplications: (userId: string) => `${url}/user/${userId}`,
};
