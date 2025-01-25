import axios from "axios";
import { ApiError, ApiResponse } from "@/types/response.types";
import {
  ApplicationListResponse,
  ApplicationResponse,
} from "@/types/application.types";
import {
  CreateApplicationData,
  UpdateApplicationData,
} from "@/schemas/application";
import { applicationRoutes } from "../routes";

export const getMyApplications = async (userId: string) => {
  try {
    const response = await axios.get(
      applicationRoutes.userApplications(userId),
      {
        withCredentials: true,
      }
    );
    return response.data as ApplicationListResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const getApplication = async (id: string) => {
  try {
    const response = await axios.get(applicationRoutes.application(id), {
      withCredentials: true,
    });
    return response.data as ApplicationResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const createApplication = async (data: CreateApplicationData) => {
  try {
    const response = await axios.post(applicationRoutes.applications, data, {
      withCredentials: true,
    });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};

export const updateApplication = async (
  id: string,
  data: UpdateApplicationData
) => {
  try {
    const response = await axios.patch(
      applicationRoutes.application(id),
      data,
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

export const deleteApplication = async (id: string) => {
  try {
    const response = await axios.delete(applicationRoutes.application(id), {
      withCredentials: true,
    });
    return response.data as ApiResponse;
  } catch (error) {
    const err = error as ApiError;
    throw err.response?.data;
  }
};
