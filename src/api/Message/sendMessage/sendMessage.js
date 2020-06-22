import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation :{
        sendMessage:async(_,args)=>{
            const {roomId,toId, myId ,type, data} = args;
            return null;
        }
    }
}