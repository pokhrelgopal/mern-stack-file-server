import { ZodError } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import * as response from "../utils/response";
import * as schema from "../schema/application.schema";
import * as generator from "../utils/generator";
import * as applicationService from "../services/application.service";

const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const userId = (req as JwtPayload).user.id;
    const apiKey = generator.generateApiKey(userId, name);
    const data = schema.createApplicationSchema.parse({
      ...req.body,
      apiKey,
      userId,
    });
    const exists = await applicationService.getApplicationByName(userId, name);
    if (exists) {
      return response.errorResponse(
        res,
        "Application with this name already exists."
      );
    }

    const application = await applicationService.createApplication(data);
    return response.successResponse(res, "Application created successfully.", {
      application,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

const getApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applications = await applicationService.getApplications();
    return response.successResponse(res, "Applications fetched successfully.", {
      applications,
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationId = req.params.id;
    const application = await applicationService.getApplicationById(
      applicationId
    );
    if (!application) {
      return response.errorResponse(res, "Application not found.");
    }
    return response.successResponse(res, "Application fetched successfully.", {
      application,
    });
  } catch (error) {
    next(error);
  }
};

const updateApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationId = req.params.id;
    const data = schema.updateApplicationSchema.parse(req.body);
    const application = await applicationService.getApplicationById(
      applicationId
    );
    if (!application) {
      return response.errorResponse(res, "Application not found.");
    }
    const updated = await applicationService.updateApplication(
      applicationId,
      data
    );

    return response.successResponse(res, "Application updated successfully.", {
      application: updated,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return response.zodErrorResponse(res, error);
    }
    next(error);
  }
};

const deleteApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const applicationId = req.params.id;
    const application = await applicationService.getApplicationById(
      applicationId
    );
    if (!application) {
      return response.errorResponse(res, "Application not found.");
    }
    await applicationService.deleteApplication(applicationId);
    return response.successResponse(res, "Application deleted successfully.");
  } catch (error) {
    next(error);
  }
};

const getApplicationsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as JwtPayload).user.id;
    const application = await applicationService.getApplicationsByUserId(
      userId
    );
    return response.successResponse(res, "Application fetched successfully.", {
      application,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationsByUserId,
};
