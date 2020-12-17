import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";
import { generateSecret, sendSecretMail } from "../../../utils";

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
      let user;
      try {
        // 20200707 park add start
        const duplicationCheck = await prisma.user({
          username,
        });

        if (duplicationCheck) {
          return false;
        }
        console.log("create user");
        let secret = "" + generateSecret();
        user = await prisma
          .createUser({
            ...args,
            pushFlag: true,
            normalPlane: 3,
            goldPlane: 0,
            validDate: new Date(),
            lastLoginTime: new Date(),
            logicDelete: false,
            secret: secret,
          })
          .$fragment(USER_FRAGMENT);

        console.log("user man: " + user);
        if (!user) {
          // if user was not created
          console.log("failure");
          // 20200707 park add start
          throw error("failed to create user");
          // 20200707 park add end
        }
        await sendSecretMail(username, secret);
        return true;
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
