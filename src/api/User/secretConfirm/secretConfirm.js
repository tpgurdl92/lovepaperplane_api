import { TransformQuery } from "graphql-tools";
import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    secretConfirm: async (_, args, request) => {
      const { username, secret } = args;
      console.log("username: " + username);
      const user = await prisma
        .user({ username: username })
        .$fragment(USER_FRAGMENT);
      console.log(user);
      if (user.secret === secret) {
        //To sangwoo 유저의 마지막 접속 시간을 업데이트 해주셈
        return user.id;
      }
      return "false";
    },
  },
};
