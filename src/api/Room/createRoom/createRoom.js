import { prisma } from "../../../../generated/prisma-client";
import {
  USER_FRAGMENT,
  ROOM_FRAGMENT,
  MESSAGE_FRAGMENT,
  USER_FRAGMENT_WITHROOM,
} from "../../../fragments";
export default {
  Mutation: {
    createRoom: async (_, args, request) => {
      const { userid: userId } = request.request.headers;
      const { planeType, data, location } = args;
      const date = new Date();
      let checkdate = new Date();
      console.log(`originaldate:${checkdate}`);
      checkdate.setDate(checkdate.getDate() - 10);
      console.log(`modifieddate:${checkdate}`);
      const user = await prisma
        .user({ id: userId })
        .$fragment(USER_FRAGMENT_WITHROOM);
      // 이미 채팅방이 존재하는 유저의 id
      let exceptionUserIdList = [];
      console.log("bbbb");
      console.log(user.rooms);
      if (user.rooms !== null && user.rooms !== undefined) {
        console.log("cccc");
        exceptionUserIdList = user.rooms.map((item) => {
          console.log("dddd");
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
      console.log("man:" + exceptionUserIdList);
      // 존재하는 채팅상대 제외 , 내가 보내고 싶은 지역, 유령회원이 아닐 것
      let userList = await prisma.users({
        where: {
          id_not_in: exceptionUserIdList,
          location: location,
          lastLoginTime_gte: checkdate,
        },
        first: 1,
      });
      let participantB = userList[0];
      // 존재하는 채팅상대 제외, 유령회원이 아닐 것
      if (participantB === null || participantB === undefined) {
        userList = await prisma.users({
          where: {
            id_not_in: exceptionUserIdList,
            lastLoginTime_gte: checkdate,
          },
          first: 1,
        });
        participantB = userList[0];
        if (participantB === null || participantB === undefined) {
          throw Error("can not find user to send message");
        }
      }

      // 해당 유저의 비행기 개수가 1이상인지 확인
      // 해당 유저의 비행기수를 하나 지운다.
      if (planeType === "gold") {
        if (user.goldPlane < 1) {
          throw Error("");
        }
        const updatedUser = await prisma.updateUser({
          data: {
            goldPlane: user.goldPlane - 1,
          },
          where: {
            id: userId,
          },
        });
      } else {
        if (user.normalPlane < 1) {
          throw Error("");
        }
        const updatedUser = await prisma.updateUser({
          data: {
            normalPlane: user.normalPlane - 1,
          },
          where: {
            id: userId,
          },
        });
      }
      //blockFlg 작성
      console.log("blockFlg");
      const room = await prisma
        .createRoom({
          participant: {
            connect: [
              {
                id: userId,
              },
              {
                id: participantB.id,
              },
            ],
          },
          isAlive: true,
          blockFlg: {
            create: [
              {
                fromId: userId,
                toId: participantB.id,
                flag: false,
              },
              {
                fromId: participantB.id,
                toId: userId,
                flag: false,
              },
            ],
          },
          readFlg: {
            create: [
              { fromId: userId, toId: participantB.id, checkedTime: date },
              { fromId: participantB.id, toId: userId, checkedTime: date },
            ],
          },
        })
        .$fragment(ROOM_FRAGMENT);

      if (room) {
        const message = await prisma
          .createMessage({
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
          })
          .$fragment(MESSAGE_FRAGMENT);
        console.log("room1:" + room.id);
        if (message) {
          room.messages = [message];
          console.log("room2:" + room.id);
          console.log("room3:" + room.messages);
          return room;
        }
      } else {
        throw error("Not found Rooms data");
      }
    },
  },
};
