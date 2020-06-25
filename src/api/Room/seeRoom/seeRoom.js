import { prisma } from "../../../../generated/prisma-client";
import {ROOM_FRAGMENT} from "../../../fragments";

export default{
    Query:{
        seeRoom:async(_,args)=>{
            const {roomId,userId} = args;
            const room = await prisma.rooms({
                where:{
                    AND:[{id:roomId},
                        {OR:[
                            {participantA:{id:userId}},
                            {participantB:{id:userId}}
                            ]
                        },
                        {isAlive:true}
                    ]}
                }).$fragment(ROOM_FRAGMENT);
                console.log(room[0]);
                if(room) {
                    let tmpRoom = room[0];
                    for(let i = 0 ; i < tmpRoom.messages.length; i++){
                        if(tmpRoom.messages[i].to.id === userId) {
                            console.log("banana");
                            tmpRoom.messages[i].to.itsMe = true;
                            tmpRoom.messages[i].from.itsMe = false;
                        } else {
                            console.log("pineapple");
                            tmpRoom.messages[i].to.itsMe = false;
                            tmpRoom.messages[i].from.itsMe = true;
                        } 
                    }
                    console.log("tmpRoom:  " + tmpRoom);
                    return tmpRoom;
                } else {
                    throw error('Not found Rooms data');
            }
        }
    }
}