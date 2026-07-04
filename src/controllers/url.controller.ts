import { FastifyRequest, FastifyReply } from "fastify";
import * as urlService from "../services/url.service";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const { originalUrl } = request.body as { originalUrl: string };
  const url = await urlService.create(originalUrl);

  return reply.status(201).send({
    shortCode: url.shortCode,
    shortUrl: `http://localhost:3333/${url.shortCode}`,
    originalUrl: url.originalUrl,
    createdAt: url.createdAt,
  });
};

export const redirect = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code } = request.params as { code: string };

  try {
    const url = await urlService.incrementClicks(code);
    return reply.redirect(url.originalUrl);
  } catch {
    return reply.status(404).send({ message: "URL not found" });
  }
};

export const getStats = async (request: FastifyRequest, reply: FastifyReply) => {
  const { code } = request.params as { code: string };

  const url = await urlService.findByShortCode(code);

  if (!url) {
    return reply.status(404).send({ message: "URL not found" });
  }

  return reply.send({
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    clicks: url.clicks,
    createdAt: url.createdAt,
  });
};

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  const urls = await urlService.findAll();
  return reply.status(200).send(urls);
};
