import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeAcusation: async () => {
      const { userid: userId } = request.request.headers;
      const complains = await prisma.complains({
        where: { from: { id: userId } },
      });
      return complains;
    },
  },
};
