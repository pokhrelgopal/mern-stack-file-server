import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as response from "../utils/response";
import * as fileService from "../services/file.service";
import * as uploadService from "../services/upload.service";
import { jwtSecret } from "../config";
import { ApiKey } from "../types/apiKey";
import { getApplicationByName } from "../services/application.service";

const createFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"];
    const apiKey = authorization?.split(" ")[1];
    if (!apiKey) {
      return response.errorResponse(res, "apiKey is required.");
    }

    let decoded: ApiKey;
    try {
      decoded = jwt.verify(apiKey, jwtSecret as string) as ApiKey;
    } catch (error) {
      return response.errorResponse(res, "Invalid apiKey.");
    }

    const application = await getApplicationByName(
      decoded.applicationName,
      decoded.userId
    );

    if (!application) {
      return response.errorResponse(res, "Application not found.");
    }

    // Delegate upload logic to the upload service
    const fileData = await uploadService.handleFileUpload(req, application.id);

    return response.successResponse(res, "File uploaded successfully.", {
      fileData,
    });
  } catch (error) {
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
