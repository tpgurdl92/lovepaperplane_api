import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        login: async (_, args) => {
            console.log('im in1');
            const { machineId } = args;
            try {
                const user = await prisma.user({ machineId });
                if (user) {
                    console.log(user);
                    return user;
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
