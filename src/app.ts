import express from "express";
import { PORT } from "./config/envs";
import { connectDB } from "./config/database";
import { InitApolloServer } from "./config/apolloServer";

async function startServer() {
  const app = express();

  app.use(express.json());

  const { graphqlPath } = await InitApolloServer(app)

  await connectDB();

  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:${PORT}${graphqlPath}`
    );
  });
}

startServer();
