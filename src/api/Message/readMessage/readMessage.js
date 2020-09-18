import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    readMessage: async (_, args, { request }) => {
      const { unreadMessageIdList } = args;
      const message = await prisma.updateManyMessages({
        data: { isChecked: true },
        where: { id_in: unreadMessageIdList },
      });
      if (message) {
        return true;
      } else {
        return false;
      }
    },
  },
};
