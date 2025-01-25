import { ZodError } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as response from "../utils/response";
import * as schema from "../schema/file.schema";
import * as generator from "../utils/generator";
import * as fileService from "../services/file.service";

const createFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = schema.createFileSchema.parse({
      ...req.body,
    });
    const file = await fileService.createFile(data);
    return response.successResponse(res, "File created successfully.", {
      file,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

const getFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = await fileService.getFiles();
    return response.successResponse(res, "Files fetched successfully.", {
      files,
    });
  } catch (error) {
    next(error);
  }
};

const getFileById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const file = await fileService.getFileById(id);
    return response.successResponse(res, "File fetched successfully.", {
      file,
    });
  } catch (error) {
    next(error);
  }
};

const getFileByApplicationId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationId = req.params.applicationId;
    const files = await fileService.getFileByApplicationId(applicationId);
    return response.successResponse(res, "Files fetched successfully.", {
      files,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const file = await fileService.deleteFile(id);
    return response.successResponse(res, "File deleted successfully.", {
      file,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createFile,
  getFiles,
  getFileById,
  getFileByApplicationId,
  deleteFile,
};
