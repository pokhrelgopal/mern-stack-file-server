import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as fileService from "./file.service";
import { createFileSchema } from "../schema/file.schema";
import { backendUrl } from "../config";

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

export const handleFileUpload = async (
  req: Request,
  res: Response,
  applicationId: string
) => {
  await new Promise<void>((resolve, reject) => {
    upload.single("file")(req, res, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  const file = req.file;
  if (!file) {
    throw new Error("No file uploaded.");
  }

  const fileData = {
    name: file.originalname,
    path: `uploads/${file.filename}`,
    size: file.size,
    url: `${backendUrl}/uploads/${file.filename}`,
    type: file.mimetype,
    applicationId,
  };

  const validFileData = createFileSchema.parse(fileData);

  const savedFile = await fileService.createFile(validFileData);

  return savedFile;
};
