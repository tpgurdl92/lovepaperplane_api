import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    seeRoom: async (_, args) => {
      const { roomId } = args;
      console.log("roomId" + roomId);
      const room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      if (room) {
        console.log(room);
        return room;
      } else {
        throw Error("Can't find room");
      }
    },
  },
};
