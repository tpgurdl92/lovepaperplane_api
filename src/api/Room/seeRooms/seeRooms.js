import {
    prisma
} from '../../../../generated/prisma-client';
import {
    ROOM_FRAGMENT
} from '../../../fragments';

export default {
    Query: {
        seeRooms: async (_, __, request) => {
            const {
                userid: userId
            } = request.request.headers;
            const rooms = await prisma
                .rooms({
                    where: {
                        AND: [{
                                participant_some: {
                                    id_in: [userId],
                                },
                            },
                            {
                                isAlive: true,
                            },
                        ],
                    },
                })
                .$fragment(ROOM_FRAGMENT);
            if (rooms) {
                return rooms;
            } else {
                throw error('Not found Rooms data');
            }
        },
    },
};