import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    readMessage: async (_, args, { request }) => {
      const date = new Date();
      const { readeFlgId } = args;
      const readFlg = await prisma.updateReadFlg({
        data: { checkedTime: date },
        where: { id: readeFlgId },
      });

      if (readFlg) {
        return true;
      } else {
        return false;
      }
    },
  },
};
