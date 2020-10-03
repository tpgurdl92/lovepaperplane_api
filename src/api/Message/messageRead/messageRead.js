import { prisma } from "../../../../generated/prisma-client";
import { MESSAGEREAD_FRAGMENT } from "../../../fragments";

export default {
  Subscription: {
    messageRead: {
      subscribe: async (_, args) => {
        const { userId } = args;
        const readMessage = await prisma.$subscribe
          .readFlg({
            AND: [{ mutation_in: ["UPDATED"] }, { node: { toId: userId } }],
          })
          .node()
          .$fragment(MESSAGEREAD_FRAGMENT);
        return readMessage;
      },
      resolve: (payload, args) => {
        return payload;
      },
    },
  },
};
