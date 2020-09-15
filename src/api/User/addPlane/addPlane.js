import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addPlane: async (_, __, request) => {
      const { userid: userId } = request.request.headers;
      const user = await prisma.user({ id: userId });
      console.log(user.goldPlane);
      try {
        if (user.goldPlane < 10) {
          console.log("addadd");
          const updatedUser = await prisma.updateUser({
            data: { goldPlane: user.goldPlane + 1 },
            where: { id: userId },
          });
          return updatedUser;
        } else {
          console.log("noadd");
          return user;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
