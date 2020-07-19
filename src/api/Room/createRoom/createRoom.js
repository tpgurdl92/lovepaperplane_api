import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";
export default {
  Mutation: {
    createRoom: async (_, args) => {
      const { userId } = args;
      const date = new Date();
      const user = await prisma.user({ id: userId }).$fragment(USER_FRAGMENT);
      //이미 채팅방이 존재하는 유저의 id
      let exceptionUserIdList = user.rooms.map((item) => {
        if (item.participantA.id === userId) {
          return item.participantB.id;
        } else {
          return item.participantA.id;
        }
      });
      exceptionUserIdList.push(userId);
      //ban한 유저들의 아이디는 볼필요가 없네.
      const userList = await prisma.users({
        where: { id_not_in: exceptionUserIdList, location: user.location },
        first: 1,
      });
      const participantB = userList[0];
      console.log(participantB);
      //해당 유저의 비행기 개수가 1이상인지 확인
      if (user.availablePlane < 1) {
        throw Error("");
      }
      //해당 유저의 비행기수를 하나 지운다.
      const updatedUser = await prisma.updateUser({
        data: { availablePlane: user.availablePlane - 1 },
        where: { id: userId },
      });
      const room = await prisma.createRoom({
        participantA: { connect: { id: userId } },
        participantB: { connect: { id: participantB.id } },
        lastCheckTimeA: date,
        lastCheckTimeB: date,
        isAlive: true,
      });

      if (room) {
        return room;
      } else {
        throw error("Not found Rooms data");
      }
    },
  },
};
