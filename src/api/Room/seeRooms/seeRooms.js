import { prisma } from "../../../../generated/prisma-client";
import {ROOM_FRAGMENT} from "../../../fragments";

export default{
    Query:{
        seeRooms:async(_,args)=>{
            const {userId} = args;
            const rooms = await prisma.rooms({
                where:{
                    AND:[
                        {OR:[
                            {participantA:{id:userId}},
                            {participantB:{id:userId}}
                            ]
                        },
                        {isAlive:true}
                    ]}
                }).$fragment(ROOM_FRAGMENT);
                if(rooms) {
                    return rooms;
                } else {
                    throw error('Not found Rooms data');
            }
        }
    }
}