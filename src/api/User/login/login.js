import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT, USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    login: async (_, args, request) => {
      const { userid: userId } = request.request.headers;
      console.log("login");
      try {
        const user = await prisma
          .user({
            id: userId,
          })
          .$fragment(USER_FRAGMENT);
        if (user) {
          if (user.logicDelete) {
            console.log("need resign");
            return null;
          }
          const lastLogin = await prisma.updateUser({
            where: {
              id: userId,
            },
            data: {
              lastLoginTime: new Date(),
            },
          });

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
          if (!lastLogin) {
            null;
          }
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
