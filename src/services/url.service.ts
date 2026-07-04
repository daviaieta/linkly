import { nanoid } from "nanoid";
import * as urlRepository from "../repositories/url.repository";

export const findAll = async () => {
  return urlRepository.findAll();
};

export const create = async (originalUrl: string) => {
  const shortCode = nanoid(6);
  return urlRepository.create(shortCode, originalUrl);
};

export const findByShortCode = async (shortCode: string) => {
  return urlRepository.findByShortCode(shortCode);
};

export const incrementClicks = async (shortCode: string) => {
  return urlRepository.incrementClicksByShortCode(shortCode);
};
