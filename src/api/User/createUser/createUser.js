import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createUser: async (_, args) => {
      console.log("create");
      //20200707 park modify start
      //const {username, age, gender, location,} =args;
      const {
        username,
        birthDate,
        gender,
        location,
        nickname,
        machineId,
      } = args;
      //20200707 park modify end
      try {
        //20200707 park add start
        const duplicationCheck = await prisma.user({ username });
        if (duplicationCheck) {
          throw Error("username already exist");
        }
        //20200707 park add end
        const user = await prisma.createUser({ ...args, pushFlag: true });
        if (!user) {
          //if user was not created
          console.log("failure");
          //20200707 park add start
          throw error("failed to create user");
          //20200707 park add end
        }
        return user;
      } catch (e) {
        console.log(e);
        //20200707 park add start
        throw Error("error in creating user");
        //20200707 park add end
      }
    },
  },
  Query: {
    empty: () => null,
  },
};
