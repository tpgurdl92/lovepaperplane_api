import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addAvailablePlane: async (_, __, request) => {
      const { userId } = request;
      const user = prisma.user({ id: UserId });
      try {
        if (user.availablePlane < 10) {
          const updatedUser = await prisma.updateUser({
            data: { availablePlane: user.availablePlane + 1 },
            where: { id: userID },
          });
          return updatedUser.availablePlane;
        } else {
          return user.availablePlane;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
