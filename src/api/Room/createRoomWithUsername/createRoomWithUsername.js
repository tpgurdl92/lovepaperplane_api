import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createRoomWithUsername: async (_, args) => {
            const {participantAId, participantBUserName} = args;
            const date = new Date();
            const room = await prisma.createRoom({
                participantA: {
                    connect: {
                        id: participantAId
                    }
                },
                participantB: {
                    connect: {
                        username: participantBUserName
                    }
                },
                lastCheckTimeA: date,
                lastCheckTimeB: date,
                isAlive: true
            });
            if (room) {
                return room;
            } else {
                throw error('failed to create Room with username');
            }
        }
    }
}
