import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    leaveApp: async (_, args) => {
      const { userId } = args;
      console.log("leave user: " + userId);
      const leaveApp = await prisma.updateUser({
        where: {
          id: userId,
        },
        data: {
          logicDelete: true,
        },
      });
      if (leaveApp) {
        console.log("success leave app");
        return leaveApp;
      } else {
        throw error("failed exit room");
      }
    },
  },
};
