import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createUser: async (_, args) => {
      console.log("create");
      // 20200707 park modify start
      // const {username, age, gender, location,} =args;
      const {
        username,
        birthDate,
        gender,
        location,
        nickname,
        machineId,
      } = args;
      // 20200707 park modify end
      try {
        // 20200707 park add start
        const duplicationCheck = await prisma.user({
          username,
        });

        // 20200707 park add end
        const resignCheck = await prisma.user({
          machineId,
        });
        let user;
        if (resignCheck) {
          console.log("update user");
          console.log(username);
          user = await prisma
            .updateUser({
              where: {
                machineId: machineId,
              },
              data: {
                username: username,
                birthDate: birthDate,
                gender: gender,
                location: location,
                nickname: nickname,
                pushFlag: true,
                normalPlane: 3,
                goldPlane: 0,
                validDate: new Date(),
                //moment().format("YYYY-MM-DD HH:mm:ss")
              },
            })
            .$fragment(USER_FRAGMENT);
        } else {
          if (duplicationCheck) {
            throw Error("username already exist");
          }
          console.log("create user");
          user = await prisma
            .createUser({
              ...args,
              pushFlag: true,
              normalPlane: 3,
              goldPlane: 0,
              validDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            })
            .$fragment(USER_FRAGMENT);
        }
        console.log("user man: " + user);
        if (!user) {
          // if user was not created
          console.log("failure");
          // 20200707 park add start
          throw error("failed to create user");
          // 20200707 park add end
        }
        const rooms = new Array();
        return {
          user: user,
          rooms: rooms,
        };
      } catch (e) {
        console.log(e);
        // 20200707 park add start
        throw Error("error in creating user");
        // 20200707 park add end
      }
    },
  },
  Query: {
    empty: () => null,
  },
};
