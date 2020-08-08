import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
  schema,
  context: ({ request, connection }) => ({ request, connection }),
});
server.express.use(logger("dev"));
server.start({ PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

console.log(process.env.PORT);
