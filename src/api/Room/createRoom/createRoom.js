import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        createRoom:async(_,args)=>{
            const {participantAId,participantBId} = args;
            const date = new Date();
            const room = await prisma.createRoom({
                participantA: {connect:{id:participantAId}},
                participantB: {connect:{id:participantBId}},
                lastCheckTimeA: date,
                lastCheckTimeB: date,
                isAlive: true,
            })
                if(room) {
                    return room;
                } else {
                    throw error('Not found Rooms data');
            }
        }
    }
}