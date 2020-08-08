import {prisma} from "../../../../generated/prisma-client";
import {USER_FRAGMENT} from "../../../fragments"

export default {
    Query: {
        getUser: async (_, __, request) => {
            const {userid: userId} = request.request.headers;
            console.log("userid:" + userId);
            try {
                const user = await prisma.user({id: userId}).$fragment(USER_FRAGMENT);
                console.log(user);
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
