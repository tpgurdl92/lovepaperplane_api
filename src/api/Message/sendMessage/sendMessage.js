import { prisma } from "../../../../generated/prisma-client";
import { MESSAGE_FRAGMENT } from "../../../fragments";
export default {
  Mutation: {
    sendMessage: async (_, args, { request }) => {
      const { roomId, toId, type, data } = args;
      const { userid: userId } = request.headers;
      const message = await prisma
        .createMessage({
          room: { connect: { id: roomId } },
          type: type,
          from: { connect: { id: userId } },
          to: { connect: { id: toId } },
          data: data,
        })
        .$fragment(MESSAGE_FRAGMENT);
      if (message) {
        return message;
      } else {
        throw error("fail to create message");
      }
    },
  },
};
