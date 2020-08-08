import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editUser: async (_, args, request) => {
            const { data, dataType } = args;
            const { userid: userId } = request.request.headers;
            try {
                console.log('data-type :' + dataType);
                console.log('user_id :' + userId);
                switch (dataType) {
                    case 'nickname':
                        console.log('nickname');
                        let editUser = await prisma.updateUser({
                            where: { id: userId },
                            data: {
                                nickname: data,
                            },
                        });
                        if (!editUser) {
                            //if user was not updated
                            console.log('failure');
                        }
                        return editUser;
                    case 'location':
                        console.log('location');
                        editUser = await prisma.updateUser({
                            where: { id: userId },
                            data: {
                                location: data,
                            },
                        });
                        if (!editUser) {
                            //if user was not updated
                            console.log('failure');
                        }
                        return editUser;
                    case 'birthDate':
                        console.log('birthDate');
                        editUser = await prisma.updateUser({
                            where: { id: userId },
                            data: {
                                birthDate: data,
                            },
                        });
                        if (!editUser) {
                            console.log('failure');
                        }
                        return editUser;
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
};
