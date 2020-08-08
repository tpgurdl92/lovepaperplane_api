import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT, ROOM_FRAGMENT } from "../../../fragments";
export default {
  Mutation: {
    createRoom: async (_, args, request) => {
      const { userid: userId } = request.request.headers;
      console.log(userId);
      const { data, location } = args;
      console.log("createRoom");
      const date = new Date();
      const user = await prisma.user({ id: userId }).$fragment(USER_FRAGMENT);
      // 이미 채팅방이 존재하는 유저의 id
      let exceptionUserIdList = [];
      console.log(user);
      if (user.rooms === null) {
        exceptionUserIdList = user.rooms.map((item) => {
          if (item.participant[0].id !== userId) {
            return item.participant[0].id;
          } else if (item.participant[1].id !== userId) {
            return item.participant[1].id;
          } else {
            throw Error("what the fuck");
          }
        });
      }
      exceptionUserIdList.push(userId);
      console.log("exceptionList 출력");
      console.log(exceptionUserIdList);
      // ban한 유저들의 아이디는 볼필요가 없네.
      let userList = await prisma.users({
        where: {
          id_not_in: exceptionUserIdList,
          location: location,
        },
        first: 1,
      });
      let participantB = userList[0];
      // 보내고 싶은 지역의 유저를 찾지 못 했을 경우, 다른 지역의 유저도 검색한다.
      if (participantB === null || participantB === undefined) {
        userList = await prisma.users({
          where: {
            id_not_in: exceptionUserIdList,
          },
          first: 1,
        });
        participantB = userList[0];
        if (participantB === null || participantB === undefined) {
          throw Error("can not find user to send message");
        }
      }
      console.log(participantB);
      // 해당 유저의 비행기 개수가 1이상인지 확인
      if (user.availablePlane < 1) {
        throw Error("");
      }
      // 해당 유저의 비행기수를 하나 지운다.
      const updatedUser = await prisma.updateUser({
        data: {
          availablePlane: user.availablePlane - 1,
        },
        where: {
          id: userId,
        },
      });
      console.log(participantB.id);
      const room = await prisma
        .createRoom({
          participant: { connect: [{ id: userId }, { id: participantB.id }] },
          isAlive: true,
        })
        .$fragment(ROOM_FRAGMENT);

      if (room) {
        console.log(room);
        const message = await prisma.createMessage({
          type: "text",
          data: data,
          from: {
            connect: {
              id: userId,
            },
          },
          to: {
            connect: {
              id: participantB.id,
            },
          },
          room: {
            connect: {
              id: room.id,
            },
          },
          isChecked: false,
        });
        if (message) {
          room.message = message;
          return room;
        }
      } else {
        throw error("Not found Rooms data");
      }
    },
  },
};
