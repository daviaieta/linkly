import type { FastifyInstance } from "fastify";
import { listUrls } from "../controllers/url.controller";

export async function urlRoutes(app: FastifyInstance) {
  app.get("/urls", async () => {
    return listUrls();
  });
}
