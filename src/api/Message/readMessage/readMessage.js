import { prisma } from "../../../../generated/prisma-client";
import { MESSAGEREAD_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    readMessage: async (_, args, { request }) => {
      const date = new Date();
      const { readFlgId } = args;
      console.log(readFlgId);
      const readFlg = await prisma
        .updateReadFlg({
          data: { checkedTime: date },
          where: { id: readFlgId },
        })
        .$fragment(MESSAGEREAD_FRAGMENT);

      if (readFlg) {
        console.log("return success");
        return readFlg;
      } else {
        throw ERROR("ddd");
      }
    },
  },
};
