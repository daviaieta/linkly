import "dotenv/config"; // precisa vir ANTES de qualquer import que use o Prisma
import { fastify } from "fastify";
import { urlRoutes } from "./routes/url.routes";

const app = fastify();

app.get("/", async () => {
  return { message: "Linkly API" };
});

await app.register(urlRoutes);

app.listen({
  port: 3333,
});

console.log("Server running: http://localhost:3333");
