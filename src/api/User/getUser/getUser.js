import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        getUser: async (_, __, request) => {
            const {userid: userId} = request.request.headers;
            console.log("userid:" + userId);
            try {
                const user = await prisma.user({id: userId});
                if (user) {
                    console.log(user);
                    return user;
                } else {
                    throw Error("there was no user with the Id");
                }
            } catch (e) {
                console.log(e);
                throw Error("failed to get User Information");
            }
        }
    }
};
