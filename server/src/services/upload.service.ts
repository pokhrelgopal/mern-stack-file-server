import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as fileService from "./file.service";
import { createFileSchema } from "../schema/file.schema";
import { errorResponse } from "../utils/response";
import { backendUrl } from "../config";

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      !file.mimetype.startsWith("image/") &&
      !file.mimetype.startsWith("application/")
    ) {
      return cb(new Error("Only images and application files are allowed."));
    }
    cb(null, true);
  },
});

export const handleFileUpload = (
  req: Request,
  res: Response,
  applicationId: string
) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, {} as any, async (err: any) => {
      if (err) {
        return reject(new Error(err.message));
      }

      const file = req.file;
      if (!file) {
        return reject(new Error("File is required."));
      }

      const fileData = {
        name: file.originalname,
        path: `uploads/${file.filename}`,
        size: file.size,
        url: `${backendUrl}/uploads/${file.filename}`,
        type: file.mimetype,
        applicationId,
      };

      try {
        const validFileData = createFileSchema.parse(fileData);
        const savedFile = await fileService.createFile(validFileData);

        resolve(savedFile);
      } catch (validationError) {
        reject(validationError);
      }
    });
  }).catch((error) => {
    return errorResponse(res, error.message);
  });
};
