import { prisma } from "../../../../generated/prisma-client";
import {MESSAGE_FRAGMENT} from "../../../fragments";
export default {
    Mutation :{
        sendMessage:async(_,args)=>{
            const {roomId,toId, myId ,type, data} = args;
            const message = await prisma.createMessage(
                {
                    room:{connect:{id:roomId}},
                    type:type,
                    from:{connect:{id:myId}},
                    to:{connect:{id:toId}},
                    data:data
                }
            ).$fragment(MESSAGE_FRAGMENT);
            if(message){
                return message;
            }else{
                throw error('fail to create message');
            }
        }
    }
}