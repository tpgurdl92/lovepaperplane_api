import { prisma } from "../../../../generated/prisma-client";
import { MESSAGE_FRAGMENT } from "../../../fragments";
export default {
  Subscription: {
    newMessage: {
      subscribe: async (_, args, con) => {
        console.log("subscribe");
        const { userId } = args;
        console.log(userId);
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: ["CREATED"] },
              {
                node: {
                  OR: [{ to: { id: userId } }, { from: { id: userId } }],
                },
              },
            ],
          })
          .node()
          .$fragment(MESSAGE_FRAGMENT);
      },
      resolve: (payload, args) => {
        console.log("subsub");
        console.log(payload.room);
        if (payload.to.id === userId) {
          payload.to.itsMe = true;
          payload.from.itsMe = false;
        } else if (payload.from.id === userId) {
          payload.to.itsMe = false;
          payload.from.itsMe = true;
        } else {
          throw "message classify error";
        }
        console.log(payload);
        return payload;
      },
    },
  },
};
