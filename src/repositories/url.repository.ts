import { prisma } from "../lib/prisma";

export const findAll = async () => {
  return prisma.url.findMany();
};

export const create = async (shortCode: string, originalUrl: string) => {
  return prisma.url.create({
    data: { shortCode, originalUrl },
  });
};

export const findByShortCode = async (shortCode: string) => {
  return prisma.url.findUnique({
    where: { shortCode },
  });
};

export const incrementClicksByShortCode = async (shortCode: string) => {
  return prisma.url.update({
    where: { shortCode },
    data: { clicks: { increment: 1 } },
  });
};
