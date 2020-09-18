import { prisma } from "../../../../generated/prisma-client";
import { COMPLAIN_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    complain: async (_, args, { request }) => {
      const { messageId, blockFlgId, toId, category, comment } = args;
      const { userid: userId } = request.headers;
      const complain = await prisma
        .createComplain({
          from: { connect: { id: userId } },
          to: { connect: { id: toId } },
          messageId: messageId,
          category: category,
          comment: comment,
        })
        .$fragment(COMPLAIN_FRAGMENT);
      if (complain) {
        const user = await prisma.updateUser({
          data: {
            banningUser: { connect: { id: toId } },
          },
          where: { id: userId },
        });
        const blockFlg = await prisma.updateBlockFlg({
          data: { flag: true },
          where: { id: blockFlgId },
        });

        return complain;
      } else {
        return null;
      }
    },
  },
};
