import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createRoomWithUsername: async (_, args, ctx) => {
      const { userid: userId } = ctx.request.headers;
      const { targetUsername } = args;
      const date = new Date();
      //TODO
      중복체크;
      //TODO

      const room = await prisma.createRoom({
        participant: { connect: [{ id: userId }, { id: targetUsername }] },
        isAlive: true,
      });
      if (room) {
        return room;
      } else {
        throw error("failed to create Room with username");
      }
    },
  },
};
