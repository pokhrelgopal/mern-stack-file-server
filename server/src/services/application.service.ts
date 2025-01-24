import prisma from "../db/prisma";
import * as schema from "../schema/application.schema";

const createApplication = async (data: schema.CreateApplicationData) => {
  try {
    const application = await prisma.application.create({
      data,
    });
    return application;
  } catch (error) {
    throw new Error("Error creating application: " + error);
  }
};

const getApplications = async () => {
  try {
    const applications = await prisma.application.findMany();
    return applications;
  } catch (error) {
    throw new Error("Error fetching applications: " + error);
  }
};

const getApplicationById = async (id: string) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
    });
    return application;
  } catch (error) {
    throw new Error("Error fetching application by ID: " + error);
  }
};

const getApplicationByApiKey = async (apiKey: string) => {
  try {
    const application = await prisma.application.findFirst({
      where: { apiKey },
    });
    return application;
  } catch (error) {
    throw new Error("Error fetching application by API key: " + error);
  }
};

const getApplicationByName = async (userId: string, name: string) => {
  try {
    const application = await prisma.application.findFirst({
      where: { name, userId },
    });
    return application;
  } catch (error) {
    throw new Error("Error fetching application by name: " + error);
  }
};

const updateApplication = async (
  id: string,
  data: schema.UpdateApplicationData
) => {
  try {
    const application = await prisma.application.update({
      where: { id },
      data,
    });
    return application;
  } catch (error) {
    throw new Error("Error updating application: " + error);
  }
};

const deleteApplication = async (id: string) => {
  try {
    const application = await prisma.application.delete({
      where: { id },
    });
    return application;
  } catch (error) {
    throw new Error("Error deleting application: " + error);
  }
};

const getApplicationByUserId = async (userId: string) => {
  try {
    const application = await prisma.application.findFirst({
      where: { userId },
    });
    return application;
  } catch (error) {
    throw new Error("Error fetching application by user ID: " + error);
  }
};

export {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationByUserId,
  getApplicationByApiKey,
  getApplicationByName,
};
