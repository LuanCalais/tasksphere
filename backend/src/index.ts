import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

async function start() {
  const app = express();

  app.use(express.json());

  

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ prisma }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: "/graphql" });

  app.listen(PORT, () => {
    console.log(`🚀 Server on http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
