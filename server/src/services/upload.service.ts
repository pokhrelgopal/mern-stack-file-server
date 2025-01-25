import multer from "multer";
import path from "path";
import { Request } from "express";
import * as fileService from "./file.service";
import { createFileSchema } from "../schema/file.schema";

const upload = multer({
  dest: path.join(__dirname, "../uploads"),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
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

export const handleFileUpload = (req: Request, applicationId: string) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, {} as any, async (err: any) => {
      if (err) {
        return reject(new Error(`File upload error: ${err.message}`));
      }

      const file = req.file;
      if (!file) {
        return reject(new Error("File is required."));
      }

      const fileData = {
        name: file.originalname,
        path: file.path,
        size: file.size,
        url: `/uploads/${file.filename}`,
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
  });
};
