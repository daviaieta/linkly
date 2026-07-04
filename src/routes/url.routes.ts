import { FastifyInstance } from "fastify";
import * as urlController from "../controllers/url.controller";

export const urlRoutes = async (app: FastifyInstance) => {
  app.post("/urls", urlController.create);
  app.get("/:code", urlController.redirect);
  app.get("/urls/:code/stats", urlController.getStats);
  app.get("/urls", urlController.list);
};
