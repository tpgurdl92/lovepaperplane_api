import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args) => {
        const { userId } = args;
        return await prisma.$subscribe.readFlg({
          AND: [{ mutation_in: ["UPDATED"] }, { node: { fromId: userId } }],
        });
      },
      //resolve:()=>{}
    },
  },
};
