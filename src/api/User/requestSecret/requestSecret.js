import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { username } = args;
      console.log("requestSecret : " + username);
      try {
        const user = await prisma.user({ username }).$fragment(USER_FRAGMENT);
        console.log(user);
        if (user) {
          console.log(user);
          let secret = "" + generateSecret();
          await prisma.updateUser({
            data: { secret: secret },
            where: { username: user.username },
          });
          sendSecretMail(user.username, secret);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e);
        throw Error("prisma error");
      }
    },
  },
};
