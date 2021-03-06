import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import { uploadMiddleware, uploadController } from "./upload";
import logger from "morgan";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request, connection }) => ({ request, connection }),
});
server.express.use(logger("dev"));
server.express.post(
  "/api/upload",
  uploadMiddleware /*() => {
    console.log("sibal");
  }*/,
  uploadController
);
server.start({ PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

console.log(process.env.PORT);
