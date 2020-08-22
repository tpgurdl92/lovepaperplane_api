import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
    Query: {
        login: async (_, args) => {
            console.log('im in1');
            const { machineId } = args;
            try {
                const user = await prisma.user({ machineId });
                if (user) {
                    const rooms = await prisma
                        .rooms({
                            where: {
                                AND: [
                                    {
                                        participant_some: {
                                            id_in: [user.id],
                                        },
                                    },
                                    {
                                        isAlive: true,
                                    },
                                ],
                            },
                        })
                        .$fragment(ROOM_FRAGMENT);
                    console.log('new: ' + rooms[0].id);
                    return { user: user, rooms: rooms };
                } else {
                    return null;
                }
            } catch (e) {
                console.log(e);
                throw Error('failed to require machineId');
            }
        },
    },
};
