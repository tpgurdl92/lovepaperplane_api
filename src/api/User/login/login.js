import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT, USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    login: async (_, args) => {
      console.log("im in1");
      const { machineId } = args;
      console.log(machineId);
      try {
        const user = await prisma
          .user({
            machineId,
          })
          .$fragment(USER_FRAGMENT);
        if (user) {
          const lastLogin = await prisma.updateUser({
            where: {
              machineId,
            },
            data: {
              lastLoginTime: new Date(),
            },
          });
          console.log("userID:" + user.id);
          const rooms = await prisma
            .rooms({
              where: {
                AND: [
                  {
                    participant_some: {
                      id_in: [user.id],
                    },
                  },
                  {
                    isAlive: true,
                  },
                  {
                    blockFlg_none: {
                      fromId: user.id,
                      flag: true,
                    },
                  },
                ],
              },
            })
            .$fragment(ROOM_FRAGMENT);
          return {
            user: user,
            rooms: rooms,
          };
        } else {
          return null;
        }
      } catch (e) {
        console.log(e);
        throw Error("failed to require machineId");
      }
    },
  },
};
