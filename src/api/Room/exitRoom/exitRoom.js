import {
    prisma
} from '../../../../generated/prisma-client';
import {
    ROOM_FRAGMENT
} from '../../../fragments';
export default {
    Mutation: {
        exitRoom: async (_, args) => {
            const {
                roomId,
                userId,
                toId,
                blockId
            } = args;
            const exitRoom = await prisma.updateBlockFlg({
                where: {
                    id: blockId,
                },
                data: {
                    flag: true
                }
            })
            const banUser = await prisma.updateUser({
                where: {
                    id: userId,
                },
                data: {
                    banningUser: {
                        connect: {
                            id: toId
                        }
                    }
                }
            })
            if (exitRoom && banUser) {
                console.log('success exit room');
                return exitRoom;
            } else {
                throw error('failed exit room');
            }
        }
    }
}