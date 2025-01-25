import prisma from "../db/prisma";
import * as schema from "../schema/file.schema";

const createFile = async (data: schema.CreateFileData) => {
  try {
    const file = await prisma.file.create({
      data,
    });
    return file;
  } catch (error) {
    throw new Error("Error creating file: " + error);
  }
};

const getFileById = async (id: string) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id },
    });
    return file;
  } catch (error) {
    throw new Error("Error fetching file by ID: " + error);
  }
};

const getFiles = async () => {
  try {
    const files = await prisma.file.findMany();
    return files;
  } catch (error) {
    throw new Error("Error fetching files: " + error);
  }
};

const getFileByApplicationId = async (applicationId: string) => {
  try {
    const files = await prisma.file.findMany({
      where: { applicationId },
    });
    return files;
  } catch (error) {
    throw new Error("Error fetching files of application: " + error);
  }
};
const deleteFile = async (id: string) => {
  try {
    const file = await prisma.file.delete({
      where: { id },
    });
    return file;
  } catch (error) {
    throw new Error("Error deleting file: " + error);
  }
};

export {
  createFile,
  getFileById,
  getFiles,
  getFileByApplicationId,
  deleteFile,
};
